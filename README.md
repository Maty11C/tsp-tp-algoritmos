# **TP Algoritmos - Metaheurísticas**

1. Proponer un algoritmo goloso para el problema del viajante de comercio.
2. Aleatorizar el algoritmo anterior.
3. Proponer un algoritmo de búsqueda local para el problema del viajante de comercio.
4. Variar parámetros y la estrategia del algoritmo de búsqueda local que optimicen el funcionamiento del mismo.
5. Construir un algoritmo GRASP para el problema del viajante de comercio. La entrada de su algoritmo será un
   archivo con una instancia del problema del viajante de comercio (ej: matriz de distancias), y la salida deberá ser
   un archivo de texto plano con un circuito hamiltoniano y su valor.
6. Presentar un gráfico de scoring contra la cantidad de iteraciones para baterías de distintas instancias, que permita
   decidir una cantidad de iteraciones que ayude a encontrar un valor cercano al óptimo sin desperdiciar tiempo de
   cómputo.

---

## 1. Algoritmo greedy y heurística

Se propone un algoritmo greedy para el problema del viajante de comercio que obtiene un circuito representado como una sucesión ordenada de nodos con su respectivo costo.

El algoritmo recorre el grafo en base a una de las siguientes heurísticas:

- Nodo más cercano:
  desde el nodo inicial, se obtiene el nodo adyacente más cercano.
- Nodo más cercano de 2 niveles:
  desde el nodo inicial, se obtiene el camino de 2 niveles más cercano. Dicho de otra manera, se obtiene el nodo que denote el camino más cercano teniendo en cuenta la suma de los pesos de cada nivel.

## 2. Aleatorización

Se aleatoriza la selección del próximo nodo a visitar del algoritmo greedy de la siguiente forma:

1. Desde el nodo inicial se ordenan los nodos vecinos en base a la heurística elegida.
2. Se obtienen los primeros n elementos despues del ordenamiento, donde n representa un 5% de los vecinos. En caso de que el 5% de los elementos no resulte en más de una alternativa, se seleccionan los primeros 3 elementos.
3. Se selecciona un elemento al azar dentro del recorte obtenido.

## 3. Búsqueda local

Se propone una búsqueda local de la solución de la siguiente forma:

1. Dada una solución obtenida con el algoritmo greedy, se generan los vecinos de la solución con el operador de intercambio de consecutivos para todos los nodos intermedios (todos los nodos menos el primero y el último, dado que sino dejaría de ser un circuito).
2. Se selecciona al mejor vecino (solución con menor costo).
3. Se repite la búsqueda local hasta que ninguno de los vecinos de una solución reduzcan el costo de la solución obtenida hasta el momento.

## 4. Optimización de búsqueda local

Se agrega un porcentaje mínimo de mejora aceptable como criterio al comparar soluciones.
Esto significa que en el caso de que el mejor vecino encontrado mejore la solución un porcentaje inferior al porcentaje mínimo de mejora, la nueva mejor solución pasará a ser la de menor costo pero no se va a continuar con una nueva iteración de búsqueda local, ya que se considera que la mejora encontrada fue mínima, por lo que no tendría sentido seguir computando.

## 5. Algoritmo GRASP

Dado un número de ejecuciones máximas permitidas, un porcentaje de mejora mínimo y una cantidad de reintentos máxima, se propone un algoritmo GRASP que intenta obtener la solución óptima del el problema del viajante de comercio en el que en cada iteración opera de la siguiente forma:

1. Obtiene una solución "semilla" mediante el algoritmo greedy propuesto.
2. Obtiene una nueva solución mediante el algoritmo de búsqueda local en base a la solución "semilla".
3. Compara las dos soluciones y elige la de menor costo.

El algoritmo repetirá la misma secuencia hasta que se presente alguno de los siguientes escenarios:

- Se hayan alcanzado las ejecuciones máximas permitidas.
- Se haya alcanzado la cantidad de reintentos máxima permitida. Esto significa que si el porcentaje de mejora de la nueva solución encontrada es negativo, nulo o mínimo, el algoritmo va a reintentar obtener una nueva solución con una mejora aceptable tantas veces como cantidad de reintentos se hayan definido. Entiendase como mejora mínima a la mejora que no supera el porcentaje de mejora mínimo definido.

Una vez finalizadas las iteraciones, se retorna la última mejor solución encontrada.

## 6. Reportes

