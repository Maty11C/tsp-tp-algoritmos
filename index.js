import * as grafos from "./resources/grafos.js";
import * as grafosXml from "./resources/grafosXml.js";
import { obtenerGrafosXml, obtenerGrafoXml } from "./src/utils/parserXML.js";
import tspGreedy from "./src/tspGreedy.js";
import busquedaLocal from "./src/busquedaLocal.js";
import grasp from "./src/grasp.js";


// const M = grafos.M6;
const G = obtenerGrafoXml(`./resources/tests/${grafosXml.GRAFO_76_NODOS}`);

//Algoritmo greedy
const solucionGreedy = tspGreedy(G);
console.log("Solución - algoritmo greedy: ", solucionGreedy);

//Búsqueda local
const solucionBusquedaLocal = busquedaLocal(G.grafoCompleto, solucionGreedy, 50, 10);
console.log("Solución - búsqueda local: ", solucionBusquedaLocal);

// //GRASP
// const solucionGrasp = grasp(G, 1000, 10)
// console.log("Solución - GRASP: ", solucionGrasp);