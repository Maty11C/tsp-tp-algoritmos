import { costoSwap } from "./costo.js";

const swap = (solucion, i, j) => {
  let nuevaSolucion = solucion.map((x) => x);
  var x = nuevaSolucion[j];
  nuevaSolucion[j] = nuevaSolucion[i];
  nuevaSolucion[i] = x;
  return nuevaSolucion;
};

//Genera soluciones vecinas intercambiando nodos consecutivos que no sean ni el primero ni el último
const generarSolucionesVecinas = (M, solucion_costo) => {
  let { solucion, costo } = solucion_costo;
  let soluciones_costos = [];
  for (let index = 1; index < solucion.length - 2; index++) {
    let nuevaSolucion = swap(solucion_costo.solucion, index, index + 1);
    let nuevoCosto = costoSwap(M, solucion, costo, index, index + 1);
    soluciones_costos.push({ solucion: nuevaSolucion, costo: nuevoCosto });
  }
  return soluciones_costos;
};

//Retorna la mejor solucion en base al menor costo
const seleccionarMejorSolucion = (soluciones_costos) =>
  soluciones_costos.reduce((prev, curr) =>
    prev.costo < curr.costo ? prev : curr
  );

//Genera los vecinos, elige el mejor y lo compara con la solucion actual...
// - Si el mejor vecino es de menor costo, lo elijo y hago recursion para intentar obtener otro mejor
// - Sino retorna la solucion actual
const busquedaLocal = (M, solucion_costo) => {
  let solucionVecinas_costosVecinos = generarSolucionesVecinas(
    M,
    solucion_costo
  );
  let mejorSolucion_mejorCosto = seleccionarMejorSolucion(
    solucionVecinas_costosVecinos
  );
  return mejorSolucion_mejorCosto.costo < solucion_costo.costo
    ? busquedaLocal(M, mejorSolucion_mejorCosto)
    : solucion_costo;
};

export default busquedaLocal;
