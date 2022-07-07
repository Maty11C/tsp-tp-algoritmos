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
1. Dada una solución obtenida con el algoritmo greedy, se generan los vecinos de la solución con el operador de intercambio de consecutivos para todos los nodos intermedios (todos los nodos menos el primero y el último, dado que sino dejaría de ser un circuito).
2. Se selecciona al mejor vecino (solución con menor costo).
3. Se repite la búsqueda local hasta que ninguno de los vecinos de una solución reduzcan el costo de la solución obtenida hasta el momento.

## 4. Optimización de búsqueda local

Se contempla un margen de error en la búsqueda local agregando un porcentaje de mejora mínimo y una cantidad de reintentos máxima. Esto significa que en el caso de que en cierta iteración la solución no mejore (que su porcentaje de mejora no supere al porcentaje de mejora mínimo impuesto), el algoritmo de búsqueda local ya no va a retornar la mejor solución obtenida hasta el momento sino que va a continuar intentando obtener una mejor solución tantas veces como cantidad de reintentos máxima se haya definido.

Agregar el margen de error lo que consigue es darle la posibilidad de seguir intentando obtener una mejor solución, que dado que el algoritmo tiene una cuota de aleatoriedad, es probable que luego de ciertos intentos lo consiga.

## 5. Algoritmo GRASP

Dado un número de ejecuciones máximas permitidas, un porcentaje de mejora mínimo y una cantidad de reintentos máxima, se propone un algoritmo GRASP de la siguiente forma:
1. Obtiene una solución mediante el algoritmo greedy.
2. Obtiene una solución mejor con búsqueda local a partir de la solución obtenida por el algoritmo greedy.
3. Si la solución obtenida con búsqueda local tiene menor costo que la mejor solución conocida hasta el momento, la solución de la búsqueda local reemplaza a la mejor solución conocida y se continúa con una nueva iteración en caso de no haberse superado el número de ejecuciones máximas.
Además, al igual que en búsqueda local, si el porcentaje de mejora no es significativo (el porcentaje de mejora con la última mejor solución encontrada es menor al porcentaje de mejora mínimo impuesto), se va a continuar intentando obtener una solución con un porcentaje de mejora significativo hasta como máximo una cantidad de reintentos determinada, en caso contrario se procede con la siguiente iteración normalmente.

## 6. Reportes

Gráficos...

### Conclusiones

- GRASP encuentra una solución cercana a la óptima en las primeras iteraciones. En las siguientes iteraciones el porcentaje de mejora pasa a ser muy bajo, nulo y mayormente negativo (peores soluciones).
- ... 

## Aplicación

...

### Instructivo

1. Instalar dependencias:
   >npm install
2. Iniciar aplicación:
   >npm start

---