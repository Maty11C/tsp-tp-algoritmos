import tspGreedy from "./tspGreedy.js";
import busquedaLocal from "./busquedaLocal.js";
import { Grafico } from "./classes/grafico.js";

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
 * @ordenDeComplejidad O(z) * (O(n^3) + O(z' x n^2))
 * z = cantidad de ejecuciones permitidas para grasp
 * z' = cantidad de ejecuciones permitidas de búsqueda local
 * n = cantidad de nodos
 */
const grasp = (
  G,
  ejecucionesPermitidas,
  ejecucionesParcialesPermitidas,
  porcentajeMinimoDeMejora
) => {
  let ejecuciones = 0;
  let ejecucionesParciales = 0;

  let iteraciones = [];
  let costos = [];
  let ejecucionDeMejoraConsiderable = 0;

  let mejorSolucion = {
    circuito: [],
    costo: Infinity,
  };

  iteraciones.push(ejecuciones);
  costos.push(mejorSolucion.costo);

  // O(z), donde z es la cantidad de ejecuciones permitidas. Se supone a la cantidad de ejecuciones mayor a la cantidad de ejecuciones parciales
  while (
    ejecuciones < ejecucionesPermitidas &&
    ejecucionesParciales < ejecucionesParcialesPermitidas
  ) {
    ejecuciones++;

    const solucionGreedy = tspGreedy(G); // O(n^3)
    const mejorSolucionBusquedaLocal = busquedaLocal(
      G,
      solucionGreedy,
      1000,
      25,
      5
    ); // O(z' x n^2), donde z' es la cantidad de ejecuciones permitidas y n es la cantidad de nodos

    const porcentajeDeMejora =
      100 - (mejorSolucionBusquedaLocal.costo * 100) / mejorSolucion.costo;

    if (
      noMejora(mejorSolucionBusquedaLocal, mejorSolucion) ||
      mejoraPoco(porcentajeDeMejora, porcentajeMinimoDeMejora)
    ) {
      ejecucionesParciales++;
    } else {
      ejecucionesParciales = 0;
      ejecucionDeMejoraConsiderable = ejecuciones;
    }

    if (mejorSolucionBusquedaLocal.costo < mejorSolucion.costo)
      mejorSolucion = mejorSolucionBusquedaLocal;

    if (ejecuciones % 5 === 0) {
      iteraciones.push(ejecuciones);
      costos.push(mejorSolucion.costo);
    }

    console.log(
      `Ejecuciones: ${ejecuciones} - Ejecuciones parciales: ${ejecucionesParciales} - Costo: ${mejorSolucion.costo.toFixed()} - Mejora: ${porcentajeDeMejora.toFixed()}% - Última ejecución de mejora considerable: ${ejecucionDeMejoraConsiderable}`
    );
  }

  //TODO: Escribir la solucion en un .txt

  return {
    solucion: mejorSolucion,
    grafico: new Grafico(
      G.nombre,
      { label: "Iteración", values: iteraciones },
      { label: "Costo", values: costos }
    ),
  };
};

export default grasp;
