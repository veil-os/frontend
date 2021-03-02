import React from "react";

import { useIdentityContext } from "../../common/context/IdentityContext";
import { IdentityCard } from "../IdentityCard";

export const IdentityContainer: React.FunctionComponent = () => {
  const { identity, setIdentity } = useIdentityContext();

  const resetIdentity = () => {
    setIdentity(undefined);
  };

  return <IdentityCard onResetIdentity={resetIdentity} onSetIdentity={setIdentity} identity={identity} />;
};
