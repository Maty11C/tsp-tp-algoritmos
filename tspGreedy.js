import floyd_BT from "./floydBT.js";

//Costo de recorrer la sucesión de nodos
const costo = (M, res) => {
  let sum = 0;
  let i = 0;
  while (i < res.length - 1) {
    let current = res[i];
    let next = res[i + 1];
    sum += M[current][next];
    i++;
  }
  return sum;
};

// retorna todos los adyacentes menos yo mismo
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

// retorna todos los adyacentes menos yo mismo y los no visitados
// [{nodo, peso}]
const adyacentesValidos = (M, i, visited) =>
  M[i]
    .map(function (x, index) {
      return {
        nodo: index,
        peso: x,
      };
    })
    .filter((x) => x.nodo !== i && !visited.has(x.nodo));

//Heuristica: Nodo más cercano ------------------------------------------------------------------------
const ordenarPorPesoMinimo = (ady) => ady.sort((a, b) => a.peso - b.peso);

//Heuristica: Nodo más cercano de dos niveles
//- Ordeno por la suma de los pesos del nodo próximo y el inmediatamente próximo mínimo
const seleccionarNodoMasCercano = (ady) => ordenarPorPesoMinimo(ady)[0];

const ordenarPorSumaPesosMinimos = (ady, M, source) => {
  let adyacentesConPesoMinimoSiguiente = ady.map((adyacente) => {
    return {
      nodo: adyacente.nodo,
      peso:
        adyacente.peso +
        seleccionarNodoMasCercano(
          adyacentes(M, adyacente.nodo).filter((x) => x.nodo !== source)
        ).peso,
    };
  });
  return ordenarPorPesoMinimo(adyacentesConPesoMinimoSiguiente);
};

// Aleatorizar: Toma los primeros n elementos y selecciona uno al azar -----------------------------------
const aleatorizar = (ady, n) => {
  let primerosNAdyacentes = ady.slice(0, n);
  var item =
    primerosNAdyacentes[Math.floor(Math.random() * primerosNAdyacentes.length)];
  return item;
};

// Algoritmo greedy para problema de viajante de comercio-------------------------------------------------
const TSP_Greedy = (M) => {
  M = floyd_BT(M); //Aplico Floyd para completar los infinitos de la matriz con caminos minimos
  console.table(M);

  const n = M.length;
  const V = Array.from(Array(n).keys());

  let source = V[0]; //Empiezo por el primer nodo de la matriz

  let res = []; //Inicializo array vacio para la solucion
  let visited = new Set(); //Inicializo set vacio para los nodos visitados

  visited.add(source); //Marco el nodo source como visitado
  res.push(source); //Agrego el nodo source a la solucion

  console.log("visited", visited);
  console.log("res", res);
  console.log("");

  let index = source;
  //Itero hasta no haber visitado todos los nodos
  while (visited.size < n) {
    //Obtengo mis nodos adyacentes que no fueron visitados...
    let ady = adyacentesValidos(M, index, visited);

    //...Los ordeno por mi heuristica
    // let adyacentesOrdenados = ordenarPorPesoMinimo(ady, M);
    let adyacentesOrdenados = ordenarPorSumaPesosMinimos(ady, M, index);
    console.log("adyacentes ordenados", adyacentesOrdenados);

    let next = aleatorizar(adyacentesOrdenados, 2); //Aleatorizo la selección del próximo nodo. ¿TODO: Parametrizar el n?
    console.log("nodo siguiente", next);
    index = next.nodo; //Me muevo al nodo que elegí

    visited.add(index); //Lo agrego a los visitados
    res.push(index); //Lo agrego a la solución

    console.log("visited", visited);
    console.log("res", res);
    console.log("");
  }

  res.push(source); //Agrego el nodo source para formar el circuito
  const costoTotal = costo(M, res);

  return [res, costoTotal];
};

export default TSP_Greedy;
