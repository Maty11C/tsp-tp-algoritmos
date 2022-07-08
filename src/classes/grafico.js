import { exportarGrafico } from "../utils/exporter.js";

export class Grafico {
  constructor(nombre, valuesX, valuesY) {
    this.nombre = nombre.substring(0, nombre.indexOf("."));
    this.valuesX = valuesX;
    this.valuesY = valuesY;
  }

  exportar = async () =>
    exportarGrafico(this.nombre, this.valuesX, this.valuesY);
}
