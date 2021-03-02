import { Identity, unSerialiseIdentity, genIdentity } from "libsemaphore";
import QRCode from "qrcode.react";
import React, { FunctionComponent, useState } from "react";
import { IdentityState } from "../../types";
import { ButtonLg } from "../Button";

export interface IdentityCardProps {
  onResetIdentity: () => void;
  onSetIdentity: (_id: Identity) => void;
  identity: IdentityState;
}

const ICON_SIZE = 256;

export const IdentityCardInitializing: FunctionComponent<IdentityCardProps> = ({ identity }) => {
  if (identity.state !== "INITIALIZING") throw new Error("Not initializing");
  return (
    <div className="bg-gray-50 overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:p-6 text-center text-2xl">Identity Card</div>
      <div className="px-4 py-5 sm:p-6 flex place-content-center animate-spin">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ width: ICON_SIZE }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>
    </div>
  );
};

export const IdentityCardInitialized: FunctionComponent<IdentityCardProps> = ({ identity, onResetIdentity }) => {
  if (identity.state !== "INITIALIZED") throw new Error("Uninitialized Identity");
  return (
    <div className="bg-gray-50 overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:p-6 text-center text-2xl">Identity Card</div>
      <div className="px-4 py-5 sm:p-6 flex place-content-center">
        <QRCode value={identity.identityCommitment} renderAs="svg" size={ICON_SIZE} />
      </div>
      <div className="text-center px-4 py-5">
        <ButtonLg onClick={onResetIdentity}>Delete Identity</ButtonLg>
      </div>
    </div>
  );
};

export const IdentityCardUninitialized: FunctionComponent<IdentityCardProps> = ({ identity, onSetIdentity }) => {
  if (identity.state !== "UNINITIALIZED") throw new Error("Initialized Identity");

  const [isImportShown, setIsImportShown] = useState(false);
  const [serializedIdentity, setSerializedIdentity] = useState("");

  const toggleIsImportShown = () => setIsImportShown(!isImportShown);
  const importSerializedIdentity = () => {
    try {
      const nextIdentity = unSerialiseIdentity(serializedIdentity);
      onSetIdentity(nextIdentity);
    } catch (e) {
      alert(e);
    }
  };
  const generateIdentity = () => {
    const nextIdentity = genIdentity();
    onSetIdentity(nextIdentity);
  };

  return isImportShown ? (
    <div className="bg-gray-50 overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:p-6 text-center text-2xl">Import Identity</div>
      <div className="px-6">
        <label htmlFor="serialized-identity" className="block text-sm font-medium text-gray-700">
          Serialized Identity
        </label>
        <div className="mt-1">
          <input
            onChange={(e) => setSerializedIdentity(e.target.value)}
            value={serializedIdentity}
            type="text"
            name="serialized-identity"
            id="serialized-identity"
            className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="text-center px-4 py-5">
        <ButtonLg onClick={importSerializedIdentity}>Import Identity</ButtonLg>
      </div>
      <div className="text-center px-4 py-5">
        <ButtonLg onClick={toggleIsImportShown}>Back</ButtonLg>
      </div>
    </div>
  ) : (
    <div className="bg-gray-50 overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:p-6 text-center text-2xl">Identity Card</div>
      <div className="px-4 py-5 sm:p-6 flex place-content-center" onClick={generateIdentity}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ width: ICON_SIZE }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
          />
        </svg>
      </div>
      <div className="text-center px-4 py-5">
        <ButtonLg onClick={generateIdentity}>Generate New Identity</ButtonLg>
      </div>
      <div className="text-center px-4 py-5">
        <ButtonLg onClick={toggleIsImportShown}>Import Existing Identity</ButtonLg>
      </div>
    </div>
  );
};

export const IdentityCard: FunctionComponent<IdentityCardProps> = ({ ...props }) => {
  const { identity } = props;
  switch (identity.state) {
    case "INITIALIZING":
      return <IdentityCardInitializing {...props} />;
    case "INITIALIZED":
      return <IdentityCardInitialized {...props} />;
    case "UNINITIALIZED":
    default:
      return <IdentityCardUninitialized {...props} />;
  }
};
