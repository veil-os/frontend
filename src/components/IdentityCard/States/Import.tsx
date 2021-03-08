import { Identity, unSerialiseIdentity } from "libsemaphore";
import React, { FunctionComponent, useState } from "react";
import { ButtonLg } from "../../Button";

export interface AppStateImport {
  state: "IMPORT";
}

interface InportProps {
  state: AppStateImport;
  onSetIdentity: (_id: Identity) => void;
  showSetupIdentity: () => void;
}

export const Import: FunctionComponent<InportProps> = ({ onSetIdentity, showSetupIdentity }) => {
  const [serializedIdentity, setSerializedIdentity] = useState("");
  const importSerializedIdentity = () => {
    try {
      const nextIdentity = unSerialiseIdentity(serializedIdentity);
      onSetIdentity(nextIdentity);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <div className="px-4 py-5 sm:p-6 text-center text-2xl">Import Identity</div>
      <div className="px-4 pt-5 sm:p-6 text-center text-sm text-gray-600">
        <p>
          If you have previously generate an identity, you may import it below by pasting the{" "}
          <span className="text-indigo-800">Identity Backup</span> into the box below:
        </p>
      </div>
      <div className="px-6 py-6">
        <label htmlFor="serialized-identity" className="block text-sm font-medium text-gray-700">
          Identity Backup
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
      <div className="px-4 pb-5 sm:p-6 text-center text-sm text-gray-400">
        <p>*You should not import an identity that you did not generated yourself as your privacy may be compromised</p>
      </div>
      <div className="text-center px-6 py-3 flex justify-between">
        <ButtonLg onClick={showSetupIdentity}>Back</ButtonLg>
        <ButtonLg onClick={importSerializedIdentity}>Import</ButtonLg>
      </div>
    </div>
  );
};
