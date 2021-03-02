import { format } from "date-fns";
import QRCode from "qrcode.react";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import Identicon from "react-jdenticon";
import { Link } from "react-router-dom";
import { useInterval } from "../../common/hook/useInterval";
import { getClaims } from "../../services/backend";
import { ClaimQR, ClaimsWTimestamp, AppMode, ClaimWTimestamp } from "../../types";
import { ButtonLg } from "../Button";

export interface DistributionDashboardProps {
  identityGroup: string;
  externalNullifier: string;
  message: string;
  loadResults: boolean;
  onBack: () => void;
}

interface VoucherModalProps {
  claim: ClaimWTimestamp;
  onClose: () => void;
}

export const VoucherModal: FunctionComponent<VoucherModalProps> = ({ claim, onClose }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-800 opacity-75" onClick={onClose} />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" />
        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                Verified Voucher
              </h3>
              <div className="mt-2">
                <pre className="text-xs text-left text-gray-500">{JSON.stringify(claim, null, 2)}</pre>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              onClick={onClose}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DistributionDashboard: FunctionComponent<DistributionDashboardProps> = ({
  identityGroup,
  externalNullifier,
  message,
  loadResults,
  onBack,
}) => {
  const [claims, setClaims] = useState<ClaimsWTimestamp>([]);
  const [filterByMessage, setFilterByMessage] = useState(true);
  const [focusedClaim, setFocusedClaim] = useState<ClaimWTimestamp>();
  const qrContent = JSON.stringify({
    type: "CLAIM",
    payload: {
      type: AppMode.VOUCHER,
      identityGroup,
      externalNullifier,
      message,
    },
  } as ClaimQR);

  interface ClaimMessage {
    type: AppMode;
    message: string;
  }

  const claimsToDisplay = claims.filter((claim) => {
    const { message: claimMessage } = JSON.parse(claim.message) as ClaimMessage;
    if (!filterByMessage || claimMessage === message) return true;
    return false;
  });

  const loadClaims = useCallback(async () => {
    const fetchedClaims = await getClaims({ identityGroup, externalNullifier });
    const filtered = fetchedClaims.filter((claim) => {
      if (claim.externalNullifier !== externalNullifier) return false;
      try {
        const { type } = JSON.parse(claim.message) as ClaimMessage;
        if (type === AppMode.VOUCHER) return true;
        return false;
      } catch (e) {}
      return false;
    });
    setClaims(filtered);
  }, [identityGroup, externalNullifier]);

  useInterval(loadClaims, loadResults ? 5000 : null);
  useEffect(() => {
    loadClaims();
  }, [loadClaims]);

  return (
    <div>
      <div className="bg-white p-4 flex justify-between my-2">
        <div>
          <div className="text-sm text-gray-600">Identity Group:</div>
          <div className="font-semibold text-gray-800 mb-2">{identityGroup}</div>
          <div className="text-sm text-gray-600">Topic:</div>
          <div className="font-semibold text-gray-800 mb-2">{externalNullifier}</div>
          <div className="text-sm text-gray-600">Message:</div>
          <div className="font-semibold text-gray-800 mb-2">{message}</div>
          <Link to={`claim?q=${encodeURIComponent(qrContent)}`}>Go to claims</Link>
        </div>
        <div className="text-sm text-center">
          <div className="mb-2">Scan QR below to generate voucher:</div>
          <QRCode value={qrContent} renderAs="svg" size={256} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-white text-2xl mt-6 mb-2">Vouchers Submitted</div>
        <div className="flex items-center">
          <span className="mr-3" id="annual-billing-label">
            <span className="text-sm text-gray-400">Show all voucher in topic</span>
          </span>
          <button
            type="button"
            className={`${
              filterByMessage ? `bg-gray-200` : `bg-indigo-600`
            } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            aria-pressed="false"
            aria-labelledby="annual-billing-label"
            onClick={() => setFilterByMessage(!filterByMessage)}
          >
            <span
              aria-hidden="true"
              className={`${
                filterByMessage ? "translate-x-0" : "translate-x-5"
              } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col mb-6">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Timestamp
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Message
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Unique Code
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {claimsToDisplay.map((claim, index) => {
                    const { message: claimMessage } = JSON.parse(claim.message) as ClaimMessage;
                    return (
                      <tr
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        key={index}
                        onClick={() => setFocusedClaim(claim)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(claim.timestamp, "dd/MM/yyyy hh:SS aa")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claimMessage}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center">
                          <Identicon size="72" value={claim.nullifier} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {focusedClaim && <VoucherModal claim={focusedClaim} onClose={() => setFocusedClaim(undefined)} />}
      <ButtonLg onClick={onBack}>Back</ButtonLg>
    </div>
  );
};
