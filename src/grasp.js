import tspGreedy from "./tspGreedy.js";
import busquedaLocal from "./busquedaLocal.js";

const noMejora = (nuevaSolucion, solucion) =>
  nuevaSolucion.costo >= solucion.costo;

const mejoraPoco = (porcentajeDeMejora, porcentajeMinimoDeMejora) =>
  porcentajeDeMejora < porcentajeMinimoDeMejora;

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
