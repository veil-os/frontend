import React from "react";
import { Router } from "./Router";
import { CircuitContextProvider } from "./common/context/CircuitContext";
import { IdentityContextProvider } from "./common/context/IdentityContext";
import { IdentityGroupManagementContextProvider } from "./common/context/IdentityGroupManagementContext";

export const App: React.FunctionComponent = () => (
  <IdentityContextProvider>
    <IdentityGroupManagementContextProvider>
      <CircuitContextProvider>
        <Router />
      </CircuitContextProvider>
    </IdentityGroupManagementContextProvider>
  </IdentityContextProvider>
);
