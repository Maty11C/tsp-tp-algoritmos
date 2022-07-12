import * as GRAFOS_XML from "./src/constants/grafosXml.js";
import { obtenerGrafo } from "./src/utils/parser.js";
import grasp from "./src/grasp.js";

const G = obtenerGrafo("./resources/tests/", GRAFOS_XML.GRAFO_96_NODOS);

const { solucion, grafico } = grasp(G, 50000, 7000, 1);
console.log("Solución - GRASP: ", solucion);

//TODO: Despues hacer otro scoring para grasp(G, 50000, 5000, 5)

grafico.exportar();
