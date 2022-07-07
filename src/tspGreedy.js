/**
 * Retorna los adyacentes de un nodo
 * @param  {Matriz de adyacencias} M
 * @param  {Int} i
 * @return  {[Int]}
 * @ordenDeComplejidad O(n), donde n es la cantidad de nodos
 */
const adyacentes = (M, i) =>
  M[i]
    .map(function (x, index) {
      return {
        nodo: index,
        peso: x,
      };
    })
    .filter((x) => x.nodo !== i);

/**
 * Retorna los adyacentes no visitados de un nodo
 * @param  {Matriz de adyacencias} M
 * @param  {Int} i
 * @param  {[Int]} visited
 * @return  {[Int]}
 * @ordenDeComplejidad O(n), donde n es la cantidad de nodos
 */
const adyacentesNoVisitados = (M, i, visited) =>
  M[i]
    .map(function (x, index) {
      return {
        nodo: index,
        peso: x,
      };
    })
    .filter((x) => x.nodo !== i && !visited.has(x.nodo));

/**
 * Ordena los nodos por menor peso
 * @param  {{Int, Int}} nodos_pesos
 * @return  {[Int]}
 * @ordenDeComplejidad O(n x log n), donde n es la cantidad de nodos
 */
const ordenarPorPesoMinimo = (nodos_pesos) =>
  nodos_pesos.sort((x, y) => x.peso - y.peso);

/** HEURÍSTICA 'Nodo más cercano'
 * Selecciona el nodo de menor peso
 * @param  {{Int, Int}} nodos_pesos
 * @return  {Int}
 * @ordenDeComplejidad O(n x log n), donde n es la cantidad de nodos
 */
const seleccionarNodoMasCercano = (nodos_pesos) =>
  ordenarPorPesoMinimo(nodos_pesos)[0];

/** HEURÍSTICA 'Nodo más cercano de dos niveles'
 * Ordena los nodos por la suma de los pesos del nodo próximo y el inmediatamente próximo mínimo
 * @param  {{Int, Int}} nodos_pesos
 * @param  {Matriz de adyacencias} M
 * @param  {Int} source
 * @return  {[Int]}
 * @ordenDeComplejidad O(n^2), donde n es la cantidad de nodos
 */
const ordenarPorSumaPesosMinimos = (nodos_pesos, M, source) => {
  // O(n)
  let adyacentesConPesoMinimoSiguiente = nodos_pesos.map((nodo_peso) => {
    return {
      nodo: nodo_peso.nodo,
      peso:
        nodo_peso.peso +
        seleccionarNodoMasCercano(
          adyacentes(M, nodo_peso.nodo).filter((x) => x.nodo !== source)
        ).peso, // O(n x log n)
    };
  });
  return ordenarPorPesoMinimo(adyacentesConPesoMinimoSiguiente); // O(n x log n)
};

/**
 * Recorta la secuencia de nodos en base a un porcentaje
 * @param  {[Int]} nodos
 * @param  {Int} porcentaje
 * @param  {Int} elementosMinimos
 * @return  {[Int]}
 * @ordenDeComplejidad O(n), donde n es la cantidad de nodos
 */
const recortarPorPorcentaje = (nodos, porcentaje, elementosMinimos) => {
  if (porcentaje > 100) throw Error("El porcentaje no puede exceder el 100%");

  let endIndex =
    nodos.length > elementosMinimos ? elementosMinimos : nodos.length;

  const factor = porcentaje / 100;
  if (factor < 1) endIndex = nodos.length * factor;

  if (endIndex > elementosMinimos) return nodos.slice(0, endIndex);
  //Recorto el array para obtener uno nuevo con un % del original
  else return nodos.slice(0, elementosMinimos); //Recorto el array con 'elementosMinimos' elementos
};

/**
 * Recorta la secuencia de nodos en base a un porcentaje y retorna un elemento al azar entre los nodos del recorte
 * @param  {[Int]} nodos
 * @param  {Int} porcentaje
 * @param  {Int} elementosMinimos
 * @return  {Int}
 * @ordenDeComplejidad O(n), donde n es la cantidad de nodos
 */
const seleccionAleatoria = (nodos, porcentaje, elementosMinimos) => {
  const elems = recortarPorPorcentaje(nodos, porcentaje, elementosMinimos);
  return elems[Math.floor(Math.random() * elems.length)]; //Obtengo un elem al azar entre los elegidos
};

/**
 * Calcula el costo del circuito
 * @param  {Matriz de adyacencias} M
 * @return  {Int}
 * @ordenDeComplejidad O(n), donde n es la cantidad de nodos del circuito
 */
export const costo = (M, circuito) => {
  let sum = 0;
  let i = 0;
  while (i < circuito.length - 1) {
    let current = circuito[i];
    let next = circuito[i + 1];
    sum += M[current][next];
    i++;
  }
  return sum;
};

/**
 * Algoritmo greedy para problema de viajante de comercio
 * @param  {Grafo} G
 * @return  {Solución: {circuito: [Int] - costo: Int}}
 * @ordenDeComplejidad O(n^3), donde n es la cantidad de nodos
 */
const tspGreedy = (G) => {
  const M = G.matriz;
  let res = []; //Inicializo array vacio para la solucion
  let visited = new Set(); //Inicializo set vacio para los nodos visitados

  let source = G.nodoInicial(); //Empiezo por el primer nodo del grafo
  visited.add(source); //Agrego el nodo source a los visitados
  res.push(source); //Agrego el nodo source a la solucion

  let index = source;
  //Itero hasta haber visitado todos los nodos. O(n)
  while (visited.size < G.n) {
    let ady = adyacentesNoVisitados(M, index, visited); //Obtengo mis nodos adyacentes que no fueron visitados... O(n)

    let adyacentesOrdenados = ordenarPorSumaPesosMinimos(ady, M, index); //...Los ordeno por mi heuristica. O(n^2)
    let next = seleccionAleatoria(adyacentesOrdenados, 5, 3); //Aleatorizo la selección del próximo nodo (5% y 3 elementos minimos). O(n)

    index = next.nodo; //Me muevo al nodo que elegí
    visited.add(index); //Lo agrego a los visitados
    res.push(index); //Lo agrego a la solución
  }

  res.push(source); //Agrego el nodo source para formar el circuito

  return {
    circuito: res,
    costo: costo(M, res),
  };
};

export default tspGreedy;
