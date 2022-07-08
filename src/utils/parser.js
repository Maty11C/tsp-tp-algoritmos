import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { readFileSync, readdirSync, writeFile } from "fs";
var convert = require("xml-js");
import { Grafo } from "../classes/grafo.js";

const xmlToJson = (pathFile) => {
  const xml = readFileSync(pathFile);
  const parsedGraph = JSON.parse(
    convert.xml2json(xml, { compact: true, spaces: 4 })
  );

  return parsedGraph.travellingSalesmanProblemInstance.graph;
};

const jsonToMatrix = (grafo) => {
  const n = grafo.vertex.length;
  let M = Array.from(Array(n), () => new Array(n));

  for (let nodoOrigen = 0; nodoOrigen < n; nodoOrigen++) {
    const element = grafo.vertex[nodoOrigen];
    const aristas = element.edge;

    M[nodoOrigen][nodoOrigen] = 0;

    for (let j = 0; j < aristas.length; j++) {
      const arista = aristas[j];
      let nodoDestino = arista._text;
      let peso = Number(arista._attributes.cost).toPrecision();

      M[nodoOrigen][nodoDestino] = peso;
    }
  }

  return M;
};

export const obtenerGrafo = (path, fileName) => {
  const pathFile = path + fileName;
  const json = xmlToJson(pathFile);
  const matrix = jsonToMatrix(json);
  return new Grafo(fileName, matrix);
};

export const obtenerGrafos = (path) => {
  const files = readdirSync(path);

  let grafos = [];
  files.forEach((nameFile) => {
    const grafo = obtenerGrafo(`${path}/${nameFile}`);
    grafos.push(grafo);
  });
  return grafos;
};
