//TODO: refactor this to a generic function.
const getAdjustFactor = (cases, point_latest) => {
  // Give the date closer higher weighing. Give a higher weight if we think the current trend is here to stay, otherwise, give it lower.
  // When unsure, give 0.5. When thinking historical data more important use a value that's less than 0.5. When it is a more representative change. use a value that is higher than 0.5.
  const weight = 0.5;
  const remainingWeight = 1 - weight;

  const adjustFactorOne = getSingleAdjucstFactor(cases, point_latest);
  const adjustFactorTwo = getSingleAdjucstFactor(cases, point_latest - 1);
  const adjustFactorThree = getSingleAdjucstFactor(cases, point_latest - 2);
  const adjustFactorFour = getSingleAdjucstFactor(cases, point_latest - 3);

  return (
    adjustFactorOne * weight +
    adjustFactorTwo * remainingWeight * weight +
    adjustFactorThree * remainingWeight * remainingWeight * weight +
    adjustFactorFour * remainingWeight * remainingWeight * remainingWeight
  );
};

const getSingleAdjucstFactor = (cases, index) => {
  const factor =
    (cases[index].uk - cases[index - 1].uk) /
    (cases[index].uk_predict - cases[index - 1].uk);
  return factor;
};

//Predict the cases: //Deprecated method using Italy trend to predict UK trend.
export const getPredictCasesItalyTrend = (cases, point_latest) => {
  let temp = cases;
  const adjustFactor = getAdjustFactor(cases, point_latest);

  for (let i = 0; i < cases.length; i++) {
    if (i < point_latest) {
      temp[i] = cases[i];
    } else if (i === point_latest) {
    } else {
      const ratio_new_cases = (temp[i].it - temp[i - 1].it) / temp[i].it;
      const previous_uk =
        i > point_latest + 1 ? temp[i - 1].uk_predict : temp[i - 1].uk;
      const uk_predict = Math.ceil(
        previous_uk * (1 + ratio_new_cases * adjustFactor)
      );
      temp[i].uk_predict = uk_predict;
    }
  }
  return temp;
};

const getNewCasesRate = (cases, point_latest, regression_count, days_before=0) => {
  let total = 0;
  for(let i = 0; i < regression_count; i++) {
    total += (cases[point_latest - i - days_before].uk - cases[point_latest - i - 1 - days_before].uk)/(cases[point_latest - i - 1 - days_before].uk - cases[point_latest - i - 2 - days_before].uk);
  }
  return total/regression_count;
}

//Predict the cases: following UK new trend.
export const getPredictCases = (cases, point_latest) => {
  let temp = cases;
  for (let i = 0; i < cases.length; i++) {
    if (i < point_latest) {
      temp[i] = cases[i];
    } else if (i === point_latest) {
    } else {

      const previous_uk =
        i > point_latest + 1? temp[i - 1].uk_predict : temp[i - 1].uk;
      
      const previous_previous_uk =
        i > point_latest + 2 ? temp[i - 2].uk_predict : temp[i - 2].uk;
      
      const previous_new_uk = previous_uk - previous_previous_uk;
      
      const new_cases_rate = getNewCasesRate(cases, point_latest, 7, 0);
      const new_cases_rate_previous = getNewCasesRate(cases, point_latest, 7, 1);

    const new_rate_change = new_cases_rate - new_cases_rate_previous;
      const uk_predict = Math.ceil(
        previous_uk + previous_new_uk * new_cases_rate * (1 + new_rate_change)
      );
      temp[i].uk_predict = uk_predict;
    }
  }
  return temp;
};


// Generate new cases:
export const getNewCases = (cases, keys, compares) => {
  var newEntries = [];
  for(let i = 1; i < cases.length; i++) {
    const entry = {};
    entry.name = cases[i].name;
    for (let j = 0; j < keys.length; j++) {
      entry[keys[j]] =
        (cases[i-1][compares[j]] === undefined ) ?
          (cases[i][keys[j]] - cases[i-1][keys[j]]) :
            (cases[i][keys[j]] - cases[i-1][compares[j]]);
    }
    newEntries.push(entry);
  }
  return newEntries;
};

//Generate fatality rate. 
/**
 * Make sure to pass same size matching array. 
 * keys, list of countries of interest
 */

export const getFatalityRates = (fatalityCases, totalCases, keys) => {
  if (fatalityCases.length !== totalCases.length) return [];
  console.log("length is" + fatalityCases.length);
  var rates = [];
  for(let i = 1; i < fatalityCases.length; i++) {
    const entry = {};
    entry.name = fatalityCases[i].name;
    for (let j = 0; j < keys.length; j++) {
      entry[keys[j]] = (fatalityCases[i][keys[j]]/totalCases[i][keys[j]]).toFixed(3);
    }
    rates.push(entry);
  }
  return rates;
}


