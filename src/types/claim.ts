import { Record, String, Static, Array, Number } from "runtypes";
import { SnarkProofStrRT } from "./snarkProof";

const claimBase = {
  proof: Record({
    snarkProof: SnarkProofStrRT,
    merkleRoot: String,
  }),
  nullifier: String,
  identityGroup: String,
  externalNullifier: String,
  message: String,
};
export const ClaimRT = Record(claimBase);
export const ClaimWTimestampRT = Record({
  ...claimBase,
  timestamp: Number,
});

export const ClaimsRT = Array(ClaimRT);
export const ClaimsWTimestampRT = Array(ClaimWTimestampRT);

export type Claim = Static<typeof ClaimRT>;
export type Claims = Static<typeof ClaimsRT>;
export type ClaimWTimestamp = Static<typeof ClaimWTimestampRT>;
export type ClaimsWTimestamp = Static<typeof ClaimsWTimestampRT>;
