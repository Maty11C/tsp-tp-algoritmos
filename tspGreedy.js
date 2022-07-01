import { costo } from "./costo.js";

// Retorna los adyacentes de un nodo
// [{nodo, peso}]
const adyacentes = (M, i) =>
  M[i]
    .map(function (x, index) {
      return {
        nodo: index,
        peso: x,
      };
    })
    .filter((x) => x.nodo !== i);

// Retorna los adyacentes no visitados de un nodo
// [{nodo, peso}]
const adyacentesNoVisitados = (M, i, visited) =>
  M[i]
    .map(function (x, index) {
      return {
        nodo: index,
        peso: x,
      };
    })
    .filter((x) => x.nodo !== i && !visited.has(x.nodo));

//Heuristica 1: Nodo más cercano ------------------------------------------------------------------------
const ordenarPorPesoMinimo = (nodos_pesos) =>
  nodos_pesos.sort((x, y) => x.peso - y.peso);

//Heuristica 2: Nodo más cercano de dos niveles ------------------------------------------------------

const seleccionarNodoMasCercano = (nodos_pesos) =>
  ordenarPorPesoMinimo(nodos_pesos)[0];

//Ordena los nodos por la suma de los pesos del nodo próximo y el inmediatamente próximo mínimo
const ordenarPorSumaPesosMinimos = (nodos_pesos, M, source) => {
  let adyacentesConPesoMinimoSiguiente = nodos_pesos.map((nodo_peso) => {
    return {
      nodo: nodo_peso.nodo,
      peso:
        nodo_peso.peso +
        seleccionarNodoMasCercano(
          adyacentes(M, nodo_peso.nodo).filter((x) => x.nodo !== source)
        ).peso,
    };
  });
  return ordenarPorPesoMinimo(adyacentesConPesoMinimoSiguiente);
};

// Aleatorizar selección: Toma los primeros n elementos y selecciona uno al azar -----------------------------------
const seleccionAleatoria = (nodos, n) => {
  let elems = n > nodos.length - 1 ? nodos : nodos.slice(0, n)
  return elems[Math.floor(Math.random() * elems.length)];
};

// Algoritmo greedy para problema de viajante de comercio-------------------------------------------------
const TSP_Greedy = (M) => {
  const n = M.length;
  const V = Array.from(Array(n).keys());

  let res = []; //Inicializo array vacio para la solucion
  let visited = new Set(); //Inicializo set vacio para los nodos visitados

  let source = V[0]; //Empiezo por el primer nodo de la matriz
  visited.add(source); //Marco el nodo source como visitado
  res.push(source); //Agrego el nodo source a la solucion

  let index = source;
  //Itero hasta no haber visitado todos los nodos
  while (visited.size < n) {
    let ady = adyacentesNoVisitados(M, index, visited); //Obtengo mis nodos adyacentes que no fueron visitados...

    let adyacentesOrdenados = ordenarPorSumaPesosMinimos(ady, M, index); //...Los ordeno por mi heuristica
    let next = seleccionAleatoria(adyacentesOrdenados, 2); //Aleatorizo la selección del próximo nodo

    index = next.nodo; //Me muevo al nodo que elegí
    visited.add(index); //Lo agrego a los visitados
    res.push(index); //Lo agrego a la solución
  }

  res.push(source); //Agrego el nodo source para formar el circuito

  return {
    solucion: res,
    costo: costo(M, res),
  };
};

export default TSP_Greedy;
