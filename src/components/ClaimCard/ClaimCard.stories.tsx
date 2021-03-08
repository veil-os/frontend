import React from "react";
import { ClaimWTimestamp } from "../../types";
import { LayoutDark } from "../Layout";
import { ClaimCardRaw, ClaimState } from ".";

export default {
  title: "ClaimCard",
  component: ClaimCardRaw,
  parameters: {
    info: { inline: true, header: false },
  },
};

const claim: ClaimWTimestamp = {
  identityGroup: "718d2af7-bad4-4437-9861-dd82ab44c961",
  externalNullifier: "FOOD_COLLECTION-20210228",
  nullifier: "1533026511161215767822592206534224276681090929703917008589339632020039613464",
  message: "ABC PTE LTD",
  proof: {
    merkleRoot: "12799740624692665849580483474254944934868855538491416609383926216924005886420",
    snarkProof: {
      pi_a: [
        "13106433947503667462785093421681513567903112882897443448192969614922467775690",
        "7911221662928531408966241230708712678295707360008783492069867538214297400242",
        "1",
      ],
      pi_b: [
        [
          "5657940741257307832119658397695122971241465563271222214473995273911894286809",
          "16957830606075457276058298288907789355394130077270150857967922975675966687519",
        ],
        [
          "14422085274218651494628197254426036843162421587030995739927548486758866684325",
          "7662681263802964468216163640519438751006474653588382977878616455667362850584",
        ],
        ["1", "0"],
      ],
      pi_c: [
        "1630867053775895352221362729194661609951057165657108762579648053748675247871",
        "15600695906408790289085748292685380358976400622654762007243524334165197266719",
        "1",
      ],
    },
  },
  timestamp: 1614442329024,
};

export const ClaimCardStory: React.FunctionComponent = () => (
  <LayoutDark>
    <div className="py-4 px-4">
      <h1 className="storybook-title text-gray-100">ClaimCard (UNINITIALIZED)</h1>
      <ClaimCardRaw onClaim={console.log} appState={{ state: ClaimState.UNINITIALIZED }} />

      <h1 className="storybook-title text-gray-100">ClaimCard (CIRCUIT_LOADED)</h1>
      <ClaimCardRaw onClaim={console.log} appState={{ state: ClaimState.CIRCUIT_LOADED }} />

      <h1 className="storybook-title text-gray-100">ClaimCard (FETCHING_IDENTITY_COMMITMENTS)</h1>
      <ClaimCardRaw onClaim={console.log} appState={{ state: ClaimState.FETCHING_IDENTITY_COMMITMENTS }} />

      <h1 className="storybook-title text-gray-100">ClaimCard (GENERATING_SIGNALS)</h1>
      <ClaimCardRaw onClaim={console.log} appState={{ state: ClaimState.GENERATING_SIGNALS }} />

      <h1 className="storybook-title text-gray-100">ClaimCard (GENERATING_PROOF)</h1>
      <ClaimCardRaw onClaim={console.log} appState={{ state: ClaimState.GENERATING_PROOF }} />

      <h1 className="storybook-title text-gray-100">ClaimCard (SUBMITTING_CLAIM)</h1>
      <ClaimCardRaw onClaim={console.log} appState={{ state: ClaimState.SUBMITTING_CLAIM }} />

      <h1 className="storybook-title text-gray-100">ClaimCard (SUCCESSFULLY_CLAIMED)</h1>
      <ClaimCardRaw
        onClaim={console.log}
        appState={{
          state: ClaimState.SUCCESSFULLY_CLAIMED,
          claim,
        }}
      />

      <h1 className="storybook-title text-gray-100">ClaimCard (TIMEOUT_CLAIM)</h1>
      <ClaimCardRaw
        onClaim={console.log}
        appState={{
          state: ClaimState.TIMEOUT_CLAIM,
          claim,
        }}
      />

      <h1 className="storybook-title text-gray-100">ClaimCard (ERROR)</h1>
      <ClaimCardRaw onClaim={console.log} appState={{ state: ClaimState.ERROR, error: new Error("Oops") }} />
    </div>
  </LayoutDark>
);
