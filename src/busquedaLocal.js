/**
 * Retorna el circuito que resulta de intercambiar de posición los nodos i y j
 * @param  {[Int]} circuito
 * @param  {Int} i
 * @param  {Int} j
 * @return  {[Int]}
 * @ordenDeComplejidad O(n), donde n es la cantidad de nodos.
 *  No es O(1) porque existe una copia del array (O(n))
 */
const swap = (circuito, i, j) => {
  let nuevoCircuito = circuito.map((x) => x);
  var x = nuevoCircuito[j];
  nuevoCircuito[j] = nuevoCircuito[i];
  nuevoCircuito[i] = x;
  return nuevoCircuito;
};

/**
 * Calcula el costo del circuito con las posiciones de los nodos i y j intercambiadas
 * @param  {Matriz de adyacencias} M
 * @param  {[Int]} solucion
 * @param  {Int} costo
 * @param  {Int} i
 * @param  {Int} j
 * @return  {Int}
 * @ordenDeComplejidad O(1)
 */
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

/**
 * Genera y retorna soluciones vecinas intercambiando nodos consecutivos que no sean ni el primero ni el último
 * @param  {Matriz de adyacencias} M
 * @param  {[Int]} solucion
 * @return  {[Solución: {circuito: [Int] - costo: Int}]}
 * @ordenDeComplejidad O(n^2), donde n es la cantidad de nodos
 */
const generarSolucionesVecinas = (M, solucion) => {
  let { circuito, costo } = solucion;
  let soluciones = [];
  for (let index = 1; index < circuito.length - 2; index++) {
    // O(n-2)
    let nuevoCircuito = swap(solucion.circuito, index, index + 1); // O(n)
    let nuevoCosto = costoSwap(M, solucion.circuito, costo, index, index + 1); // O(1)
    soluciones.push({ circuito: nuevoCircuito, costo: nuevoCosto });
  }
  return soluciones;
};

//Genera las soluciones vecinas y retorna la mejor
/**
 * Genera soluciones vecinas intercambiando nodos consecutivos que no sean ni el primero ni el último y retorna la de mejor costo
 * @param  {Matriz de adyacencias} M
 * @param  {[Int]} solucion
 * @return  {Solución: {circuito: [Int] - costo: Int}}
 * @ordenDeComplejidad O(n^2), donde n es la cantidad de nodos
 */
const encontrarMejorVecino = (M, solucion) => {
  let solucionesVecinas = generarSolucionesVecinas(M, solucion); // O(n^2)
  return solucionesVecinas.reduce((prev, curr) =>
    prev.costo < curr.costo ? prev : curr
  );
};

/**
 * Indica si la nueva solución no mejora
 * @param  {Int} porcentajeDeMejora
 * @param  {int} porcentajeMinimoDeMejora
 * @return  {Boolean}
 * @ordenDeComplejidad O(1)
 */
const noMejora = (nuevaSolucion, solucion) =>
  nuevaSolucion.costo >= solucion.costo;

/**
 * Indica si la nueva solución es aceptable
 * @param  {Int} porcentajeDeMejora
 * @param  {int} porcentajeMinimoDeMejora
 * @return  {Boolean}
 * @ordenDeComplejidad O(1)
 */
const mejoraPoco = (porcentajeDeMejora, porcentajeMinimoDeMejora) =>
  porcentajeDeMejora < porcentajeMinimoDeMejora;

/** Búsqueda local
 * Genera los vecinos, elige el mejor y lo compara con la solucion actual...
    - Si el mejor vecino es de menor costo, lo elijo,
    - Si el mejor vecino tiene una mejora insignificante, vuelve a intentar y ejecuta otra busqueda local.
    - Si despues de determinados intentos más sigue sin conseguir un porcentaje de mejora aceptable, retorna la mejor solucion encontrada hasta el momento 
    - Despues de determinadas iteraciones, retorna la mejor solucion encontrada hasta el momento 
 * @param  {Grafo} G
 * @param  {Solución: {circuito: [Int] - costo: Int}} solucion
 * @param  {Int} ejecucionesPermitidas
 * @param  {Int} ejecucionesParcialesPermitidas
 * @param  {Int} porcentajeMinimoDeMejora
 * @return  {Solución: {circuito: [Int] - costo: Int}}
 * @ordenDeComplejidad O(z x n^2), donde z es la cantidad de ejecuciones permitidas y n es la cantidad de nodos
 */
const busquedaLocal = (
  G,
  solucion,
  ejecucionesPermitidas,
  ejecucionesParcialesPermitidas,
  porcentajeMinimoDeMejora
) => {
  let ejecuciones = 0;
  let ejecucionesParciales = 0;

  let mejorSolucion = solucion;

  // O(Z), donde Z es la cantidad de ejecuciones permitidas. Se supone a la cantidad de ejecuciones mayor a la cantidad de ejecuciones parciales
  while (
    ejecuciones < ejecucionesPermitidas &&
    ejecucionesParciales < ejecucionesParcialesPermitidas
  ) {
    ejecuciones++;
    ejecucionesParciales++;

    let mejorSolucionVecina = encontrarMejorVecino(G.matriz, mejorSolucion); // O(n^2), donde n es la cantidad de nodos

    const porcentajeDeMejora =
      100 - (mejorSolucionVecina.costo * 100) / mejorSolucion.costo;

    if (
      noMejora(mejorSolucionVecina, solucion) ||
      mejoraPoco(porcentajeDeMejora, porcentajeMinimoDeMejora)
    ) {
      ejecucionesParciales++;
    } else {
      ejecucionesParciales = 0;
    }

    if (mejorSolucionVecina.costo < solucion.costo)
      mejorSolucion = mejorSolucionVecina;
  }

  return mejorSolucion;
};

export default busquedaLocal;
