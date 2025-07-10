﻿const nexradStyle = document.createElement('style');
nexradStyle.textContent = `
.nexrad-dropdown-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    margin-bottom: 6px;
}
.nexrad-dropdown-label {
    font-size: 14px;
    margin-right: 6px;
    color: #333;
}
.nexrad-dropdown-custom {
    position: relative;
    min-width: 120px;
    font-size: 14px;
}
.nexrad-dropdown-selected {
    padding: 8px 16px;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
}
.nexrad-dropdown-list {
    display: none;
    position: absolute;
    z-index: 1000;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 2px;
    max-height: 220px;
    overflow-y: auto;
    min-width: 100%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.nexrad-dropdown-custom.open .nexrad-dropdown-list {
    display: block;
}
.nexrad-dropdown-item {
    padding: 8px 16px;
    cursor: pointer;
    transition: background 0.15s;
}
.nexrad-dropdown-item:hover {
    background: #0078A8;
    color: #fff;
}
`;
document.head.appendChild(nexradStyle);

// NEXRAD Stations (159 total)
const NEXRAD = [
  { Name: "KABR", Latitude: 45.4558, Longitude: -98.4132, MSLHeight: 397.46 },
  { Name: "KABX", Latitude: 35.1497, Longitude: -106.8242, MSLHeight: 1792.15 },
  { Name: "KAKQ", Latitude: 36.9839, Longitude: -77.0075, MSLHeight: 34.14 },
  { Name: "KAMA", Latitude: 35.2333, Longitude: -101.7092, MSLHeight: 1094.69 },
  { Name: "KAMX", Latitude: 25.6111, Longitude: -80.4127, MSLHeight: 3.35 },
  { Name: "KAPX", Latitude: 44.9067, Longitude: -84.7197, MSLHeight: 446.48 },
  { Name: "KARX", Latitude: 43.8228, Longitude: -91.1917, MSLHeight: 389.23 },
  { Name: "KATX", Latitude: 48.1947, Longitude: -122.4958, MSLHeight: 151.18 },
  { Name: "KBBX", Latitude: 39.4961, Longitude: -121.6317, MSLHeight: 53.34 },
  { Name: "KBGM", Latitude: 42.1997, Longitude: -75.985, MSLHeight: 489.2 },
  { Name: "KBHX", Latitude: 40.4989, Longitude: -124.2919, MSLHeight: 731.22 },
  { Name: "KBIS", Latitude: 46.7708, Longitude: -100.7603, MSLHeight: 505.66 },
  { Name: "KBLX", Latitude: 45.8539, Longitude: -108.6067, MSLHeight: 1096.94 },
  { Name: "KBMX", Latitude: 33.1719, Longitude: -86.7697, MSLHeight: 196.6 },
  { Name: "KBOX", Latitude: 41.9558, Longitude: -71.1372, MSLHeight: 34.75 },
  { Name: "KBRO", Latitude: 25.9158, Longitude: -97.4189, MSLHeight: 6.71 },
  { Name: "KBUF", Latitude: 42.9489, Longitude: -78.7369, MSLHeight: 211.53 },
  { Name: "KBYX", Latitude: 24.5972, Longitude: -81.7033, MSLHeight: 2.13 },
  { Name: "KCAE", Latitude: 33.9486, Longitude: -81.1183, MSLHeight: 69.19 },
  { Name: "KCBW", Latitude: 46.0392, Longitude: -67.8064, MSLHeight: 243.23 },
  { Name: "KCBX", Latitude: 43.4906, Longitude: -116.2356, MSLHeight: 917.75 },
  { Name: "KCCX", Latitude: 40.9231, Longitude: -78.0039, MSLHeight: 732.13 },
  { Name: "KCLE", Latitude: 41.4131, Longitude: -81.8597, MSLHeight: 238.05 },
  { Name: "KCLX", Latitude: 32.6556, Longitude: -81.0422, MSLHeight: 29.57 },
  { Name: "KCRX", Latitude: 41.0131, Longitude: -112.4486, MSLHeight: 1988.34 },
  { Name: "KCRP", Latitude: 27.7842, Longitude: -97.5111, MSLHeight: 13.41 },
  { Name: "KCXX", Latitude: 44.5111, Longitude: -73.1664, MSLHeight: 249.02 },
  { Name: "KCYS", Latitude: 41.1519, Longitude: -104.8061, MSLHeight: 1869.16 },
  { Name: "KDAX", Latitude: 38.5014, Longitude: -121.6778, MSLHeight: 9.14 },
  { Name: "KDDC", Latitude: 37.7608, Longitude: -99.9686, MSLHeight: 789.43 },
  { Name: "KDIX", Latitude: 39.9469, Longitude: -74.4108, MSLHeight: 45.72 },
  { Name: "KDLH", Latitude: 46.8369, Longitude: -92.2097, MSLHeight: 435.25 },
  { Name: "KDMX", Latitude: 41.7311, Longitude: -93.7228, MSLHeight: 298.7 },
  { Name: "KDOX", Latitude: 38.8258, Longitude: -75.44, MSLHeight: 15.24 },
  { Name: "KDTX", Latitude: 42.6997, Longitude: -83.4719, MSLHeight: 327.05 },
  { Name: "KDVN", Latitude: 41.6117, Longitude: -90.5808, MSLHeight: 229.21 },
  { Name: "KDYX", Latitude: 32.5383, Longitude: -99.2542, MSLHeight: 466.04 },
  { Name: "KEAX", Latitude: 38.8103, Longitude: -94.2642, MSLHeight: 303.89 },
  { Name: "KEMX", Latitude: 31.8936, Longitude: -110.6303, MSLHeight: 1586.35 },
  { Name: "KENX", Latitude: 42.5864, Longitude: -74.0642, MSLHeight: 556.87 },
  { Name: "KEOX", Latitude: 31.46, Longitude: -85.4592, MSLHeight: 137.16 },
  { Name: "KEPZ", Latitude: 31.8731, Longitude: -106.6978, MSLHeight: 1251.76 },
  { Name: "KESX", Latitude: 35.7014, Longitude: -114.8917, MSLHeight: 1481.28 },
  { Name: "KEVX", Latitude: 30.5644, Longitude: -85.9217, MSLHeight: 50.9 },
  { Name: "KEWX", Latitude: 29.7039, Longitude: -98.0283, MSLHeight: 192.63 },
  { Name: "KEYX", Latitude: 35.0975, Longitude: -117.5608, MSLHeight: 837.9 },
  { Name: "KFCX", Latitude: 37.0242, Longitude: -80.2742, MSLHeight: 876.91 },
  { Name: "KFDR", Latitude: 34.3622, Longitude: -98.9764, MSLHeight: 368.2 },
  { Name: "KFDX", Latitude: 34.6358, Longitude: -103.6292, MSLHeight: 1411.22 },
  { Name: "KFSD", Latitude: 43.5877, Longitude: -96.72948, MSLHeight: 455 },
  { Name: "KFSX", Latitude: 35.0319, Longitude: -111.6867, MSLHeight: 2259.55 },
  { Name: "KFTG", Latitude: 39.7867, Longitude: -104.5458, MSLHeight: 1678.23 },
  { Name: "KFWS", Latitude: 32.5731, Longitude: -97.3031, MSLHeight: 208.18 },
  { Name: "KGGX", Latitude: 35.2025, Longitude: -81.1497, MSLHeight: 251.16 },
  { Name: "KGJX", Latitude: 39.0622, Longitude: -108.2136, MSLHeight: 3040.32 },
  { Name: "KGLD", Latitude: 39.3667, Longitude: -101.7, MSLHeight: 1110.74 },
  { Name: "KGRB", Latitude: 44.4983, Longitude: -88.1114, MSLHeight: 208.18 },
  { Name: "KGRK", Latitude: 30.7217, Longitude: -97.3828, MSLHeight: 166.12 },
  { Name: "KGRR", Latitude: 42.8939, Longitude: -85.5447, MSLHeight: 237.74 },
  { Name: "KGSP", Latitude: 34.8831, Longitude: -82.22, MSLHeight: 287.12 },
  { Name: "KGWX", Latitude: 33.8967, Longitude: -88.3292, MSLHeight: 145.39 },
  { Name: "KGYX", Latitude: 43.8914, Longitude: -70.2567, MSLHeight: 125.58 },
  { Name: "KHDC", Latitude: 30.519, Longitude: -90.407, MSLHeight: 13 },
  { Name: "KHGX", Latitude: 29.4719, Longitude: -95.0789, MSLHeight: 5.18 },
  { Name: "KHNX", Latitude: 36.3142, Longitude: -119.6317, MSLHeight: 74.37 },
  { Name: "KHPX", Latitude: 36.7367, Longitude: -87.2853, MSLHeight: 171.6 },
  { Name: "KHTX", Latitude: 34.9306, Longitude: -86.0833, MSLHeight: 541.02 },
  { Name: "KICT", Latitude: 37.6544, Longitude: -97.4428, MSLHeight: 406.91 },
  { Name: "KICX", Latitude: 37.5908, Longitude: -112.8622, MSLHeight: 3230.88 },
  { Name: "KILN", Latitude: 39.4203, Longitude: -83.8217, MSLHeight: 320.95 },
  { Name: "KILX", Latitude: 40.1506, Longitude: -89.3367, MSLHeight: 176.78 },
  { Name: "KIND", Latitude: 39.7078, Longitude: -86.2803, MSLHeight: 243.23 },
  { Name: "KINX", Latitude: 36.175, Longitude: -95.5644, MSLHeight: 205.74 },
  { Name: "KIWA", Latitude: 33.2892, Longitude: -111.67, MSLHeight: 412.09 },
  { Name: "KIWX", Latitude: 41.3586, Longitude: -85.7, MSLHeight: 291.08 },
  { Name: "KJAN", Latitude: 32.3178, Longitude: -90.08, MSLHeight: 90.83 },
  { Name: "KJGX", Latitude: 32.675, Longitude: -83.3511, MSLHeight: 159.11 },
  { Name: "KJKL", Latitude: 37.5908, Longitude: -83.3131, MSLHeight: 415.14 },
  { Name: "KLBB", Latitude: 33.6542, Longitude: -101.8142, MSLHeight: 994.11 },
  { Name: "KLCH", Latitude: 30.125, Longitude: -93.2158, MSLHeight: 4.27 },
  { Name: "KLGX", Latitude: 47.1158, Longitude: -124.1069, MSLHeight: 92.05 },
  { Name: "KLIX", Latitude: 30.3367, Longitude: -89.8253, MSLHeight: 6.71 },
  { Name: "KLNX", Latitude: 41.9578, Longitude: -100.5761, MSLHeight: 908.3 },
  { Name: "KLOT", Latitude: 41.6044, Longitude: -88.0847, MSLHeight: 202.69 },
  { Name: "KLRX", Latitude: 40.7397, Longitude: -116.8028, MSLHeight: 2057.4 },
  { Name: "KLSX", Latitude: 38.6986, Longitude: -90.6828, MSLHeight: 185.62 },
  { Name: "KLTX", Latitude: 33.9892, Longitude: -78.4292, MSLHeight: 14.63 },
  { Name: "KLVX", Latitude: 37.9742, Longitude: -85.9439, MSLHeight: 219.46 },
  { Name: "KLWX", Latitude: 38.9756, Longitude: -77.4875, MSLHeight: 84.12 },
  { Name: "KLZK", Latitude: 34.8364, Longitude: -92.2622, MSLHeight: 173.43 },
  { Name: "KMAF", Latitude: 31.9433, Longitude: -102.1892, MSLHeight: 873.86 },
  { Name: "KMAX", Latitude: 42.0811, Longitude: -122.7167, MSLHeight: 2295.91 },
  { Name: "KMBX", Latitude: 48.2758, Longitude: -100.7603, MSLHeight: 497.74 },
  { Name: "KMHX", Latitude: 34.7758, Longitude: -76.8764, MSLHeight: 8.84 },
  { Name: "KMKX", Latitude: 42.9678, Longitude: -88.5506, MSLHeight: 292.61 },
  { Name: "KMLB", Latitude: 28.1131, Longitude: -80.6542, MSLHeight: 10.36 },
  { Name: "KMOB", Latitude: 30.6794, Longitude: -88.2397, MSLHeight: 63.4 },
  { Name: "KMPX", Latitude: 44.8489, Longitude: -93.5653, MSLHeight: 287.43 },
  { Name: "KMQT", Latitude: 46.5311, Longitude: -87.5483, MSLHeight: 448.06 },
  { Name: "KMRX", Latitude: 36.1683, Longitude: -83.4017, MSLHeight: 408.43 },
  { Name: "KMSX", Latitude: 47.0414, Longitude: -113.9861, MSLHeight: 2388.54 },
  { Name: "KMTX", Latitude: 41.2628, Longitude: -112.4478, MSLHeight: 1985.29 },
  { Name: "KMUX", Latitude: 37.155, Longitude: -121.8983, MSLHeight: 1056.36 },
  { Name: "KMVX", Latitude: 47.5281, Longitude: -97.325, MSLHeight: 344.42 },
  { Name: "KMXX", Latitude: 32.5367, Longitude: -85.7897, MSLHeight: 117.35 },
  { Name: "KNQA", Latitude: 35.3447, Longitude: -89.8733, MSLHeight: 85.65 },
  { Name: "KOAX", Latitude: 41.3203, Longitude: -96.3664, MSLHeight: 350.52 },
  { Name: "KOHX", Latitude: 36.2472, Longitude: -86.5625, MSLHeight: 176.78 },
  { Name: "KOKX", Latitude: 40.865, Longitude: -72.8639, MSLHeight: 25.91 },
  { Name: "KOTX", Latitude: 47.68, Longitude: -117.6261, MSLHeight: 725.12 },
  { Name: "KPAH", Latitude: 37.0683, Longitude: -88.7719, MSLHeight: 123.44 },
  { Name: "KPBZ", Latitude: 40.5317, Longitude: -80.2181, MSLHeight: 360.88 },
  { Name: "KPDT", Latitude: 45.6906, Longitude: -118.8528, MSLHeight: 462.99 },
  { Name: "KPOE", Latitude: 31.1556, Longitude: -92.9761, MSLHeight: 124.97 },
  { Name: "KPUX", Latitude: 38.4597, Longitude: -104.1814, MSLHeight: 1597.23 },
  { Name: "KRAX", Latitude: 35.6653, Longitude: -78.4897, MSLHeight: 106.07 },
  { Name: "KRGX", Latitude: 39.7542, Longitude: -119.4617, MSLHeight: 2530.15 },
  { Name: "KRIW", Latitude: 43.0661, Longitude: -108.4767, MSLHeight: 1699.26 },
  { Name: "KRLX", Latitude: 38.3111, Longitude: -81.7233, MSLHeight: 332.23 },
  { Name: "KRTX", Latitude: 45.7147, Longitude: -122.9661, MSLHeight: 499.87 },
  { Name: "KSFX", Latitude: 43.1058, Longitude: -112.6858, MSLHeight: 1364.18 },
  { Name: "KSGF", Latitude: 37.235, Longitude: -93.4, MSLHeight: 390.14 },
  { Name: "KSHV", Latitude: 32.4508, Longitude: -93.8411, MSLHeight: 81.08 },
  { Name: "KSJT", Latitude: 31.3711, Longitude: -100.4925, MSLHeight: 576.07 },
  { Name: "KSOX", Latitude: 33.8178, Longitude: -117.6358, MSLHeight: 950.52 },
  { Name: "KSRX", Latitude: 35.2903, Longitude: -94.3617, MSLHeight: 147.52 },
  { Name: "KTLH", Latitude: 30.3975, Longitude: -84.3289, MSLHeight: 17.37 },
  { Name: "KTLX", Latitude: 35.3331, Longitude: -97.2775, MSLHeight: 371.55 },
  { Name: "KTBW", Latitude: 27.6753, Longitude: -82.4017, MSLHeight: 12.8 },
  { Name: "KTFX", Latitude: 47.4597, Longitude: -111.3853, MSLHeight: 1692.86 },
  { Name: "KTWX", Latitude: 38.9967, Longitude: -96.2325, MSLHeight: 414.53 },
  { Name: "KTYX", Latitude: 43.7558, Longitude: -75.68, MSLHeight: 563.88 },
  { Name: "KUDX", Latitude: 44.1256, Longitude: -102.8297, MSLHeight: 916.84 },
  { Name: "KUEX", Latitude: 40.3208, Longitude: -98.4417, MSLHeight: 606.55 },
  { Name: "KVAX", Latitude: 30.89, Longitude: -83.0017, MSLHeight: 54.86 },
  { Name: "KVBX", Latitude: 34.8389, Longitude: -120.3975, MSLHeight: 352.65 },
  { Name: "KVNX", Latitude: 36.7408, Longitude: -98.1278, MSLHeight: 378.56 },
  { Name: "KVTX", Latitude: 34.4117, Longitude: -117.6833, MSLHeight: 1981.2 },
  { Name: "KVWX", Latitude: 38.26, Longitude: -87.7247, MSLHeight: 147.52 },
  { Name: "KYUX", Latitude: 32.4953, Longitude: -114.6567, MSLHeight: 87.17 },
  { Name: "PABC", Latitude: 60.7917, Longitude: -161.8742, MSLHeight: 47.85 },
  { Name: "PACG", Latitude: 57.0778, Longitude: -135.5292, MSLHeight: 36.58 },
  { Name: "PAEC", Latitude: 64.5117, Longitude: -165.295, MSLHeight: 14.02 },
  { Name: "PAHG", Latitude: 60.725, Longitude: -151.3517, MSLHeight: 25.6 },
  { Name: "PAIH", Latitude: 65.035, Longitude: -147.5017, MSLHeight: 518.16 },
  { Name: "PAKC", Latitude: 58.6792, Longitude: -156.6292, MSLHeight: 15.85 },
  { Name: "PAPD", Latitude: 61.1542, Longitude: -149.9658, MSLHeight: 49.38 },
  { Name: "PHKI", Latitude: 21.8939, Longitude: -159.5522, MSLHeight: 34.14 },
  { Name: "PHKM", Latitude: 20.1253, Longitude: -155.7778, MSLHeight: 337.41 },
  { Name: "PHMO", Latitude: 21.1328, Longitude: -157.18, MSLHeight: 411.48 },
  { Name: "PHWA", Latitude: 19.095, Longitude: -155.5683, MSLHeight: 2077.62 },
  { Name: "TJUA", Latitude: 18.1156, Longitude: -66.1528, MSLHeight: 860.14 },
  { Name: "PGUA", Latitude: 13.4544, Longitude: 144.8083, MSLHeight: 102.72 },
  { Name: "RKJK", Latitude: 35.9925, Longitude: 126.6983, MSLHeight: 14.63 },
  { Name: "RKSG", Latitude: 36.9631, Longitude: 127.0311, MSLHeight: 51.82 },
  { Name: "RODN", Latitude: 26.3025, Longitude: 127.91, MSLHeight: 66.45 },
];

