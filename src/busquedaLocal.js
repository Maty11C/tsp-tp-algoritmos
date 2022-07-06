const swap = (circuito, i, j) => {
  let nuevoCircuito = circuito.map((x) => x);
  var x = nuevoCircuito[j];
  nuevoCircuito[j] = nuevoCircuito[i];
  nuevoCircuito[i] = x;
  return nuevoCircuito;
};

//Calcula el costo de la solución con los nodos i y j intercambiados
export const costoSwap = (M, solucion, costo, i, j) => {
  let nuevoCosto = costo;

  let peso1Resta = M[solucion[i - 1]][solucion[i]];
  let peso2Resta = M[solucion[j]][solucion[j + 1]];
  nuevoCosto = nuevoCosto - peso1Resta - peso2Resta;

  let peso1Suma = M[solucion[i - 1]][solucion[j]];
  let peso2Suma = M[solucion[i]][solucion[j + 1]];
  nuevoCosto = nuevoCosto + peso1Suma + peso2Suma;

  return nuevoCosto;
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

    //TODO: No comparar con la ultima ejecución y comparar con las ultimas 10 por ejemplo
  }

  return mejorSolucion;
};

export default busquedaLocal;
