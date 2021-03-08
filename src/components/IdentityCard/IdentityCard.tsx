import { Identity } from "libsemaphore";
import React, { FunctionComponent, useEffect, useState } from "react";

import { IdentityState } from "../../types";
import { AppStateBackup, Backup } from "./States/Backup";
import { AppStateImport, Import } from "./States/Import";
import { AppStateInitialized, Initialized } from "./States/Initialized";
import { AppStateLoading, Loading } from "./States/Loading";
import { AppStateSetup, Setup } from "./States/Setup";

type AppState = AppStateLoading | AppStateSetup | AppStateImport | AppStateInitialized | AppStateBackup;

export interface IdentityCardProps {
  identity: IdentityState;
  onResetIdentity: () => void;
  onSetIdentity: (id: Identity) => void;
}

export const IdentityCard: FunctionComponent<IdentityCardProps> = ({ identity, onResetIdentity, onSetIdentity }) => {
  const [identityCardState, setIdentityCardState] = useState<AppState>({ state: "LOADING" });

  const showImportIdentity = () =>
    setIdentityCardState({
      state: "IMPORT",
    });
  const showSetupIdentity = () => {
    setIdentityCardState({
      state: "SETUP_IDENTITY",
    });
  };
  const showBackupIdentity = () => {
    if (identity.state !== "INITIALIZED") throw new Error("Cannot backup identity that has not been initialized");
    setIdentityCardState({
      state: "BACKUP",
      identity: identity.identity,
      identityCommitment: identity.identityCommitment,
    });
  };
  const showIdentity = () => {
    if (identity.state !== "INITIALIZED") throw new Error("Cannot backup identity that has not been initialized");
    setIdentityCardState({
      state: "INITIALIZED",
      identity: identity.identity,
      identityCommitment: identity.identityCommitment,
    });
  };

  useEffect(() => {
    switch (identity.state) {
      case "INITIALIZED":
        setIdentityCardState({
          state: "INITIALIZED",
          identity: identity.identity,
          identityCommitment: identity.identityCommitment,
        });
        break;
      case "UNINITIALIZED":
        setIdentityCardState({
          state: "SETUP_IDENTITY",
        });
        break;
      case "INITIALIZING":
      default:
        setIdentityCardState({ state: "LOADING" });
    }
  }, [identity, onResetIdentity, onSetIdentity]);

  const getContent = () => {
    switch (identityCardState.state) {
      case "INITIALIZED":
        return (
          <Initialized
            state={identityCardState}
            onResetIdentity={onResetIdentity}
            showBackupIdentity={showBackupIdentity}
          />
        );
      case "SETUP_IDENTITY":
        return (
          <Setup state={identityCardState} showImportIdentity={showImportIdentity} onSetIdentity={onSetIdentity} />
        );
      case "IMPORT":
        return <Import state={identityCardState} showSetupIdentity={showSetupIdentity} onSetIdentity={onSetIdentity} />;
      case "BACKUP":
        return <Backup state={identityCardState} showIdentity={showIdentity} />;
      case "LOADING":
      default:
        return <Loading state={identityCardState} />;
    }
  };
  return (
    <div className="flex justify-center">
      <div className="max-w-xl flex-1 bg-white p-3 rounded-md">{getContent()}</div>
    </div>
  );
};
