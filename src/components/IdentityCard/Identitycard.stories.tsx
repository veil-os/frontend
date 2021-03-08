import React from "react";
import { LayoutDark } from "../Layout";
import { IdentityCard, IdentityCardProps } from ".";

export default {
  title: "IdentityCard",
  component: IdentityCard,
  parameters: {
    info: { inline: true, header: false },
  },
};

const initializedIdentity: IdentityCardProps["identity"] = {
  state: "INITIALIZED",
  identityCommitment: "19145416389459048206775232397463652237984286643607491277294639051426669703636",
  identity: {} as any,
};

const props: IdentityCardProps = {
  onSetIdentity: (identity) => alert(identity),
  onResetIdentity: () => alert("Resetting Identity"),
  identity: { state: "UNINITIALIZED" },
};

export const IdentityCardStory: React.FunctionComponent = () => (
  <LayoutDark>
    <div className="py-4 px-4">
      <h1 className="storybook-title">IdentityCard (Initialized)</h1>
      <IdentityCard {...{ ...props, identity: initializedIdentity }} />
      <h1 className="storybook-title">IdentityCard (Uninitialized)</h1>
      <IdentityCard {...props} />
    </div>
  </LayoutDark>
);
