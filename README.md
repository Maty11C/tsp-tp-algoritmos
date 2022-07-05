# TP Algoritmos - Metaheurísticas

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

-  Nodo más cercano:
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
1. Se generan los vecinos de la solución con el operador de intercambio de consecutivos para todos los nodos intermedios (todos los nodos menos el primero y el último, dado que sino dejaría de ser un circuito).
2. Se selecciona al mejor vecino (solución con menor costo).
3. Se repite la búsqueda local hasta que ninguno de los vecinos de una solución reduzcan el costo de la solución obtenida hasta el momento.

## 4. Optimización de búsqueda local

## 5. Algoritmo GRASP

## 6. Reportes