import * as grafosXml from "./resources/grafosXml.js";
import { obtenerGrafo } from "./src/utils/parser.js";
import tspGreedy from "./src/tspGreedy.js";
import busquedaLocal from "./src/busquedaLocal.js";
import grasp from "./src/grasp.js";

const G = obtenerGrafo(`./resources/tests/${grafosXml.GRAFO_76_NODOS}`);

// //Algoritmo greedy
// const solucionGreedy = tspGreedy(G);
// console.log("Solución - algoritmo greedy: ", solucionGreedy);

// //Búsqueda local
// const solucionBusquedaLocal = busquedaLocal(G, solucionGreedy, 1000, 5, 10);
// console.log("Solución - búsqueda local: ", solucionBusquedaLocal);

/** GRASP
 * Verifies if the string is in a valid email format
 * @param  {clase Grafo} grafo
 * @param  {Int} ejecucionesPermitidas
 * @param  {Int} ejecucionesParcialesPermitidas
 * @param  {Int} porcentajeMinimoDeMejora
 * @return  {Solución: {circuito: [Int] - costo: Int}}
 */
const solucionGrasp = grasp(G, 1000, 25, 5);
console.log("Solución - GRASP: ", solucionGrasp);
