// export const source_data = {
//   {""}
// }
import { getPredictCases } from './Predict.js';

 const raw_death_cases = [
  {"name": "14", "it": 21, "uk": 21, "nl": 12},
  {"name": "15", "it": 29, "uk": 35, "nl": 20},
  {"name": "16", "it": 34, "uk": 55, "nl": 24},
  {"name": "17", "it": 52, "uk": 71, "nl": 43},
  {"name": "18", "it": 79, "uk": 103, "nl": 58},
  {"name": "19", "it": 107, "uk": 144, "nl": 76},
  {"name": "20", "it": 148, "uk": 177, "nl": 106},
  {"name": "21", "it": 197, "uk": 233, "nl": 136},
  {"name": "22", "it": 233, 'uk': 281, 'uk_predict': 291, "nl": 179},
  {"name": "23", "it": 366, 'uk': 335, 'uk_predict': 325, "nl": 213},
  {"name": "24", "it": 463, 'uk': 422, 'uk_predict': 413, "nl": 276},
  {"name": "25", "it": 631, 'uk': 465, 'uk_predict': 548, "nl": 356},
  {"name": "26", "it": 827, 'uk': 578, 'uk_predict': 549, "nl": 434},
  {"name": "27", "it": 1016,'uk': 759, 'uk_predict': 690, "nl": 546},
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
  {"name": "6", "it": 150, "uk": 160, "nl": 128 },
  {"name": "7", "it": 229, "uk": 206, "nl": 188},
  {"name": "8", "it": 322, "uk": 271, "nl": 264},
  {"name": "9", "it": 400, "uk": 321, "nl": 321},
  {"name": "10", "it": 640, "uk": 373, "nl": 382},
  {"name": "11", "it": 888, "uk": 456, "nl": 503},
  {"name": "12", "it": 1128, "uk": 590, "nl": 614},
  {"name": "13", "it": 1128, "uk": 797, "nl": 804},
  {"name": "14", "it": 1694, "uk": 1061, "nl": 959},
  {"name": "15", "it": 2036, "uk": 1391, "nl": 1135},
  {"name": "16", "it": 2502, "uk": 1543, "nl": 1413},
  {"name": "17", "it": 3089, "uk": 1950, "nl": 1705},
  {"name": "18", "it": 3858,"uk": 2626, "nl": 2051},
  {"name": "19", "it": 4636,"uk": 3269, "nl": 2460},
  {"name": "20", "it": 5883,"uk": 3983, "nl": 2994},
  {"name": "21", "it": 7375, "uk": 5018,"nl": 3631},
  {"name": "22", "it": 9172, "uk": 5683, 'uk_predict': 6034, "nl": 4204},
  {"name": "23", "it": 10149,'uk': 6650, 'uk_predict': 6797, "nl": 4749},
  {"name": "24", "it": 15113,'uk': 8077, 'uk_predict': 8407, "nl": 5560},
  {"name": "25", "it": 17660, 'uk': 9529, 'uk_predict': 9021, "nl": 6412},
  {"name": "26", "it": 21157, 'uk': 11568, 'uk_predict': 11402, "nl": 7431},
  {"name": "27","it": 24747,'uk': 14578, 'uk_predict': 13468, "nl": 8603},
  {"name": "28","it": 27980,},
  {"name": "29","it": 31506,},
  {"name": "30","it": 35713,},
  {"name": "31","it": 41035,},
  {"name": "1","it": 47021,},
  {"name": "2","it": 53578,},
  {"name": "3","it": 59138,},
  {"name": "4","it": 63927,},

];

export const totalCaseStartDay = 6;
export const fatalityCaseStartDay = 14;
export const Today = 27;
export const totalCases = getPredictCases(raw_total_cases, Today - totalCaseStartDay);
export const fatalityCases = getPredictCases(raw_death_cases, Today - fatalityCaseStartDay);


