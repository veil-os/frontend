import { Record, String, Tuple, Static } from "runtypes";

export const SnarkProofStrRT = Record({
  pi_a: Tuple(String, String, String),
  pi_b: Tuple(Tuple(String, String), Tuple(String, String), Tuple(String, String)),
  pi_c: Tuple(String, String, String),
});

export type SnarkProofStr = Static<typeof SnarkProofStrRT>;