La idea fue obtener un aproximado a la cantidad de iteraciones que se necesitan de GRASP para obtener la solución óptima o lo más cercana a la óptima para cada uno de los grafos de la siguiente manera:

1. Se ejecuta GRASP en para el grafo con un setup definido de 50000 ejecuciones máximas, 5000 reintentos y mejora mínima aceptable de 3%.
2. Se obtiene la última iteración en la que el algoritmo detecta una mejora aceptable mediante impresiones en consola y de exportación de gráfico de reporte en formato .png.
3. Se registra el número de iteración reportado para el grafo.
4. Se repiten los pasos anteriores una cantidad de veces suficiente para obtener una cantidad de iteraciones lógicas y medibles para el grafo.
5. Una vez registrados todos los valores de las distintas ejecuciones, se selecciona al máximo de todos ellos.

Se adjuntan, a modo de ejemplo, los [gráficos de scoring](/src/graficos/Graficos.md) de alguna de las ejecuciones de GRASP para cada uno de los grafos, en donde resulta evidente el instante (número de iteración) en que la solución no mejora.

Una vez realizados los reportes y obtenidas las cantidades finales para cada grafo, se generó el gráfico de scoring que determina la cantidad de iteraciones necesarias (eje Y) sobre cada grafo (eje X) que permite aproximar la cantidad de ejecuciones necesarias para encontrar un valor cercano al óptimo sin desperdiciar tiempo de cómputo.

![Gráfico de scoring](/src/graficos/scoring.png)

### Conclusiones

- El algoritmo GRASP se apróxima a la solución óptima demasiado rápido, es decir, en las primeras iteraciones. En las siguientes iteraciones el porcentaje de mejora pasa a ser muy bajo, nulo y mayormente negativo (peores soluciones).

- El gráfico denota una tendencia a que a mayor cantidad de nodos en un grafo, mayor será la cantidad de iteraciones para encontrar una solución óptima o cercana a la misma sin desperdiciar tiempo de cómputo, a pesar de haber altibajos y cierta aleatoriedad. Es importante aclarar que este comportamiento se refleja solamente en los grafos chicos; llámese chicos a los grafos que constan de hasta aproximadamente 70 nodos. A partir de grafos más grandes el comportamiento y los resultados son distintos.

- Para los grafos más grandes, por el contrario al punto anterior, a mayor cantidad de nodos en un grafo, menor será la cantidad de iteraciones necesarias. De las pruebas en los grafos más grandes deduje que la poca cantidad de iteraciones necesarias se debía a que los costos de las soluciones obtenidas distaban mucho más de la solución óptima, es decir que las soluciones eran cada vez peores. Si bien los resultados del gráfico de scoring denotan mucha disparidad entre grafos de cantidad de nodos similares, se evidencia una ligera tendencia a necesitar cada vez menos iteraciones en cuanto la cantidad de nodos del grafo incrementa.

- Como consecuencia de la conclusión del punto anterior, noté que mi porcentaje mínimo de mejora aceptable (3%) fue muy ambicioso, debería haber hecho las pruebas con un porcentaje menor probablemente entre 0 y 1. Esto creo que fue, entre otros motivos, lo que no me permitía encontrar soluciones más cercanas a la óptima ya que despreciaba mejoras mínimas que debería haber considerado como aceptables para que el algoritmo funcione mejor.

- Además, la decisión de definir un porcentaje de mejora muy alto, llevó al algoritmo a no reiniciar el contador de reintentos cuando se encontraba con una mejora despreciable y por ende el tiempo de ejecución del algoritmo no se extendía lo suficiente como para poder encontrar otra posible mejora. Este recorte en el tiempo de ejecución entiendo que fue la principal causa de no encontrar un número de iteraciones máximas superior; dicho de otro modo, si la cantidad de reintentos se reiniciara con más frecuencia, sería más probable encontrar un número de iteración máxima superior.

---

### Instructivo para ejecutar GRASP

1. Instalar dependencias:

   > npm install

2. Indicar la cantidad de nodos del grafo en el archivo _index.js_. Por ejemplo:

   > const G = obtenerGrafo("./resources/tests/", GRAFOS_XML.\_198_NODOS);

3. Determinar los parámetros de GRASP. Por ejemplo:

   > const { solucion, grafico } = grasp(G, 50000, 5000, 3);

   50000 ejecuciones máximas, 5000 reintentos y 3% de porcentaje de mejora mínima.

4. Ejecutar GRASP y exportar gráfico de scoring:
   > npm start
