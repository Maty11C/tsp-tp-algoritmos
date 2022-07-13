import {
  BURMA14,
  GR17,
  GR21,
  GR24,
  FRI26,
  BAYG29,
  DANTZIG42,
  GR48,
  EIL51,
  BERLIN52,
  BRAZIL58,
  EIL76,
  GR96,
  EIL101,
  GR120,
  BIER127,
  CH130,
  GR137,
  CH150,
  BRG180,
  D198,
} from "./constants/grafosXml.js";
import { exportarGrafico } from "./utils/exporter.js";

/**
 * Se obtiene el máximo entre los valores máximos de iteraciones resultantes de ejecutar grasp para cada grafo.
 * Setup:
 * - 50000 ejecuciones maximas
 * - 5000 de ejecuciones consecutivas máximas
 * - 3% de porcentaje minimo de mejora
 */

const scoring = {
  [BURMA14]: Math.max(
    //Mejor costo encontrado: 3233
    9,
    22,
    136,
    72,
    51,
    143,
    30,
    28,
    22,
    79
  ),
  [GR17]: Math.max(
    //Mejor costo encontrado: ?
    32,
    18,
    34,
    22,
    30,
    469,
    16,
    147,
    98,
    275
  ),
  [GR21]: Math.max(3754, 240, 213, 46, 1308, 455, 4918, 300, 1527, 1485), //Mejor costo encontrado: 1130
  [GR24]: Math.max(484, 28, 1344, 29, 1607, 1623, 550, 142, 406, 4437),
  [FRI26]: Math.max(
    //Mejor costo encontrado: 700
    1583,
    326,
    7,
    18,
    1468,
    24,
    1038,
    2072,
    1469,
    4511
  ),
  [BAYG29]: Math.max(
    //Mejor costo encontrado: 1700
    599,
    529,
    537,
    217,
    4524,
    721,
    677,
    75,
    2,
    3957
  ),
  // "29'": 1,
  [DANTZIG42]: Math.max(
    //Mejor costo encontrado: 850
    741,
    47,
    224,
    257,
    3680,
    83,
    136,
    836,
    5249,
    835
  ),
  [GR48]: Math.max(
    //Mejor costo encontrado: 6101
    229,
    2675,
    3481,
    1922,
    3061,
    277,
    630,
    1271,
    3459,
    2891
  ),
  // "48'": 1,
  [EIL51]: Math.max(
    //Mejor costo encontrado: 508
    582,
    3540,
    62,
    4684,
    374,
    2348,
    616,
    144,
    346,
    150
  ),
  [BERLIN52]: Math.max(68, 8, 416, 1229, 811, 47, 14, 1116, 452, 2450), //Mejor costo encontrado: 9087
  [BRAZIL58]: Math.max(
    //Mejor costo encontrado: 29041
    2646,
    154,
    6181,
    1030,
    245,
    2618,
    974,
    39,
    2249,
    3167
  ),
  [EIL76]: Math.max(255, 12, 269, 3992, 4536), //Mejor costo encontrado: 701
  [GR96]: Math.max(6, 52, 217, 84, 314, 2529), //Mejor costo encontrado: 87966
  [EIL101]: Math.max(17, 20, 165, 9, 295, 837), //Mejor costo encontrado: 848
  [GR120]: Math.max(4, 1, 72, 352, 9), //Mejor costo encontrado: 10332
  [BIER127]: Math.max(55, 3224, 2469, 13, 88), //Mejor costo encontrado: 169609
  [CH130]: Math.max(41, 217, 97, 128, 48), //Mejor costo encontrado: 10202
  [GR137]: Math.max(25, 5, 917, 6, 42, 1838), //Mejor costo encontrado: 115832
  [CH150]: Math.max(3, 10, 2093, 2, 29), //Mejor costo encontrado: 11657
  [BRG180]: Math.max(21, 1, 2, 88, 3), //Mejor costo encontrado: 3480
  [D198]: Math.max(14, 380, 23), //Mejor costo encontrado: 26500
};

const grafos = Object.keys(scoring);
const iteracionesMaximas = Object.values(scoring);

exportarGrafico("Scoring 1000 3", grafos, iteracionesMaximas);
