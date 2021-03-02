import React, { useState } from "react";
import { LayoutDark } from "../Layout";
import { VoucherForm } from "./DistributeContainer";

const VoucherFormContainer: React.FunctionComponent = () => {
  const [identityGroup, setIdentityGroup] = useState("DEFAULT_IDENTITY_GROUP");
  const [message, setMessage] = useState("DEFAULT_MESSAGE");
  const [externalNullifier, setExternalNullifier] = useState("DEFAULT_EXTERNAL_NULLIFIER");
  const submitDistributionForm = () => {
    alert("Submitting");
  };
  return (
    <LayoutDark>
      <div className="py-4 px-4">
        <VoucherForm
          {...{
            identityGroup,
            message,
            externalNullifier,
            setMessage,
            setIdentityGroup,
            setExternalNullifier,
            submitDistributionForm,
          }}
        />
      </div>
    </LayoutDark>
  );
};

export default {
  title: "VoucherForm",
  component: VoucherForm,
  parameters: {
    info: { inline: true, header: false },
  },
};

export const VoucherFormStory: React.FunctionComponent = () => (
  <div>
    <h1 className="storybook-title">VoucherForm</h1>
    <VoucherFormContainer />
  </div>
);
