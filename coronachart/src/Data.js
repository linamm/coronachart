// export const source_data = {
//   {""}
// }
import { getPredictCases, getNewCases, getFatalityRates } from './Predict.js';

 const raw_death_cases = [
  {"name": "14", "it": 21, "uk": 21, "nl": 12, "cn": 25},
  {"name": "15", "it": 29, "uk": 35, "nl": 20, "cn": 41},
  {"name": "16", "it": 34, "uk": 55, "nl": 24, "cn": 56},
  {"name": "17", "it": 52, "uk": 71, "nl": 43, "cn": 80},
  {"name": "18", "it": 79, "uk": 103, "nl": 58, "cn": 106},
  {"name": "19", "it": 107, "uk": 144, "nl": 76, "cn": 132},
  {"name": "20", "it": 148, "uk": 177, "nl": 106, "cn": 170},
  {"name": "21", "it": 197, "uk": 233, "nl": 136, "cn": 213},
  {"name": "22", "it": 233, 'uk': 281, 'uk_predict': 291, "nl": 179, "cn": 256},
  {"name": "23", "it": 366, 'uk': 335, 'uk_predict': 325, "nl": 213, "cn": 304},
  {"name": "24", "it": 463, 'uk': 422, 'uk_predict': 413, "nl": 276, "cn": 361},
  {"name": "25", "it": 631, 'uk': 465, 'uk_predict': 548, "nl": 356, "cn": 425},
  {"name": "26", "it": 827, 'uk': 578, 'uk_predict': 549, "nl": 434, "cn": 490},
  {"name": "27", "it": 1016,'uk': 759, 'uk_predict': 690, "nl": 546, "cn": 563}, 
  {"name": "28", "it": 1266,'uk': 1019, 'uk_predict': 958, "cn": 636},
  {"name": "29", "it": 1441, "cn": 722, 'uk': 1228, 'uk_predict': 1176},
  {"name": "30", "it": 1809, "cn": 811, 'uk': 1408, 'uk_predict': 1569},
  {"name": "31", "it": 2158, "cn": 908, 'uk': 1789, 'uk_predict': 1628},
  {"name": "1", "it": 2503, "cn": 1016, 'uk': 2352, 'uk_predict': 2117},
  {"name": "2", "it": 2978, "cn": 1113, 'uk': 2921, 'uk_predict': 2924},
  {"name": "3", "it": 3405, "cn": 1259, 'uk': 3605, 'uk_predict': 3364},
  {"name": "4", "it": 4032, "cn": 1380, 'uk': 4313, 'uk_predict': 4419},
  {"name": "5", "it": 4825, "cn": 1520, 'uk': 4932, 'uk_predict': 5136},
  {"name": "6", "it": 5475, "cn": 1665, 'uk': 5373, 'uk_predict': 5466},
  {"name": "7", "it": 6077, "cn": 1770, 'uk': 6159, 'uk_predict': 5854},
  {"name": "8", "it": 7503, "cn": 1868, 'uk': 7097, 'uk_predict': 7415},
  {"name": "9", "it": 8215, "cn": 2004, 'uk': 7978,'uk_predict': 7700},
  {"name": "10", "it": 9134, "cn": 2118, 'uk': 8958, 'uk_predict': 8962 },
  {"name": "11", "it": 10023, "cn": 2345, 'uk': 9875, 'uk_predict': 9881},
  {"name": "12", "it": 10779, "cn": 2442, 'uk': 10621, 'uk_predict': 10583},
  {"name": "13", "it": 11591, "cn": 2592, 'uk': 11329, 'uk_predict': 11427},
  {"name": "14", "it": 12428, "cn": 2663, 'uk': 12107, 'uk_predict': 12055},
  {"name": "15", "it": 13155, "cn": 2715, 'uk': 12868, 'uk_predict': 12784},
  {"name": "16", "it": 13910, "cn": 2744, 'uk': 13729, 'uk_predict': 13617},
  {"name": "17", "it": 14681, "cn": 2788, 'uk': 14576, 'uk_predict': 14522},
  {"name": "18", "it": 15362, "cn": 2835, 'uk': 15464, 'uk_predict': 15285},
  {"name": "19", "it": 15887, "cn": 2870, 'uk': 16060, 'uk_predict': 16367},
  {"name": "20", "it": 16523, "cn": 2912, 'uk': 16509, 'uk_predict': 16633},
  {"name": "21", "it": 17127, "cn": 2943, 'uk': 17337, 'uk_predict': 16925},
  {"name": "22", "it": 17669, "cn": 2981},
  {"name": "23", "it": 18269, "cn": 3012},
  {"name": "24", "it": 18849, "cn": 3042},
  {"name": "25", "it": 19468, "cn": 3070},
  {"name": "26", "it": 19899, "cn": 3097},
  {"name": "27", "it": 20465, "cn": 3119},
  {"name": "28", "it": 21067, "cn": 3136},
  {"name": "29", "it": 21645, "cn": 3158},
];

