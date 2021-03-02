const generateConfig = () => ({
  endpoint: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://api.veilos.io",
  defaults: {
    DEFAULT_EXTERNAL_NULLIFIER: "FOOD_DISTRIBUTION_10022021",
    DEFAULT_IDENTITY_GROUP: "ab3f23f0-d82a-478a-8903-625ade1c8bd5",
    DEFAULT_MESSAGE: "TEST",
  },
  semaphore: {
    treeDepth: 10,
    provingKeyLocation:
      process.env.NODE_ENV === "development"
        ? `${window.location.origin}/circuit/proving_key.bin`
        : "https://public.veilos.io/proving_key.bin",
  },
});

export const config = generateConfig();
