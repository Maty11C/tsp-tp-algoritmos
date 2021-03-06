import { Grafo } from "../src/classes/grafo.js";

const X = Infinity;

const M3 = [
  [0, 1, 2],
  [1, 0, X],
  [2, X, 0],
];

const M4 = [
  [0, 15, 5, 8],
  [15, 0, 1, X],
  [5, 1, 0, 3],
  [8, X, 3, 0],
];

const M5 = [
  [0, 3, 2, 4, X],
  [3, 0, 2, X, 4],
  [2, 2, 0, X, 2],
  [4, X, X, 0, X],
  [X, 4, 2, X, 0],
];

const M6 = [
  [0, 3, 2, 4, X, X],
  [3, 0, 2, X, 4, X],
  [2, 2, 0, X, 2, 1],
  [4, X, X, 0, X, X],
  [X, 4, 2, X, 0, 3],
  [X, X, 1, X, 3, 0],
];

const M = M4;

export const G = new Grafo(M);
