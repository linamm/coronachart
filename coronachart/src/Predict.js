//TODO: refactor this to a generic function.
const getAdjustFactor = (cases, point_latest) => {
  // Give the date closer higher weighing. Give a higher weight if we think the current trend is here to stay, otherwise, give it lower.
  // When unsure, give 0.5.
  const weight = 0.5;
  const remainingWeight = 1 - weight;
  // const recessPoints = 4;
  // const totalFactor = 0;

  // //TODO: refactor this into a better algorithm
  // for (var i=0; i < recessPoints; i++) {
  //   const factor = getSingleAdjucstFactor(cases, point_latest - i);
  //   if (i = 0) {
  //     totalFactor = totalFactor + factor * weight;
  //     break;
  //   }
  //   for (var j=0; j < i ; j++) {
  //     factor = factor * remainingWeight
  //   }

  // }

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

//Predict the cases:
export const getPredictCases = (cases, point_latest) => {
  let temp = cases;
  const adjustFactor = getAdjustFactor(cases, point_latest);

  for (let i = 0; i < cases.length; i++) {
    if (i < point_latest) {
      temp[i] = cases[i];
    } else if (i == point_latest) {
    } else {
      const ratio_new_cases = (temp[i].it - temp[i - 1].it) / temp[i].it;
      console.log("ratio_new_cases: " + ratio_new_cases);
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

//Generate new cases:
export const getNewCases = (cases, keys, compares) => {
  var newEntries = [];
  for(let i = 1; i < cases.length; i++) {
    const entry = {};
    entry.name = cases[i].name;
    for (let j = 0; j < keys.length; j++) {
      entry[keys[j]] =
        (cases[i-1][compares[j]] == undefined ) ?
          (cases[i][keys[j]] - cases[i-1][keys[j]]) :
            (cases[i][keys[j]] - cases[i-1][compares[j]]);
    }
    newEntries.push(entry);
  }
  return newEntries;
};

