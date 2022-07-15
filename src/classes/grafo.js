import floyd from "../utils/floyd.js";

export class Grafo {
  constructor(nombre, M) {
    this.nombre = nombre;
    this.matriz = floyd(M); //Matriz completa
    //TODO: Generar lista de adyacencias para poder obtener los adyacentes de un nodo en 0(1)
    this.nodos = Array.from(Array(M.length).keys());
    this.n = M.length;
    this.m = (this.n * (this.n - 1)) / 2;
  }

  primerNodo = () => this.nodos[0];

  cualquierNodo = () =>
    this.nodos[Math.floor(Math.random() * this.nodos.length)];

  nodoInicial() {
    // return this.primerNodo()
    return this.cualquierNodo();
  }
}
