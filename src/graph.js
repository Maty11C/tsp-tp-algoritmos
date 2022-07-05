import floyd from "./floyd.js";

export class Grafo {
  constructor(M) {
    this.grafo = M;
    this.grafoCompleto = floyd(M);
    this.nodos = Array.from(Array(M.length).keys());
    this.cantidadDeNodos = M.length;
    //TODO: Generar lista de adyacencias para poder obtener los adyacentes de un nodo en 0(1)
  }
}
