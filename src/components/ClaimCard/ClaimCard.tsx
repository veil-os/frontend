import { format } from "date-fns";
import { BigNumber, utils } from "ethers";
import { genWitness, genProof, genPublicSignals } from "libsemaphore";
import React, { FunctionComponent, useEffect, useState } from "react";
import Identicon from "react-jdenticon";
import QrReader from "react-qr-reader";
import { useLocation } from "react-router-dom";
import { useCircuitContext } from "../../common/context/CircuitContext";
import { useIdentityContext } from "../../common/context/IdentityContext";
import { snarkProofBigInt } from "../../common/utils/SnarkProof";
import { config } from "../../config";
import { getIdentityCommitments, submitClaim } from "../../services/backend";
import { AppMode, ClaimQR, ClaimWTimestamp } from "../../types";
import { ButtonLg } from "../Button";
interface AppCodeScannerProps {
  onAppCodeSubmission: (_claim: ClaimQR["payload"]) => void;
}

interface AppCodeScannerWithAutoLoadProps extends AppCodeScannerProps {
  autoLoadFromQuery: boolean;
  setAutoLoadFromQuery: (_autoLoad: boolean) => void;
}

export const AppCodeScanner: FunctionComponent<AppCodeScannerProps> = ({ onAppCodeSubmission }) => {
  const handleScan = (data: string | null) => {
    if (data) {
      try {
        const action: ClaimQR = JSON.parse(data);
        if (action.type !== "CLAIM") throw new Error("Wrong QR code type");
        if (!action.payload.externalNullifier) throw new Error("No external nullifier found");
        if (!action.payload.identityGroup) throw new Error("No identity group found");
        if (!action.payload.message) throw new Error("No message found");
        if (action.payload.type !== AppMode.VOUCHER) throw new Error("Only voucher mode supported");
        onAppCodeSubmission(action.payload);
      } catch (e) {
        alert(e);
      }
    }
  };
  const handleError = (err: Error) => alert(err);
  return (
    <div className="max-w-xl mb-6">
      <div className="w-full md:w-96 md:h-96 m-auto p-4">
        <QrReader delay={10} onError={handleError} onScan={handleScan} />
      </div>
      <div className="text-center">Scan the VeilApp QR code</div>
    </div>
  );
};

