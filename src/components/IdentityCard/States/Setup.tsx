import { Identity, genIdentity } from "libsemaphore";
import React, { FunctionComponent } from "react";
import { ButtonLg } from "../../Button";

export interface AppStateSetup {
  state: "SETUP_IDENTITY";
}

interface SetupProps {
  state: AppStateSetup;
  onSetIdentity: (_id: Identity) => void;
  showImportIdentity: () => void;
}

const ICON_SIZE = 256;

export const Setup: FunctionComponent<SetupProps> = ({ showImportIdentity, onSetIdentity }) => {
  const generateIdentity = () => {
    const nextIdentity = genIdentity();
    onSetIdentity(nextIdentity);
  };

  return (
    <div>
      <div className="mt-2 mb-4 text-center text-2xl">Setup Your Identity</div>
      <div className="my-2 text-center text-sm text-gray-600">
        <p>An identity is needed to interact with VeilApp.</p>
        <p>You may either generate a new identity or import existing ones.</p>
      </div>
      <div className="px-4 py-5 sm:p-6 flex place-content-center text-gray-800">
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
      <div className="text-center px-4 py-3">
        <ButtonLg onClick={generateIdentity}>Generate New Identity</ButtonLg>
      </div>
      <div className="text-center px-4 py-3">
        <ButtonLg onClick={showImportIdentity}>Import Existing Identity</ButtonLg>
      </div>
    </div>
  );
};
