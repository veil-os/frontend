import { Record, String, Static, Array } from "runtypes";

export const IdentityGroupRT = Record({
  identityGroup: String,
  name: String,
});
export const IdentityGroupsRT = Array(IdentityGroupRT);

export type IdentityGroup = Static<typeof IdentityGroupRT>;
export type IdentityGroups = Static<typeof IdentityGroupsRT>;
