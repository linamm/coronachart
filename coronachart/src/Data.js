// export const source_data = {
//   {""}
// }
 const raw_death_cases = [
  {"name": "14", "it": 21, "uk": 21},
  {"name": "15", "it": 29, "uk": 35},
  {"name": "16", "it": 34, "uk": 55},
  {"name": "17", "it": 52, "uk": 71},
  {"name": "18", "it": 79, "uk": 103},
  {"name": "19", "it": 107, "uk": 144},
  {"name": "20", "it": 148, "uk": 177},
  {"name": "21", "it": 197, "uk": 233},
  {"name": "22", "it": 233, 'uk': 281, 'uk_predict': 291},
  {"name": "23", "it": 366, 'uk': 335, 'uk_predict': 325},
  {"name": "24", "it": 463, 'uk': 422, 'uk_predict': 413},
  {"name": "25", "it": 631, },
  {"name": "26", "it": 827,},
  {"name": "27", "it": 1016,},
  {"name": "28", "it": 1266,},
  {"name": "29", "it": 1441,},
  {"name": "30", "it": 1809, },
  {"name": "31", "it": 2158,},
  {"name": "1", "it": 2503},
  {"name": "2", "it": 2978,},
  {"name": "3", "it": 3405,},
  {"name": "4", "it": 4032,},
];

const raw_total_cases = [
  {"name": "6", "it": 150, "uk": 160},
  {"name": "7", "it": 229, "uk": 206},
  {"name": "8", "it": 322, "uk": 271},
  {"name": "9", "it": 400, "uk": 321},
  {"name": "10", "it": 640, "uk": 373},
  {"name": "11", "it": 888, "uk": 456},
  {"name": "12", "it": 1128, "uk": 590},
  {"name": "13", "it": 1128, "uk": 797},
  {"name": "14", "it": 1694, "uk": 1061},
  {"name": "15", "it": 2036, "uk": 1391},
  {"name": "16", "it": 2502, "uk": 1543},
  {"name": "17", "it": 3089, "uk": 1950},
  {"name": "18", "it": 3858,"uk": 2626},
  {"name": "19", "it": 4636,"uk": 3269},
  {"name": "20", "it": 5883,"uk": 3983},
  {"name": "21", "it": 7375, "uk": 5018,},
  {"name": "22", "it": 9172, "uk": 5683, 'uk_predict': 6034},
  {"name": "23", "it": 10149,'uk': 6650, 'uk_predict': 6797},
  {"name": "24", "it": 15113,'uk': 8077, 'uk_predict': 8407},
  {"name": "25", "it": 17660,},
  {"name": "26", "it": 21157, },
  {"name": "27","it": 24747,},
  {"name": "28","it": 27980,},
  {"name": "29","it": 31506,},
  {"name": "30","it": 35713,},
  {"name": "31","it": 41035,},
  {"name": "1","it": 47021,},
  {"name": "2","it": 53578,},
  {"name": "3","it": 59138,},
  {"name": "4","it": 63927,},

];

//TODO: refactor this to a generic function.
const getAdjustFactor = (cases, point_latest) => {
  const weight = 0.7; //Give the date closer higher weighing.
  const remainingWeight = 1 - weight;
  const adjustFactorOne = getSingleAdjucstFactor(cases, point_latest);
  const adjustFactorTwo = getSingleAdjucstFactor(cases, point_latest - 1);
  const adjustFactorThree = getSingleAdjucstFactor(cases, point_latest - 2);

  return adjustFactorOne * weight + adjustFactorTwo * remainingWeight * weight + adjustFactorThree * remainingWeight * remainingWeight;
}

const getSingleAdjucstFactor = (cases, index) => {
  return  (cases[index].uk - cases[index - 1].uk) / (cases[index].uk_predict - cases[index - 1].uk);
}

//Predict the cases
const getPredictCases = (cases, point_latest) => {
  let temp = cases;
  const adjustFactor = getAdjustFactor(cases, point_latest);
  
  for (let i = 0; i < cases.length; i++) {
    if (i < point_latest) {
      temp[i] = cases[i];
    } else if (i == point_latest) {

    } else {
     // console.log(temp[i-1].uk + ':' + temp[i-2].uk);
      const ratio_new_cases = ((temp[i].it) - (temp[i-1].it))/(temp[i].it);
      console.log('ratio_new_cases: ' + ratio_new_cases);
      const previous_uk = (i > point_latest + 1)? temp[i-1].uk_predict : temp[i-1].uk;
      const uk_predict =  Math.ceil( previous_uk * (1 + ratio_new_cases * adjustFactor));
      temp[i].uk_predict = uk_predict;
    }
  }
  console.log(JSON.stringify(temp));
  return temp;
}


export const totalCases = getPredictCases(raw_total_cases, 18);
export const fatalityCases = getPredictCases(raw_death_cases, 10);


