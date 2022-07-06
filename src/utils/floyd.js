const floyd = (M) => {
  const n = M.length;
  let result = [...M];

  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        result[i][j] = Math.min(result[i][k] + result[k][j], result[i][j]);

  return result;
};

export default floyd;
