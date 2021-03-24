import React, { createContext, useContext } from "react";
import createPersistedState from "use-persisted-state";
import { IdentityGroupManagers, IdentityGroupManager } from "../../../types";

const usePersistedIdentityState = createPersistedState("identityGroupManagement");

interface IdentityGroupManagementContext {
  managers: IdentityGroupManagers;
  setManager: (identityGroupId: string, state: IdentityGroupManager) => void;
}

export const IdentityGroupManagementContext = createContext<IdentityGroupManagementContext>({
  managers: {},
  setManager: () => {},
});

export const IdentityGroupManagementContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [storedManagers, setStoredManagers] = usePersistedIdentityState<IdentityGroupManagers>();

  const managers = storedManagers || {};

  const setManager = (identityGroupId: string, state: IdentityGroupManager) => {
    setStoredManagers({
      ...managers,
      [identityGroupId]: state,
    });
  };

  return (
    <IdentityGroupManagementContext.Provider value={{ managers, setManager }}>
      {children}
    </IdentityGroupManagementContext.Provider>
  );
};

export const useIdentityGroupManagementContext = (): IdentityGroupManagementContext =>
  useContext<IdentityGroupManagementContext>(IdentityGroupManagementContext);
