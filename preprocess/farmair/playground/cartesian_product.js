const experiments = [
  "D9EXPIZJE6BOI136",
  "DFO2PL11DZ83GPEQ",
  "P0MTZ3PJXDJ8EGEZ",
];
const layers = ["ai", "beta", "comb", "dsm", "no_pseu"];

const cartesianProduct = experiments.reduce((acc, exp) => {
  const product = layers.map((layer) => [exp, layer]);
  return acc.concat(product);
}, []);

console.log(cartesianProduct);
