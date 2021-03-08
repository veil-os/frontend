import { Identity, serialiseIdentity } from "libsemaphore";
import React, { FunctionComponent } from "react";
import { ButtonLg } from "../../Button";

export interface AppStateBackup {
  state: "BACKUP";
  identity: Identity;
  identityCommitment: string;
}

interface BackupProps {
  state: AppStateBackup;
  showIdentity: () => void;
}

export const Backup: FunctionComponent<BackupProps> = ({ state, showIdentity }) => {
  return (
    <div>
      <div className="px-4 py-3 text-center text-sm text-white bg-red-600 rounded-md">
        <p className="text-lg py-3">Warning</p>
        <p>Below contains a backup of your identity.</p>
        <p>Anyone with the information below can act on your behalf.</p>
        <p>Do not share this with anyone else!</p>
      </div>
      <div className="my-5 text-center text-xl">Identity Backup</div>
      <div className="px-4 my-5 flex justify-center">
        <div className="max-w-xs" style={{ wordWrap: "break-word" }}>
          {serialiseIdentity(state.identity)}
        </div>
      </div>
      <div className="text-center px-4 py-5">
        <ButtonLg onClick={showIdentity}>Back</ButtonLg>
      </div>
    </div>
  );
};