export const AppCodeManualEntry: FunctionComponent<AppCodeScannerWithAutoLoadProps> = ({
  onAppCodeSubmission,
  autoLoadFromQuery,
  setAutoLoadFromQuery,
}) => {
  const query = new URLSearchParams(useLocation().search).get("q");
  const [externalNullifier, setExternalNullifier] = useState("");
  const [identityGroup, setIdentityGroup] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState(AppMode.VOUCHER);
  useEffect(() => {
    if (query) {
      try {
        const { type, payload } = JSON.parse(query);
        if (type !== "CLAIM" || !payload) return;
        if (payload.externalNullifier) setExternalNullifier(payload.externalNullifier);
        if (payload.identityGroup) setIdentityGroup(payload.identityGroup);
        if (payload.message) setMessage(payload.message);
        if (payload.type) setType(payload.type);
        if (
          autoLoadFromQuery &&
          payload.externalNullifier &&
          payload.identityGroup &&
          payload.message &&
          payload.type
        ) {
          setAutoLoadFromQuery(false);
          onAppCodeSubmission({
            externalNullifier: payload.externalNullifier,
            identityGroup: payload.identityGroup,
            message: payload.message,
            type: payload.type,
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [query, onAppCodeSubmission, autoLoadFromQuery, setAutoLoadFromQuery]);
  return (
    <div>
      <div className="my-4">
        <label htmlFor="mode" className="block text-sm font-medium text-gray-600">
          Application
        </label>
        <select
          id="mode"
          name="mode"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          onChange={(e) => setType(e.target.value as AppMode)}
          value={type}
        >
          {Object.values(AppMode).map((mode, index) => (
            <option key={index}>{mode}</option>
          ))}
        </select>
      </div>
      <div className="my-4">
        <label htmlFor="identity-group" className="block text-sm font-medium text-gray-600">
          Identity Group ID
        </label>
        <div className="mt-1">
          <input
            value={identityGroup}
            onChange={(e) => setIdentityGroup(e.target.value)}
            type="text"
            name="identity-group"
            id="identity-group"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="my-4">
        <label htmlFor="topic" className="block text-sm font-medium text-gray-600">
          Topic
        </label>
        <div className="mt-1">
          <input
            value={externalNullifier}
            onChange={(e) => setExternalNullifier(e.target.value)}
            type="text"
            name="topic"
            id="topic"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="my-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-600">
          Message
        </label>
        <div className="mt-1">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            name="message"
            id="message"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <ButtonLg onClick={() => onAppCodeSubmission({ externalNullifier, identityGroup, message, type })}>
        Load VeilApp
      </ButtonLg>
    </div>
  );
};

export const ClaimLoader: FunctionComponent = () => {
  return (
    <div className="px-4 py-5 sm:p-6 flex place-content-center animate-spin">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-40 p-4 text-gray-300">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z" fill="currentColor" />
      </svg>
    </div>
  );
};

export enum ClaimState {
  UNINITIALIZED = "UNINITIALIZED",
  CIRCUIT_LOADED = "CIRCUIT_LOADED",
  FETCHING_IDENTITY_COMMITMENTS = "FETCHING_IDENTITY_COMMITMENTS",
  GENERATING_SIGNALS = "GENERATING_SIGNALS",
  GENERATING_PROOF = "GENERATING_PROOF",
  SUBMITTING_CLAIM = "SUBMITTING_CLAIM",
  SUCCESSFULLY_CLAIMED = "SUCCESSFULLY_CLAIMED",
  ERROR = "ERROR",
}

const PENDING_STATES = [
  ClaimState.UNINITIALIZED,
  ClaimState.FETCHING_IDENTITY_COMMITMENTS,
  ClaimState.GENERATING_PROOF,
  ClaimState.GENERATING_SIGNALS,
  ClaimState.SUBMITTING_CLAIM,
];

interface UninitializedState {
  state: ClaimState.UNINITIALIZED;
}

interface CircuitLoadedState {
  state: ClaimState.CIRCUIT_LOADED;
}

interface FetchingIdentityCommitmentsState {
  state: ClaimState.FETCHING_IDENTITY_COMMITMENTS;
}

interface GeneratingSignalState {
  state: ClaimState.GENERATING_SIGNALS;
}

interface GeneratingProofState {
  state: ClaimState.GENERATING_PROOF;
}

interface SubmittingClaimState {
  state: ClaimState.SUBMITTING_CLAIM;
}

interface SuccessfullyClaimedState {
  state: ClaimState.SUCCESSFULLY_CLAIMED;
  claim: ClaimWTimestamp;
}

interface ErrorState {
  state: ClaimState.ERROR;
  error: Error;
}

type ApplicationState =
  | UninitializedState
  | CircuitLoadedState
  | FetchingIdentityCommitmentsState
  | GeneratingSignalState
  | GeneratingProofState
  | SubmittingClaimState
  | SuccessfullyClaimedState
  | ErrorState;

interface ClaimCardRawProps {
  onClaim: (_claim: ClaimQR["payload"]) => void;
  appState: ApplicationState;
}

interface ClaimCardConfirmationProps {
  claim: ClaimQR["payload"];
  onConfirm: () => void;
  onCancel: () => void;
}

export const ClaimCardConfirmation: FunctionComponent<ClaimCardConfirmationProps> = ({
  claim,
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="py-4">
      <div className="mx-auto flex items-center justify-center h-40 w-40 rounded-full bg-yellow-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-32 text-yellow-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
          />
        </svg>
      </div>
      <div className="text-center mb-4 mt-2 text-lg font-bolder">Confirm Submission</div>
      <div className="text-gray-500 mt-4">Identity Group</div>
      <div>{claim.identityGroup}</div>
      <div className="text-gray-500 mt-4">Topic</div>
      <div>{claim.externalNullifier}</div>
      <div className="text-gray-500 mt-4">Message</div>
      <div>{claim.message}</div>
      <div className="flex justify-between mt-6">
        <ButtonLg onClick={onCancel}>Back</ButtonLg>
        <ButtonLg onClick={onConfirm}>Confirm</ButtonLg>
      </div>
    </div>
  );
};

const getLoadingText = (state: ClaimState) => {
  switch (state) {
    case ClaimState.UNINITIALIZED:
      return "Please wait while the app loads...";
    case ClaimState.FETCHING_IDENTITY_COMMITMENTS:
      return "Fetching identity group info...";
    case ClaimState.GENERATING_SIGNALS:
      return "Generating claim...";
    case ClaimState.GENERATING_PROOF:
      return "Generating claim...";
    case ClaimState.SUBMITTING_CLAIM:
      return "Submitting claim...";
    default:
      return "Loading...";
  }
};

export const ClaimCardRaw: FunctionComponent<ClaimCardRawProps> = ({ onClaim, appState }) => {
  const [showCamera, setShowCamera] = useState(false);
  const toggleCamera = () => setShowCamera(!showCamera);
  const [confirmedAppPayload, setConfirmedAppPayload] = useState<ClaimQR["payload"]>();
  const [autoLoadFromQuery, setAutoLoadFromQuery] = useState(true);

  const onAppCodeSubmission = (claim: ClaimQR["payload"]) => {
    setConfirmedAppPayload(claim);
  };

  const onAppCodeConfirmation = () => {
    if (!confirmedAppPayload) throw new Error("App code is not set");
    onClaim(confirmedAppPayload);
  };

  const isLoadingState = PENDING_STATES.includes(appState.state);
  const showAppCodeEntry = appState.state === ClaimState.CIRCUIT_LOADED && !confirmedAppPayload;
  const showAppConfirmation = appState.state === ClaimState.CIRCUIT_LOADED && confirmedAppPayload;

  return (
    <div className="flex justify-center">
      <div className="max-w-xl flex-1 bg-white p-4 rounded-md">
        {appState.state === ClaimState.ERROR && <div>{appState.error.message}</div>}
        {showAppCodeEntry && showCamera && <AppCodeScanner onAppCodeSubmission={onAppCodeSubmission} />}
        {showAppCodeEntry && !showCamera && (
          <AppCodeManualEntry
            onAppCodeSubmission={onAppCodeSubmission}
            autoLoadFromQuery={autoLoadFromQuery}
            setAutoLoadFromQuery={setAutoLoadFromQuery}
          />
        )}
        {showAppCodeEntry && <ButtonLg onClick={toggleCamera}>Toggle Camera</ButtonLg>}
        {showAppConfirmation && (
          <ClaimCardConfirmation
            onCancel={() => setConfirmedAppPayload(undefined)}
            onConfirm={onAppCodeConfirmation}
            claim={confirmedAppPayload!}
          />
        )}
        {isLoadingState && (
          <div>
            <ClaimLoader />
            <div className="text-center font-bold text-gray-400 mt-4 mb-6">{getLoadingText(appState.state)}</div>
          </div>
        )}
        {appState.state === ClaimState.SUCCESSFULLY_CLAIMED && (
          <div>
            <div className="text-center font-bold text-lg text-gray-600 my-6">Successfully Claimed</div>
            <div className="flex align-middle justify-center my-6">
              <Identicon size="140" value={appState.claim.nullifier} />
            </div>
            <div className="mt-4 text-sm text-gray-600">Timestamp:</div>
            <div className="text-sm text-gray-800">{format(appState.claim.timestamp, "dd/MM/yyyy hh:SS aa")}</div>
            <div className="mt-4 text-sm text-gray-600">Voucher Code:</div>
            <div className="text-sm text-gray-800" style={{ overflowWrap: "anywhere" }}>
              {appState.claim.nullifier}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const ClaimCard: FunctionComponent = () => {
  const [appState, setAppState] = useState<ApplicationState>({ state: ClaimState.UNINITIALIZED });
  const { identity } = useIdentityContext();
  const { state: circuitState, circuit, provingKey, initializeCircuit } = useCircuitContext();

  useEffect(() => {
    initializeCircuit();
  }, [initializeCircuit]);

  useEffect(() => {
    // Ready the application when both circuit and identity are initialized
    // Prevent ClaimCardRaw from rendering when identity isn't initialized
    if (identity.state === "INITIALIZED" && circuitState === "INITIALIZED" && appState.state === "UNINITIALIZED") {
      setAppState({ state: ClaimState.CIRCUIT_LOADED });
    }
  }, [circuitState, identity, appState]);

  const onClaim = async ({ identityGroup, externalNullifier, message: rawMessage, type }: ClaimQR["payload"]) => {
    try {
      if (identity.state !== "INITIALIZED") throw new Error("Identity is not initialized yet");
      if (circuitState !== "INITIALIZED") throw new Error("ZKP Circuit is not loaded yet");
      const message = JSON.stringify({
        type,
        message: rawMessage,
      });
      const identityCommitmentsDeferred = getIdentityCommitments({ identityGroup });
      setAppState({ state: ClaimState.FETCHING_IDENTITY_COMMITMENTS });
      const identityCommitments = await identityCommitmentsDeferred;
      const leaves = identityCommitments.map((idc) => BigNumber.from(idc.identityCommitment));
      const { witness } = await genWitness(
        message,
        circuit,
        identity.identity,
        leaves,
        config.semaphore.treeDepth,
        BigNumber.from(utils.toUtf8Bytes(externalNullifier))
      );
      setAppState({ state: ClaimState.GENERATING_SIGNALS });
      const publicSignal = genPublicSignals(witness, circuit);
      const [merkleRoot, nullifierHash] = publicSignal;
      setAppState({ state: ClaimState.GENERATING_PROOF });
      const proof = await genProof(witness, provingKey);
      setAppState({ state: ClaimState.SUBMITTING_CLAIM });
      const claimPayload = {
        proof: {
          snarkProof: snarkProofBigInt(proof),
          merkleRoot: merkleRoot.toString(),
        },
        nullifier: nullifierHash.toString(),
        identityGroup,
        externalNullifier,
        message,
      };
      const submittedClaim = await submitClaim(claimPayload);
      console.log("SUCCESS", submittedClaim);
      setAppState({ state: ClaimState.SUCCESSFULLY_CLAIMED, claim: submittedClaim });
    } catch (e) {
      console.error(e);
      if (e.message.includes("nullifer exist"))
        return setAppState({ state: ClaimState.ERROR, error: new Error("Cannot resubmit claim under the same topic") });
      setAppState({ state: ClaimState.ERROR, error: e });
    }
  };

  return <ClaimCardRaw onClaim={onClaim} appState={appState} />;
};
