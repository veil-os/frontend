export const isDevelopment = process.env.NODE_ENV === "development";

const generateConfig = () => ({
  endpoint: isDevelopment ? "http://localhost:3000" : "https://api.veilos.io",
  defaults: {
    DEFAULT_EXTERNAL_NULLIFIER: "DEMO_TOPIC",
    DEFAULT_IDENTITY_GROUP: "9436b3a9-e1c6-4214-8398-e5036c220995",
    DEFAULT_MESSAGE: "DEMO_MESSAGE",
  },
  semaphore: {
    treeDepth: 10,
    provingKeyLocation: isDevelopment
      ? "http://localhost:9000/circuit/proving_key.bin"
      : "https://public.veilos.io/circuit/proving_key.bin",
    circuitLocation: isDevelopment
      ? "http://localhost:9000/circuit/circuit.json"
      : "https://public.veilos.io/circuit/circuit.json",
  },
});

export const config = generateConfig();
