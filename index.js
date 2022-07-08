import * as GRAFOS_XML from "./src/constants/grafosXml.js";
import { obtenerGrafo } from "./src/utils/parser.js";
import tspGreedy from "./src/tspGreedy.js";
import busquedaLocal from "./src/busquedaLocal.js";
import grasp from "./src/grasp.js";

const G = obtenerGrafo("./resources/tests/", GRAFOS_XML.GRAFO_14_NODOS);

// //Algoritmo greedy
// const solucionGreedy = tspGreedy(G);
// console.log("Solución - algoritmo greedy: ", solucionGreedy);

// //Búsqueda local
// const solucionBusquedaLocal = busquedaLocal(G, solucionGreedy, 1000, 5, 10);
// console.log("Solución - búsqueda local: ", solucionBusquedaLocal);

const { solucion, grafico } = grasp(G, 1000, 500, 2);
console.log("Solución - GRASP: ", solucion);

grafico.exportar();