// TDWR Stations (45 total)
const TDWR = [
  { Name: "TATL", Latitude: 33.629, Longitude: -84.443, MSLHeight: 312 },
  { Name: "TBNA", Latitude: 36.18, Longitude: -86.665, MSLHeight: 183 },
  { Name: "TBOS", Latitude: 42.159, Longitude: -71.136, MSLHeight: 46 },
  { Name: "TBWI", Latitude: 39.173, Longitude: -76.695, MSLHeight: 45 },
  { Name: "TCLT", Latitude: 35.337, Longitude: -80.938, MSLHeight: 228 },
  { Name: "TCLE", Latitude: 41.405, Longitude: -81.852, MSLHeight: 238 },
  { Name: "TCMH", Latitude: 40.031, Longitude: -82.883, MSLHeight: 327 },
  { Name: "TCVG", Latitude: 39.048, Longitude: -84.669, MSLHeight: 268 },
  { Name: "TDAL", Latitude: 32.574, Longitude: -96.971, MSLHeight: 137 },
  { Name: "TDAY", Latitude: 39.902, Longitude: -84.219, MSLHeight: 305 },
  { Name: "TDCA", Latitude: 38.981, Longitude: -77.096, MSLHeight: 61 },
  { Name: "TDEN", Latitude: 39.831, Longitude: -104.657, MSLHeight: 1658 },
  { Name: "TDFW", Latitude: 32.899, Longitude: -97.04, MSLHeight: 174 },
  { Name: "TDTW", Latitude: 42.248, Longitude: -83.352, MSLHeight: 202 },
  { Name: "TEWR", Latitude: 40.594, Longitude: -74.259, MSLHeight: 18 },
  { Name: "TFLL", Latitude: 26.074, Longitude: -80.223, MSLHeight: 2 },
  { Name: "THOU", Latitude: 29.937, Longitude: -95.361, MSLHeight: 49 },
  { Name: "TIAD", Latitude: 38.747, Longitude: -77.529, MSLHeight: 87 },
  { Name: "TIAH", Latitude: 30.106, Longitude: -95.555, MSLHeight: 45 },
  { Name: "TIDS", Latitude: 39.727, Longitude: -86.281, MSLHeight: 243 },
  { Name: "TJFK", Latitude: 40.641, Longitude: -73.762, MSLHeight: 7 },
  { Name: "TLAS", Latitude: 36.236, Longitude: -115.034, MSLHeight: 622 },
  { Name: "TLAX", Latitude: 40.777, Longitude: -73.872, MSLHeight: 9 },
  { Name: "TLIT", Latitude: 34.701, Longitude: -92.209, MSLHeight: 78 },
  { Name: "TLVE", Latitude: 38.009, Longitude: -85.641, MSLHeight: 192 },
  { Name: "TMCI", Latitude: 39.159, Longitude: -94.517, MSLHeight: 305 },
  { Name: "TMDW", Latitude: 41.645, Longitude: -87.604, MSLHeight: 187 },
  { Name: "TMEM", Latitude: 35.058, Longitude: -89.813, MSLHeight: 110 },
  { Name: "TMIA", Latitude: 25.904, Longitude: -80.275, MSLHeight: 3 },
  { Name: "TMKE", Latitude: 42.947, Longitude: -87.905, MSLHeight: 219 },
  { Name: "TMSP", Latitude: 44.881, Longitude: -93.209, MSLHeight: 256 },
  { Name: "TMSY", Latitude: 29.933, Longitude: -90.258, MSLHeight: 1 },
  { Name: "TOKC", Latitude: 35.395, Longitude: -97.599, MSLHeight: 390 },
  { Name: "TOMA", Latitude: 41.286, Longitude: -95.867, MSLHeight: 312 },
  { Name: "TORD", Latitude: 41.958, Longitude: -87.931, MSLHeight: 205 },
  { Name: "TORF", Latitude: 28.472, Longitude: -81.323, MSLHeight: 29 },
  { Name: "TPBI", Latitude: 26.686, Longitude: -80.095, MSLHeight: 6 },
  { Name: "TPHL", Latitude: 39.872, Longitude: -75.243, MSLHeight: 3 },
  { Name: "TPHX", Latitude: 33.427, Longitude: -112.004, MSLHeight: 337 },
  { Name: "TPIT", Latitude: 40.501, Longitude: -80.214, MSLHeight: 361 },
  { Name: "TRDU", Latitude: 35.877, Longitude: -78.785, MSLHeight: 132 },
  { Name: "TSJU", Latitude: 18.468, Longitude: -66.091, MSLHeight: 3 },
  { Name: "TSLC", Latitude: 40.788, Longitude: -111.965, MSLHeight: 1288 },
  { Name: "TSTL", Latitude: 38.809, Longitude: -90.409, MSLHeight: 171 },
  { Name: "TTPA", Latitude: 27.858, Longitude: -82.521, MSLHeight: 13 },
];

