//Calcula el costo de recorrer todos los nodos
export const costo = (M, res) => {
  let sum = 0;
  let i = 0;
  while (i < res.length - 1) {
    let current = res[i];
    let next = res[i + 1];
    sum += M[current][next];
    i++;
  }
  return sum;
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
