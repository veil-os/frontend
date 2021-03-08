import { Identity } from "libsemaphore";
import QRCode from "qrcode.react";
import React, { FunctionComponent } from "react";
import Identicon from "react-jdenticon";
import { ButtonLg } from "../../Button";

export interface AppStateInitialized {
  state: "INITIALIZED";
  identity: Identity;
  identityCommitment: string;
}

interface InitializedProps {
  state: AppStateInitialized;
  onResetIdentity: () => void;
  showBackupIdentity: () => void;
}

const ICON_SIZE = 256;

export const Initialized: FunctionComponent<InitializedProps> = ({ state, onResetIdentity, showBackupIdentity }) => {
  return (
    <div>
      <div className="flex align-middle justify-center my-2">
        <Identicon size="80" value={state.identityCommitment} />
      </div>
      <div className="mt-2 text-center text-xl">Identity Card</div>
      <div className="px-4 pt-5 text-center text-sm text-gray-600">
        <p>Register yourself in any identity group with the information below.</p>
        <p>Information below can be shared with anyone and will not deanonymize you when interacting with VeilApps.</p>
      </div>
      <div className="px-4 py-5 flex justify-center">
        <QRCode value={state.identityCommitment} renderAs="svg" size={ICON_SIZE} />
      </div>
      <div className="px-4 py-5 flex justify-center">
        <div className="max-w-xs" style={{ wordWrap: "break-word" }}>
          {state.identityCommitment}
        </div>
      </div>
      <div className="text-center px-4 py-5">
        <ButtonLg onClick={showBackupIdentity}>Backup Identity</ButtonLg>
      </div>
      <div className="text-center px-4 py-5">
        <ButtonLg onClick={onResetIdentity}>Delete Identity</ButtonLg>
      </div>
    </div>
  );
};
