import axios, { AxiosError } from "axios";
import { config } from "../config";
import { IdentityCommitmentsRT, Claim, ClaimWTimestampRT, ClaimsWTimestampRT } from "../types";

const { endpoint } = config;

interface ErrorResponse {
  requestId: string;
  message?: string;
}

const errorHandler = <F extends (..._args: A) => ReturnType<F>, A extends any[]>(f: F) => async (...args: A) => {
  try {
    const res = await f(...args);
    return res;
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    if (!error.response) throw new Error("Unexpected error: No response");
    const { message, requestId } = error.response.data;
    if (message) throw new Error(message);
    throw new Error(`Server Error: ${requestId}`);
  }
};

export const getIdentityCommitments = errorHandler(async ({ identityGroup }: { identityGroup: string }) => {
  const res = await axios.get(`${endpoint}/identityCommitment/${identityGroup}`);
  const identityCommitments = IdentityCommitmentsRT.check(res.data);
  return identityCommitments;
});

export const submitClaim = errorHandler(async (claimPayload: Claim) => {
  const res = await axios.post(`${endpoint}/claim`, claimPayload);
  const submittedClaim = ClaimWTimestampRT.check(res.data);
  return submittedClaim;
});

export const getClaims = errorHandler(
  async ({ identityGroup, externalNullifier }: { identityGroup: string; externalNullifier: string }) => {
    const res = await axios.get(`${endpoint}/claim/${identityGroup}/${externalNullifier}`);
    const claims = ClaimsWTimestampRT.check(res.data);
    return claims;
  }
);
