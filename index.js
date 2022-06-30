import TSP_Greedy from "./tspGreedy.js";

const X = Infinity;
let M = [
  [0, 1, 2, X],
  [1, 0, X, 3],
  [2, X, 0, X],
  [X, 3, X, 0],
];

let M2 = [
  [0, 15, 5, 8],
  [15, 0, 1, X],
  [5, 1, 0, 3],
  [8, X, 3, 0],
];

const [camino, costo] = TSP_Greedy(M);

console.log("Solución: ", camino);
console.log("Costo: ", costo);
