import { Identity, unSerialiseIdentity, serialiseIdentity, genIdentityCommitment } from "libsemaphore";
import React, { createContext, useContext, useEffect, useState } from "react";
import createPersistedState from "use-persisted-state";
import { IdentityState } from "../../../types";

const usePersistedIdentityState = createPersistedState("identity");

interface IdentityContext {
  identity: IdentityState;
  identityString?: string;
  setIdentity: (_identity?: Identity) => void;
}

export const IdentityContext = createContext<IdentityContext>({
  identity: {
    state: "UNINITIALIZED",
  },
  identityString: undefined,
  setIdentity: () => {},
});

export const IdentityContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [identityString, setIdentityString] = usePersistedIdentityState<string>();
  const [identity, setIdentityInternally] = useState<IdentityState>({
    state: "INITIALIZING",
  });

  // Updates identity whenever identityString updates
  useEffect(() => {
    if (identityString) {
      const nextIdentity = unSerialiseIdentity(identityString);
      const identityCommitment = genIdentityCommitment(nextIdentity);
      setIdentityInternally({
        state: "INITIALIZED",
        identity: nextIdentity,
        identityCommitment: identityCommitment.toString(),
      });
    } else {
      setIdentityInternally({
        state: "UNINITIALIZED",
      });
    }
  }, [identityString]);

  const setIdentity = (nextIdentity?: Identity) => {
    if (nextIdentity) {
      setIdentityString(serialiseIdentity(nextIdentity));
    } else {
      setIdentityString("");
    }
  };

  return (
    <IdentityContext.Provider value={{ identity, identityString, setIdentity }}>{children}</IdentityContext.Provider>
  );
};

export const useIdentityContext = (): IdentityContext => useContext<IdentityContext>(IdentityContext);
