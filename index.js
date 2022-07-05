import TSP_Greedy from "./src/tspGreedy.js";
import busquedaLocal from "./src/busquedaLocal.js";
import * as grafos from "./resources/grafos.js";
import { Grafo } from "./src/graph.js";

const M = grafos.M6;

const G = new Grafo(M);
console.table(G.grafoCompleto);

//Aplico el algoritmo greedy a la matriz completa para el problema de viajante de comercio
const solucion = TSP_Greedy(G);
console.log("Solución: ", solucion);

//Aplico busqueda local para encontrar una mejor solución
const mejorSolucion = busquedaLocal(G.grafoCompleto, solucion, 50, 10);
console.log("Mejor solución: ", mejorSolucion);
