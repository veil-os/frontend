import { Record, String, Static, Array } from "runtypes";

export const IdentityCommitmentRT = Record({
  identityGroup: String,
  identityCommitment: String,
});
export const IdentityCommitmentsRT = Array(IdentityCommitmentRT);

export type IdentityCommitment = Static<typeof IdentityCommitmentRT>;
export type IdentityCommitments = Static<typeof IdentityCommitmentsRT>;
