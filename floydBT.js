const floyd_BT = (M) => {
  const n = M.length;

  const distance = Array.from(new Array(n), () => new Array(n).fill(0));

  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) distance[i][j] = M[i][j];

  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        distance[i][j] = Math.min(
          distance[i][k] + distance[k][j],
          distance[i][j]
        );

  return distance;
};

export default floyd_BT;
