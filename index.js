import floyd from "./floyd.js";
import TSP_Greedy from "./tspGreedy.js";
import busquedaLocal from "./busquedaLocal.js";

const X = Infinity;

let M = [
  [0, 1, 2, X],
  [1, 0, X, 3],
  [2, X, 0, X],
  [X, 3, X, 0],
];

// let M = [
//   [0, 15, 5, 8],
//   [15, 0, 1, X],
//   [5, 1, 0, 3],
//   [8, X, 3, 0],
// ];

M = floyd(M); //Aplico Floyd para obtener la matriz completa
console.table(M);

const { solucion, costo } = TSP_Greedy(M);
console.log("Solución: ", solucion);
console.log("Costo: ", costo);

const { solucion: nuevaSolucion, costo: nuevoCosto } = busquedaLocal(M, {
  solucion,
  costo,
});
console.log("Nueva solución: ", nuevaSolucion);
console.log("Nuevo costo: ", nuevoCosto);
