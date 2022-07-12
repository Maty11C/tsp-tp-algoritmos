import { exportarGrafico } from "./utils/exporter.js";

const average = (array) => array.reduce((a, b) => a + b) / array.length;

/**
 * Se obtiene el promedio de los valores máximos de iteraciones resultantes registradas al ejecutar grasp 10 veces para cada grafo.
 * Setup:
 * - 50000 ejecuciones maximas
 * - Número de reintentos adaptable según el tamaño del grafo
 * - Porcentaje minimo de mejora adaptable según el costo óptimo del grafo
 */

const grafo_14_iteracionesMaximas = average([
  145, 110, 50, 40, 390, 120, 70, 100, 100, 50
]);

const grafo_17_iteracionesMaximas = average([
  300, 120, 15, 420, 50, 540, 160, 80, 840, 220, 
]);

const grafo_21_iteracionesMaximas = average([
  900, 190, 495, 230, 800
]);

const grafo_24_iteracionesMaximas = average([
  960, 260, 390, 490, 580
]);

const grafo_26_iteracionesMaximas = average([
  1280, 1095, 825, 60, 240
]);

const grafo_29_iteracionesMaximas = average([
  235, 510, 1105, 325, 250
]);

const grafo_42_iteracionesMaximas = average([
  380, 75, 280, 215, 2395
]);

const grafo_48_iteracionesMaximas = average([
  1850, 760, 1250, 1230, 255
]);

const grafo_51_iteracionesMaximas = average([
  275, 990, 1830, 630, 2450
]);

const grafo_52_iteracionesMaximas = average([
  2245, 
]);

const grafo_58_iteracionesMaximas = average([
  3120
]);

const grafo_76_iteracionesMaximas = average([
  2900
]);

const grafo_96_iteracionesMaximas = average([
  // 975, 480, 780, 660
  2600
]);

const grafo_101_iteracionesMaximas = average([
  // 175, 125, 400, 700, 1400, 500, 800, 825, 400, 350,
]);

const grafo_120_iteracionesMaximas = [1075];

const grafo_127_iteracionesMaximas = [225];

const grafo_130_iteracionesMaximas = [175];

const grafo_137_iteracionesMaximas = [325];

const grafo_150_iteracionesMaximas = [375];

const grafo_180_iteracionesMaximas = [1075];

const grafo_198_iteracionesMaximas = [150];

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
  // 96: grafo_96_iteracionesMaximas,
  // 101: grafo_101_iteracionesMaximas,
  // 120: grafo_120_iteracionesMaximas,
  // 127: grafo_127_iteracionesMaximas,
  // 130: grafo_130_iteracionesMaximas,
  // 137: grafo_137_iteracionesMaximas,
  // 150: grafo_150_iteracionesMaximas,
  // 180: grafo_180_iteracionesMaximas,
  // 198: grafo_198_iteracionesMaximas,
};

const grafos = Object.keys(values);
const iteracionesMaximas = Object.values(values);

exportarGrafico("Scoring 1000 3", grafos, iteracionesMaximas);