const raw_total_cases = [
  {"name": "6", "it": 150, "uk": 160, "nl": 128 },
  {"name": "7", "it": 229, "uk": 206, "nl": 188},
  {"name": "8", "it": 322, "uk": 271, "nl": 264},
  {"name": "9", "it": 400, "uk": 321, "nl": 321},
  {"name": "10", "it": 640, "uk": 373, "nl": 382, "cn": 571},
  {"name": "11", "it": 888, "uk": 456, "nl": 503, "cn": 830},
  {"name": "12", "it": 1128, "uk": 590, "nl": 614, "cn": 1287},
  {"name": "13", "it": 1128, "uk": 797, "nl": 804, "cn": 1975},
  {"name": "14", "it": 1694, "uk": 1061, "nl": 959, "cn": 2744},
  {"name": "15", "it": 2036, "uk": 1391, "nl": 1135, "cn": 4515},
  {"name": "16", "it": 2502, "uk": 1543, "nl": 1413, "cn": 5974},
  {"name": "17", "it": 3089, "uk": 1950, "nl": 1705, "cn": 7711},
  {"name": "18", "it": 3858,"uk": 2626, "nl": 2051, "cn": 9692},
  {"name": "19", "it": 4636,"uk": 3269, "nl": 2460, "cn": 11791},
  {"name": "20", "it": 5883,"uk": 3983, "nl": 2994, "cn": 14380},
  {"name": "21", "it": 7375, "uk": 5018,"nl": 3631, "cn": 17205},
  {"name": "22", "it": 9172, "uk": 5683, 'uk_predict': 6034, "nl": 4204, "cn": 20440},
  {"name": "23", "it": 10149,'uk': 6650, 'uk_predict': 6797, "nl": 4749, "cn": 24324},
  {"name": "24", "it": 15113,'uk': 8077, 'uk_predict': 8407, "nl": 5560, "cn": 28108},
  {"name": "25", "it": 17660, 'uk': 9529, 'uk_predict': 9021, "nl": 6412, "cn": 31161},
  {"name": "26", "it": 21157, 'uk': 11568, 'uk_predict': 11402, "nl": 7431, "cn": 34546},
  {"name": "27", "it": 24747,'uk': 14578, 'uk_predict': 13468, "nl": 8603, "cn": 37198},
  {"name": "28", "it": 27980,'uk': 17089, 'uk_predict': 16866, "cn": 40171},
  {"name": "29", "it": 31506,"cn": 42638, 'uk': 19522, 'uk_predict': 19524},
  {"name": "30", "it": 35713, "cn": 58761, 'uk': 22141, 'uk_predict': 22071},
  {"name": "31", "it": 41035, "cn": 63851, 'uk': 25150, 'uk_predict': 25297},
  {"name": "1", "it": 47021, "cn": 66492,'uk': 29474, 'uk_predict': 28338},
  {"name": "2", "it": 53578, "cn": 68500, 'uk': 33718, 'uk_predict': 33694},
  {"name": "3", "it": 59138, "cn": 70548, 'uk': 38168, 'uk_predict': 37172},
  {"name": "4", "it": 63927, "cn": 72436, 'uk': 41903, 'uk_predict': 41555},
  {"name": "5", "it": 69176, "cn": 74185, 'uk': 47806, 'uk_predict': 45619},
  {"name": "6", "it": 74386, "cn": 75465, 'uk': 51608, 'uk_predict': 52349},
  {"name": "7", "it": 80589, "cn": 76288, 'uk': 55242, 'uk_predict': 56036},
  {"name": "8", "it": 86498, "cn": 76936, 'uk': 60773, 'uk_predict': 59144},
  {"name": "9", "it": 92472, "cn": 76936, 'uk': 65077, 'uk_predict': 65552},
  {"name": "10", "it": 97689, "cn": 77150, 'uk': 73758, 'uk_predict': 68594},
  {"name": "11", "it": 101739, "cn": 77658, 'uk': 78991, 'uk_predict': 78865},
  {"name": "12", "it": 105792, "cn": 78064, 'uk': 84279, 'uk_predict': 83286},
  {"name": "13", "it": 110574, "cn": 78497, 'uk': 88621, 'uk_predict': 88992},
  {"name": "14", "it": 115242, "cn": 78824, 'uk': 93873,'uk_predict': 92947},
  {"name": "15", 'it': 119827, 'cn': 79251, 'uk': 98476, 'uk_predict': 97894},
  {"name": "16", "it": 124632, "cn": 79824, 'uk': 103093, 'uk_predict': 102823},
  {"name": "17", "it": 128948, "cn": 80026, 'uk': 108692, 'uk_predict': 106835},
  {"name": "18", "it": 132547, "cn": 80151, 'uk': 114217, 'uk_predict': 112554},
  {"name": "19", "it": 135586, "cn": 80270, 'uk': 120067, 'uk_predict': 120146},
  {"name": "20", "it": 139422, "cn": 80409, 'uk': 124743, 'uk_predict': 126100},
  {"name": "21", "it": 143626, "cn": 80552, 'uk': 129044, 'uk_predict': 129503},
  {"name": "22", "it": 147577, "cn": 80651},
  {"name": "23", "it": 152271, "cn": 80695},
  {"name": "24", "it": 156363, "cn": 80735},
  {"name": "25", "it": 159516, "cn": 80754},
  {"name": "26", "it": 162488, "cn": 80778},
  {"name": "27", "it": 165155, "cn": 80793},


];

