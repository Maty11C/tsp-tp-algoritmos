import { costo } from "./costo.js";

// Retorna los adyacentes de un nodo
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

// Aleatorizar selección: Toma un n % de elementos y selecciona uno al azar -----------------------------------
const recortarPorPorcentaje = (nodos, porcentaje, elementosMinimos) => {
  if (porcentaje > 100)
    throw Error('El porcentaje no puede exceder el 100%')

  let endIndex = (nodos.length > elementosMinimos) ? elementosMinimos : nodos.length
  
  const factor = porcentaje / 100
  if (factor < 1)
    endIndex = nodos.length * factor

  if (endIndex > elementosMinimos)
    return nodos.slice(0, endIndex) //Recorto el array para obtener uno nuevo con un % del original
  else
    return nodos.slice(0, elementosMinimos) //Recorto el array con 'elementosMinimos' elementos
}

const seleccionAleatoria = (nodos, porcentaje, elementosMinimos) => {
  const elems = recortarPorPorcentaje(nodos, porcentaje, elementosMinimos)
  return elems[Math.floor(Math.random() * elems.length)]; //Obtengo un elem al azar entre los elegidos
};

// Algoritmo greedy para problema de viajante de comercio-------------------------------------------------
const TSP_Greedy = (grafo) => {
  const M = grafo.grafoCompleto
  let res = []; //Inicializo array vacio para la solucion
  let visited = new Set(); //Inicializo set vacio para los nodos visitados

  let source = grafo.nodos[0]; //Empiezo por el primer nodo del grafo
  visited.add(source); //Agrego el nodo source a los visitados
  res.push(source); //Agrego el nodo source a la solucion

  let index = source;
  //Itero hasta haber visitado todos los nodos
  while (visited.size < grafo.cantidadDeNodos) {
    let ady = adyacentesNoVisitados(M, index, visited); //Obtengo mis nodos adyacentes que no fueron visitados...

    let adyacentesOrdenados = ordenarPorSumaPesosMinimos(ady, M, index); //...Los ordeno por mi heuristica
    let next = seleccionAleatoria(adyacentesOrdenados, 5, 3); //Aleatorizo la selección del próximo nodo (5% y 3 elementos minimos)

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
