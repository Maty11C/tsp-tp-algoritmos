import TSP_Greedy from "./src/tspGreedy.js";
import busquedaLocal from "./src/busquedaLocal.js";
import * as grafos from "./resources/grafos.js";
import { Grafo } from "./src/graph.js";

const M = grafos.M6;

const G = new Grafo(M);
console.table(G.grafoCompleto);

//Aplico el algoritmo greedy a la matriz completa para el problema de viajante de comercio
const { solucion, costo } = TSP_Greedy(G);
console.log("Solución: ", solucion);
console.log("Costo: ", costo);

//Aplico busqueda local para encontrar una mejor solución
const { solucion: nuevaSolucion, costo: nuevoCosto } = busquedaLocal(G.grafoCompleto, {
  solucion,
  costo,
});
console.log("Nueva solución: ", nuevaSolucion);
console.log("Nuevo costo: ", nuevoCosto);
