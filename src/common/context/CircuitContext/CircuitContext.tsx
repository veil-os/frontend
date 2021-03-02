import { genCircuit } from "libsemaphore";
import React, { createContext, useContext, useEffect, useState } from "react";
import useFetch from "use-http";

export type ContextState = "UNINITIALIZED" | "FETCHING" | "INITIALIZED" | "ERROR";

interface CircuitContext {
  provingKey?: any;
  circuit?: any;
  state: ContextState;
  initializeCircuit: () => void;
}

export const CircuitContext = createContext<CircuitContext>({
  provingKey: undefined,
  circuit: undefined,
  state: "UNINITIALIZED",
  initializeCircuit: () => {},
});

export const CircuitContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<ContextState>("UNINITIALIZED");
  const [provingKey, setProvingKey] = useState<any>();
  const [circuit, setCircuit] = useState<any>();
  const { get: getProvingKey, data: provingKeyData } = useFetch<any>(
    `${window.location.origin}/circuit/proving_key.bin`,
    { responseType: "arrayBuffer", persist: true }
  );
  const { get: getCircuit, data: circuitData } = useFetch(`${window.location.origin}/circuit/circuit.json`, {
    persist: true,
  });

  const initializeCircuit = () => {
    if (state === "UNINITIALIZED") {
      setState("FETCHING");
      getProvingKey();
      getCircuit();
    }
  };

  useEffect(() => {
    if (provingKey && circuit) setState("INITIALIZED");
  }, [provingKey, circuit]);

  useEffect(() => {
    const loadProvingKey = async () => {
      if (provingKeyData) {
        setProvingKey(new Uint8Array(provingKeyData));
      }
    };
    loadProvingKey();
  }, [provingKeyData]);

  useEffect(() => {
    if (circuitData) {
      setCircuit(genCircuit(circuitData));
    }
  }, [circuitData]);

  return (
    <CircuitContext.Provider value={{ provingKey, circuit, state, initializeCircuit }}>
      {children}
    </CircuitContext.Provider>
  );
};

export const useCircuitContext = (): CircuitContext => useContext<CircuitContext>(CircuitContext);
