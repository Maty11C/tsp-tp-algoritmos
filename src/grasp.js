import tspGreedy from "./tspGreedy.js";
import busquedaLocal from "./busquedaLocal.js";

const grasp = (grafo, ejecucionesMaximas, porcentajeMinimoDeMejora) => {
  let mejorSolucion = tspGreedy(grafo);
  let ejecuciones = 0;
  let continuar = true;

  while (continuar) {
      ejecuciones++;

    //Aplico el algoritmo greedy a la matriz completa para obtener una primera solucion
    const solucionGreedy = tspGreedy(grafo);
    console.log("Solución de greedy: ", solucionGreedy);

    //Aplico busqueda local para encontrar una mejor solución
    const mejorSolucionBusquedaLocal = busquedaLocal(grafo.grafoCompleto, solucionGreedy, 50, 10);
    console.log("Mejor solución de búsqueda local: ", mejorSolucionBusquedaLocal);

    if (mejorSolucionBusquedaLocal.costo < mejorSolucion.costo)
      mejorSolucion = mejorSolucionBusquedaLocal;

    const porcentajeDeMejora =
      100 - ((mejorSolucionBusquedaLocal.costo * 100) / mejorSolucion.costo);

    // continuar =
    //   ejecuciones < ejecucionesMaximas &&
    //   porcentajeDeMejora > 0 &&
    //   porcentajeDeMejora > porcentajeMinimoDeMejora;
      continuar =
      ejecuciones < ejecucionesMaximas

      //TODO: No comparar con la ultima ejecución y comparar con las ultimas 10 por ejemplo
  }
};

export default grasp;
