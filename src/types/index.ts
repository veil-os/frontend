/* eslint-disable no-unused-vars */
import { Identity } from "libsemaphore";

export interface UninitializedIdentityState {
  state: "UNINITIALIZED";
}

export interface InitializingIdentityState {
  state: "INITIALIZING";
}

export interface InitializedIdentityState {
  state: "INITIALIZED";
  identity: Identity;
  identityCommitment: string;
}

export type IdentityState = InitializingIdentityState | UninitializedIdentityState | InitializedIdentityState;

export interface IdentityGroupManager {
  key: string;
}

export interface IdentityGroupManagers {
  [identityGroupId: string]: IdentityGroupManager;
}

export enum AppMode {
  VOUCHER = "VOUCHER",
}

export interface ClaimQR {
  type: string;
  payload: { identityGroup: string; message: string; externalNullifier: string; type: AppMode };
}

export * from "./identityCommitment";
export * from "./identityGroup";
export * from "./snarkProof";
export * from "./claim";
export * from "./sideEffects";
