const statsAndValidate = (result) => {
  const unique = [...new Set(result.map((link) => link.href))];
  const statsValidated = {
    total: result.length,
    unique: unique.length,
    broken: result.filter((link) => link.status !== 200).length,
  };
  return statsValidated;
};

const statsFunction = (result) => {
  const unique = [...new Set(result.map((link) => link.href))];
  const statsNumbers = {
    total: result.length,
    unique: unique.length,
  };
  return statsNumbers;
};

export { statsFunction, statsAndValidate };