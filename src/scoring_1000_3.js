import { exportarGrafico } from "./utils/exporter.js";

const average = (array) => array.reduce((a, b) => a + b) / array.length;

/**
 * Se obtiene el promedio de los valores máximos de iteraciones resultantes registradas al ejecutar grasp 10 veces para cada grafo.
 * Setup:
 * - 50000 ejecuciones maximas
 * - 5000 reintentos de base y se adapta según el tamaño del grafo
 * - 3% de porcentaje minimo de mejora
 */

//Costo aprox a óptimo: ?
const grafo_14_iteracionesMaximas = average([
  9, 22, 136, 72, 51, 143, 30, 28, 22, 79,
]);

//Costo aprox a óptimo: ?
const grafo_17_iteracionesMaximas = average([
  32, 18, 34, 22, 30, 469, 16, 147, 98, 275,
]);

//Costo aprox a óptimo: ?
const grafo_21_iteracionesMaximas = average([
  3754, 240, 213, 46, 1308, 455, 4918, 300, 1527, 1485,
]);

//Costo aprox a óptimo: ?
const grafo_24_iteracionesMaximas = average([
  484, 28, 1344, 29, 1607, 1623, 550, 142, 406, 4437,
]);

//Costo aprox a óptimo: 700
const grafo_26_iteracionesMaximas = average([
  1583, 326, 7, 18, 1468, 24, 1038, 2072, 1469, 599,
]);

//Costo aprox a óptimo: 1700
const grafo_29_iteracionesMaximas = average([
  599, 529, 537, 217, 4524, 721, 677, 75, 2, 3957,
]);

//Costo aprox a óptimo: 850
const grafo_42_iteracionesMaximas = average([
  741, 47, 224, 257, 3680, 83, 136, 836, 5249, 835,
]);

//Costo aprox a óptimo: 6101
const grafo_48_iteracionesMaximas = average([
  229, 2675, 3481, 1922, 3061, 277, 630, 1271, 3459, 2891,
]);

//Costo aprox a óptimo: 508
const grafo_51_iteracionesMaximas = average([
  582, 3540, 62, 4684, 374, 2348, 616, 144, 346, 150,
]);

//Costo aprox a óptimo: ?
const grafo_52_iteracionesMaximas = average([
  //...
]);

//Costo aprox a óptimo: 29041
const grafo_58_iteracionesMaximas = average([
  2646, 154, 6181, 1030, 245, 2618, 974, 39, 2249, 3167,
]);

//Costo aprox a óptimo: 701
const grafo_76_iteracionesMaximas = average([255, 12, 269]);

//Costo aprox a óptimo: ?
const grafo_96_iteracionesMaximas = average([]);

//Costo aprox a óptimo: 848
const grafo_101_iteracionesMaximas = average([
  30, 17, 20, 165, 
]);

//Costo aprox a óptimo: 10332
const grafo_120_iteracionesMaximas = [
  4, 1, 72, 
];

//Costo aprox a óptimo: 169609
const grafo_127_iteracionesMaximas = [
  55, 3224, 2469, 
];

//Costo aprox a óptimo: 10202
const grafo_130_iteracionesMaximas = [
  41, 217, 97, 
];

//Costo aprox a óptimo: 115832
const grafo_137_iteracionesMaximas = [
  25, 5, 917, 
];

//Costo aprox a óptimo: 11657
const grafo_150_iteracionesMaximas = [3];

//Costo aprox a óptimo: 3480
const grafo_180_iteracionesMaximas = [
  21,
];

//Costo aprox a óptimo: 26500
const grafo_198_iteracionesMaximas = [14];

const values = {
  0: 0,
  14: grafo_14_iteracionesMaximas,
  17: grafo_17_iteracionesMaximas,
  21: grafo_21_iteracionesMaximas,
  24: grafo_24_iteracionesMaximas,
  26: grafo_26_iteracionesMaximas,
  29: grafo_29_iteracionesMaximas,
  // "29'": 1,
  42: grafo_42_iteracionesMaximas,
  48: grafo_48_iteracionesMaximas,
  // "48'": 1,
  51: grafo_51_iteracionesMaximas,
  52: grafo_52_iteracionesMaximas,
  58: grafo_58_iteracionesMaximas,
  76: grafo_76_iteracionesMaximas,
  96: grafo_96_iteracionesMaximas,
  101: grafo_101_iteracionesMaximas,
  120: grafo_120_iteracionesMaximas,
  127: grafo_127_iteracionesMaximas,
  130: grafo_130_iteracionesMaximas,
  137: grafo_137_iteracionesMaximas,
  150: grafo_150_iteracionesMaximas,
  180: grafo_180_iteracionesMaximas,
  198: grafo_198_iteracionesMaximas,
};

const grafos = Object.keys(values);
const iteracionesMaximas = Object.values(values);

exportarGrafico("Scoring 1000 3", grafos, iteracionesMaximas);
