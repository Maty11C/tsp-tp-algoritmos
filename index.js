import floyd from "./src/floyd.js";
import TSP_Greedy from "./src/tspGreedy.js";
import busquedaLocal from "./src/busquedaLocal.js";
import { M3, M4, M5, M6 } from "./resources/grafos.js";

let M = M6;

M = floyd(M); //Aplico Floyd para obtener la matriz completa
console.table(M);

//Aplico el algoritmo greedy a la matriz completa para el problema de viajante de comercio
const { solucion, costo } = TSP_Greedy(M);
console.log("Solución: ", solucion);
console.log("Costo: ", costo);

//Aplico busqueda local para encontrar una mejor solución
const { solucion: nuevaSolucion, costo: nuevoCosto } = busquedaLocal(M, {
  solucion,
  costo,
});
console.log("Nueva solución: ", nuevaSolucion);
console.log("Nuevo costo: ", nuevoCosto);
