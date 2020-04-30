//TODO: refactor this to a generic function.
//Deprecated
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

//Deprecated
const getSingleAdjucstFactor = (cases, index) => {
  const factor =
    (cases[index].uk - cases[index - 1].uk) /
    (cases[index].uk_predict - cases[index - 1].uk);
  return factor;
};

//Predict the cases
//Deprecated method using Italy trend to predict UK trend.
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

const getCase = (cases, index, point_latest) => {
  let number = (index > point_latest) ? cases[index].uk_predict : cases[index].uk;
 // Tempory fix:
  if (index > (point_latest - 15) && index < (point_latest - 1) && cases[point_latest - 1].uk === 26097) {
    number = number + 26097 - 22254;
  }
  return number;
}

const getRateRunningAverage = (cases, index, regression_count, point_latest) => {
  let current = 0;
  let previous = 0;
  for(let i = 0; i < regression_count; i++) {
    current += getCase(cases, index - i) - getCase(cases, index - i - 1);
    previous += getCase(cases, index - i - 1) - getCase(cases, index - i - 2); 
  }
  return current / previous;
}

const getNewCasesRate = (cases, point_latest,regression_count,days_before = 0) => {
  let total = 0;
  for (let i = 0; i < regression_count; i++) {
    total += getRateRunningAverage(cases, point_latest - i - days_before, regression_count, point_latest);
  }
 // console.log('case rate: ' + total/regression_count);
  return total / regression_count;
};

//Predict the cases: following UK new trend.
export const getPredictCases = (cases, point_latest, predict_days) => {
  let temp = [...cases];
  const bound = cases.length + predict_days;

  for (let i = 0; i < bound; i++) {
    if (i < point_latest) {
      temp[i] = cases[i];
    } else if (i === point_latest) {
    } else {
      if (i > cases.length - 1) {
        const number = parseInt(temp[i-1].name) + 1;
        const date = number > 30 ? number - 30 : number;
        temp.push({'uk_predict': undefined, 'name' : date});
      }
      const previous_uk = getCase(temp, i - 1, point_latest);
      const previous_7_uk = getCase(temp, i - 7, point_latest);

      const previous_new = (previous_uk - previous_7_uk) / 6;

      const new_cases_rate = getNewCasesRate(temp, point_latest, 7, 0);
      const new_cases_rate_previous = getNewCasesRate(temp, point_latest, 7, 1);

      // console.log('previous new cases: ' + previous_new);
      // console.log('new_cases_rate: ' + new_cases_rate);
      // console.log('new_cases_rate_previous: ' + new_cases_rate_previous);

      const new_rate_change = new_cases_rate - new_cases_rate_previous;

      // if(cases[i-1].name === '26') {
      //   console.log('previous_uk: ' + previous_uk);
      //   console.log('previous_new: ' + previous_new);
      //   console.log('new_cases_rate: ' + new_cases_rate);
      //   console.log('new_rate_change: ' + new_rate_change);

      // }

      const uk_predict = Math.ceil(
        previous_uk + previous_new * new_cases_rate * (1 + new_rate_change)
      );
      temp[i].uk_predict = uk_predict;
    }
  }
  return temp;
};

// Generate new cases:
export const getNewCases = (cases, keys, compares) => {
  var newEntries = [];
  for (let i = 1; i < cases.length; i++) {
    const entry = {};
    entry.name = cases[i].name;
    for (let j = 0; j < keys.length; j++) {
      entry[keys[j]] =
        cases[i - 1][compares[j]] === undefined
          ? cases[i][keys[j]] - cases[i - 1][keys[j]]
          : cases[i][keys[j]] - cases[i - 1][compares[j]];
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
  for (let i = 1; i < fatalityCases.length; i++) {
    const entry = {};
    entry.name = fatalityCases[i].name;
    for (let j = 0; j < keys.length; j++) {
      entry[keys[j]] = (
        fatalityCases[i][keys[j]] / totalCases[i][keys[j]]
      ).toFixed(3);
    }
    rates.push(entry);
  }
  return rates;
};
