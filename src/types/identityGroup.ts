import { Record, String, Static, Array } from "runtypes";

const identityGroupBase = {
  identityGroup: String,
  name: String,
};

export const IdentityGroupRT = Record(identityGroupBase);
export const IdentityGroupsRT = Array(IdentityGroupRT);
export const IdentityGroupCreateResponseRT = Record({ ...identityGroupBase, key: String });

export type IdentityGroup = Static<typeof IdentityGroupRT>;
export type IdentityGroups = Static<typeof IdentityGroupsRT>;
export type IdentityGroupCreateResponse = Static<typeof IdentityGroupCreateResponseRT>;
