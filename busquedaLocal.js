import TSP_Greedy from "./tspGreedy.js";

const X = Infinity;
let M = [
  [0, 1, 2, X],
  [1, 0, X, 3],
  [2, X, 0, X],
  [X, 3, X, 0],
];

const [circuito, costo] = TSP_Greedy(M);

console.log("Solución: ", circuito);
console.log("Costo: ", costo);

//-------------------------------------------------------------------
const swap = (nodos, i, j) => {
  let newArray = nodos.map((x) => x);
  var x = newArray[j];
  newArray[j] = newArray[i];
  newArray[i] = x;
  return newArray;
};

const generarVecinos = (nodos) => {
  let vecinos = [];
  for (let index = 1; index < nodos.length - 2; index++) {
    let vecino = swap(nodos, index, index + 1);
    vecinos.push(vecino);
  }
  return vecinos;
};

console.log(generarVecinos(circuito));

//-------------------------------------------------------------------
//TODO: Hacer algoritmo que vaya generando vecinos y se quede sucesivamente con el mejor, si existe, sino que corte

const busquedaLocal = (solucion) => {
    
}