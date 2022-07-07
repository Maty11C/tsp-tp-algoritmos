import tspGreedy from "./tspGreedy.js";
import busquedaLocal from "./busquedaLocal.js";

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

/**
 * GRASP
 * @param  {Grafo} G
 * @param  {Int} ejecucionesPermitidas
 * @param  {Int} ejecucionesParcialesPermitidas
 * @param  {Int} porcentajeMinimoDeMejora
 * @return  {Solución: {circuito: [Int] - costo: Int}}
 * @ordenDeComplejidad O(z) * O(n^3) * O(z' x n^2)
 * @ordenDeComplejidad O(z x z' x n^3), donde z es la cantidad de ejecuciones permitidas para grasp, z' es la cantidad de ejecuciones permitidas para búsqueda local y n es la cantidad de nodos
 */
const grasp = (
  G,
  ejecucionesPermitidas,
  ejecucionesParcialesPermitidas,
  porcentajeMinimoDeMejora
) => {
  let ejecuciones = 0;
  let ejecucionesParciales = 0;

  let mejorSolucion = {
    circuito: [],
    costo: Infinity,
  };

  // O(z), donde z es la cantidad de ejecuciones permitidas. Se supone a la cantidad de ejecuciones mayor a la cantidad de ejecuciones parciales
  while (
    ejecuciones < ejecucionesPermitidas &&
    ejecucionesParciales < ejecucionesParcialesPermitidas
  ) {
    ejecuciones++;

    const solucionGreedy = tspGreedy(G); // O(n^3)
    const mejorSolucionBusquedaLocal = busquedaLocal(G, solucionGreedy, 50, 10); //**** O(z' x n^2), donde z' es la cantidad de ejecuciones permitidas y n es la cantidad de nodos

    const porcentajeDeMejora =
      100 - (mejorSolucionBusquedaLocal.costo * 100) / mejorSolucion.costo;

    if (
      noMejora(mejorSolucionBusquedaLocal, mejorSolucion) ||
      mejoraPoco(porcentajeDeMejora, porcentajeMinimoDeMejora)
    ) {
      ejecucionesParciales++;
    } else {
      ejecucionesParciales = 0;
    }

    if (mejorSolucionBusquedaLocal.costo < mejorSolucion.costo)
      mejorSolucion = mejorSolucionBusquedaLocal;

    console.log(
      `Ejecuciones: ${ejecuciones} - Ejecuciones parciales: ${ejecucionesParciales} - Costo: ${mejorSolucion.costo} - Porcentaje de mejora: ${porcentajeDeMejora}`
    );
  }

  return mejorSolucion;
};

export default grasp;