let nexradMarker = null;

document.addEventListener('DOMContentLoaded', function () {
    const crefConusBtn = document.getElementById('toggle-conus-cref');
    if (!crefConusBtn) return;

    // Create a row for the dropdown
    const dropdownRow = document.createElement('div');
    dropdownRow.className = 'nexrad-dropdown-row';

    // Add a label
    const label = document.createElement('label');
    label.className = 'nexrad-dropdown-label';
    label.textContent = 'NEXRAD Site:';
    dropdownRow.appendChild(label);

    // Custom dropdown container
    const customDropdown = document.createElement('div');
    customDropdown.className = 'nexrad-dropdown-custom';

    // Selected value display
    const selected = document.createElement('div');
    selected.className = 'nexrad-dropdown-selected';
    selected.textContent = 'Select a site';
    customDropdown.appendChild(selected);

    // Dropdown list
    const list = document.createElement('div');
    list.className = 'nexrad-dropdown-list';

    // Populate list with NEXRAD names
    NEXRAD.forEach(radar => {
        const item = document.createElement('div');
        item.className = 'nexrad-dropdown-item';
        item.textContent = radar.Name;

        // Hover: show marker
        item.addEventListener('mouseenter', function () {
            if (!window.map) return;
            if (nexradMarker) window.map.removeLayer(nexradMarker);
            nexradMarker = L.marker([radar.Latitude, radar.Longitude])
                .addTo(window.map)
                .bindTooltip(radar.Name, { permanent: true, direction: 'top', offset: [-15, -15] })
                .openTooltip();
        });

        // Mouse leave: remove marker
        item.addEventListener('mouseleave', function () {
            if (nexradMarker && window.map) {
                window.map.removeLayer(nexradMarker);
                nexradMarker = null;
            }
        });

        // Click: select value
        item.addEventListener('click', function () {
            selected.textContent = radar.Name;
            customDropdown.classList.remove('open');
        });

        list.appendChild(item);
    });

    customDropdown.appendChild(list);

    // Dropdown open/close logic
    selected.addEventListener('click', function (e) {
        e.stopPropagation();
        customDropdown.classList.toggle('open');
    });
    document.addEventListener('click', function () {
        customDropdown.classList.remove('open');
    });

    dropdownRow.appendChild(customDropdown);

    // Insert the dropdown row after the CREF CONUS button
    if (crefConusBtn.parentElement.classList.contains('toggle-alaska-bref-row')) {
        crefConusBtn.parentElement.after(dropdownRow);
    } else {
        crefConusBtn.after(dropdownRow);
    }
});