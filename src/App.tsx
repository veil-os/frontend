import React from "react";
import { Router } from "./Router";
import { CircuitContextProvider } from "./common/context/CircuitContext";
import { IdentityContextProvider } from "./common/context/IdentityContext";

export const App: React.FunctionComponent = () => (
  <IdentityContextProvider>
    <CircuitContextProvider>
      <Router />
    </CircuitContextProvider>
  </IdentityContextProvider>
);
