import * as GRAFOS from "./constants/grafosXml.js";
import { exportarGrafico } from "./utils/exporter.js";

/**
 * Se obtiene el máximo entre los valores máximos de iteraciones resultantes de ejecutar grasp para cada grafo.
 * Setup:
 * - 50000 ejecuciones maximas
 * - 5000 de ejecuciones consecutivas máximas
 * - 3% de porcentaje minimo de mejora
 */

const scoring = {
  [GRAFOS._14_NODOS]: Math.max(
    //Mejor costo encontrado: 3323
    651,
    756,
    231,
    1675,
    47,
    410,
    229,
    1594,
    309,
    2928
  ),
  [GRAFOS._17_NODOS]: Math.max(
    //Mejor costo encontrado: 2182
    1957,
    898,
    3348,
    220,
    116,
    188,
    52,
    942,
    674,
    275
  ),
  [GRAFOS._21_NODOS]: Math.max(
    3754,
    240,
    213,
    46,
    1308,
    455,
    4918,
    300,
    1527,
    1485
  ), //Mejor costo encontrado: 1130
  [GRAFOS._24_NODOS]: Math.max(
    484,
    28,
    1344,
    29,
    1607,
    1623,
    550,
    142,
    406,
    4437
  ),
  [GRAFOS._26_NODOS]: Math.max(
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
  [GRAFOS._29_NODOS]: Math.max(
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
  [GRAFOS._29_NODOS_]: Math.max(
    //Mejor costo encontrado: 2399
    2155,
    2091,
    60,
    3180,
    1541,
    309,
    1821,
    341,
    93,
    87
  ),
  [GRAFOS._42_NODOS]: Math.max(
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
  [GRAFOS._48_NODOS]: Math.max(
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
  [GRAFOS._48_NODOS_]: Math.max(
    //Mejor costo encontrado: 14523
    2606,
    346,
    229,
    1371,
    35,
    2352,
    2706,
    1162,
    3493,
    1619
  ),
  [GRAFOS._51_NODOS]: Math.max(
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
  [GRAFOS._52_NODOS]: Math.max(
    8,
    416,
    1229,
    811,
    47,
    14,
    1116,
    452,
    2450,
    3932
  ), //Mejor costo encontrado: 9087
  [GRAFOS._57_NODOS]: Math.max(
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
  [GRAFOS._76_NODOS]: Math.max(255, 12, 269, 3992, 4536), //Mejor costo encontrado: 701
  [GRAFOS._96_NODOS]: Math.max(6, 52, 217, 84, 314, 2529), //Mejor costo encontrado: 87966
  [GRAFOS._101_NODOS]: Math.max(17, 20, 165, 9, 295, 837), //Mejor costo encontrado: 848
  [GRAFOS._120_NODOS]: Math.max(4, 1, 72, 352, 9), //Mejor costo encontrado: 10332
  [GRAFOS._127_NODOS]: Math.max(55, 3224, 2469, 13, 88), //Mejor costo encontrado: 169609
  [GRAFOS._130_NODOS]: Math.max(41, 217, 97, 128, 48), //Mejor costo encontrado: 10202
  [GRAFOS._137_NODOS]: Math.max(25, 5, 917, 6, 42, 1838), //Mejor costo encontrado: 115832
  [GRAFOS._150_NODOS]: Math.max(3, 10, 2093, 2, 29), //Mejor costo encontrado: 11657
  [GRAFOS._180_NODOS]: Math.max(21, 1, 2, 88, 3), //Mejor costo encontrado: 3480
  [GRAFOS._198_NODOS]: Math.max(14, 380, 23, 9, 595), //Mejor costo encontrado: 26500
};

const grafos = Object.keys(scoring);
const iteracionesMaximas = Object.values(scoring);

exportarGrafico(
  "scoring",
  { label: "Grafo", values: grafos },
  { label: "Iteración", values: iteracionesMaximas }
);
