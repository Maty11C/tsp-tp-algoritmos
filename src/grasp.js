import tspGreedy from "./tspGreedy.js";
import busquedaLocal from "./busquedaLocal.js";

/**
 * Indica si la nueva solución no mejora
 * @param  {Int} porcentajeDeMejora
 * @param  {int} porcentajeMinimoDeMejora
 * @return  {Boolean}
 */
const noMejora = (nuevaSolucion, solucion) =>
  nuevaSolucion.costo >= solucion.costo;

/**
 * Indica si la nueva solución es aceptable
 * @param  {Int} porcentajeDeMejora
 * @param  {int} porcentajeMinimoDeMejora
 * @return  {Boolean}
 */
const mejoraPoco = (porcentajeDeMejora, porcentajeMinimoDeMejora) =>
  porcentajeDeMejora < porcentajeMinimoDeMejora;

/**
 * GRASP
 * @param  {clase Grafo} grafo
 * @param  {Int} ejecucionesPermitidas
 * @param  {Int} ejecucionesParcialesPermitidas
 * @param  {Int} porcentajeMinimoDeMejora
 * @return  {Solución: {circuito: [Int] - costo: Int}}
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

  while (
    ejecuciones < ejecucionesPermitidas &&
    ejecucionesParciales < ejecucionesParcialesPermitidas
  ) {
    ejecuciones++;

    const solucionGreedy = tspGreedy(G);
    const mejorSolucionBusquedaLocal = busquedaLocal(G, solucionGreedy, 50, 10);

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