export const numberOfDaysInTheFuture = 30;
export const totalCaseStartDay = 6;
export const fatalityCaseStartDay = 14;
export const Today = 31 + 21; // 31 days in March + days in April
export const TodayTotalIndex = Today - totalCaseStartDay;
export const TodayFatalityIndex = Today - fatalityCaseStartDay;
const totalCases = getPredictCases(raw_total_cases, TodayTotalIndex, numberOfDaysInTheFuture);
const fatalityCases = getPredictCases(raw_death_cases, TodayFatalityIndex, numberOfDaysInTheFuture);
export const displayTotalCases = totalCases;
export const displayFatalityCases = fatalityCases;
export const newCases = getNewCases(totalCases, ['uk', 'uk_predict', 'it'], ['uk', 'uk', 'it']).slice(TodayTotalIndex - 30, TodayTotalIndex + numberOfDaysInTheFuture ); // Past 12 days and Future 10 days
export const newFatalityCases = getNewCases(fatalityCases, ['uk', 'uk_predict'], ['uk', 'uk']).slice(TodayFatalityIndex - 30,TodayFatalityIndex + numberOfDaysInTheFuture ); // Past 12 days and Future 10 days

export const fatalityRates = getFatalityRates(
  fatalityCases.slice(TodayFatalityIndex - 30, TodayFatalityIndex + numberOfDaysInTheFuture),
  totalCases.slice(TodayTotalIndex - 30, TodayTotalIndex + numberOfDaysInTheFuture),
  ['uk', 'it', 'uk_predict', 'cn']);
