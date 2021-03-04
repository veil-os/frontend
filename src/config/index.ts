const isDevelopment = process.env.NODE_ENV === "development";
const generateConfig = () => ({
  endpoint: isDevelopment ? "http://localhost:3000" : "https://api.veilos.io",
  defaults: {
    DEFAULT_EXTERNAL_NULLIFIER: "FOOD_DISTRIBUTION_10022021",
    DEFAULT_IDENTITY_GROUP: "ae883204-758d-412f-b73d-5639401bd8c8",
    DEFAULT_MESSAGE: "TEST",
  },
  semaphore: {
    treeDepth: 10,
    provingKeyLocation: true
      ? "http://localhost:9000/circuit/proving_key.bin"
      : "https://public.veilos.io/circuit/proving_key.bin",
    circuitLocation: true
      ? "http://localhost:9000/circuit/circuit.json"
      : "https://public.veilos.io/circuit/circuit.json",
  },
});

export const config = generateConfig();
