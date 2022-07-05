import { costoSwap } from "./costo.js";

const swap = (circuito, i, j) => {
  let nuevoCircuito = circuito.map((x) => x);
  var x = nuevoCircuito[j];
  nuevoCircuito[j] = nuevoCircuito[i];
  nuevoCircuito[i] = x;
  return nuevoCircuito;
};

//Genera soluciones vecinas intercambiando nodos consecutivos que no sean ni el primero ni el último
const generarSolucionesVecinas = (M, solucion) => {
  let { circuito, costo } = solucion;
  let soluciones = [];
  for (let index = 1; index < circuito.length - 2; index++) {
    let nuevoCircuito = swap(solucion.circuito, index, index + 1);
    let nuevoCosto = costoSwap(M, solucion.circuito, costo, index, index + 1);
    soluciones.push({ circuito: nuevoCircuito, costo: nuevoCosto });
  }
  return soluciones;
};

//Genera las soluciones vecinas y retorna la mejor
const encontrarMejorVecino = (M, solucion) => {
  let solucionesVecinas = generarSolucionesVecinas(M, solucion);
  return solucionesVecinas.reduce((prev, curr) =>
    prev.costo < curr.costo ? prev : curr
  );
};

//Genera los vecinos, elige el mejor y lo compara con la solucion actual...
// - Si el mejor vecino es de menor costo, lo elijo y hago recursion para intentar obtener otro mejor
// - Sino retorna la solucion actual
const busquedaLocal = (
  M,
  solucion,
  ejecucionesMaximas,
  porcentajeMinimoDeMejora
) => {
  let mejorSolucion = solucion;
  let ejecuciones = 0;
  let continuar = true;

  while (continuar) {
    ejecuciones++;

    let mejorSolucionVecina = encontrarMejorVecino(M, mejorSolucion);

    if (mejorSolucionVecina.costo < solucion.costo)
      mejorSolucion = mejorSolucionVecina;

    const porcentajeDeMejora =
      100 - (mejorSolucionVecina.costo * 100) / solucion.costo;

    continuar =
      ejecuciones < ejecucionesMaximas &&
      porcentajeDeMejora > 0 &&
      porcentajeDeMejora > porcentajeMinimoDeMejora;
  }

  return mejorSolucion;
};

export default busquedaLocal;
