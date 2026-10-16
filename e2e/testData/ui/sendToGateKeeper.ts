import { SendToGateKeeperParams } from "../../pageObjects/pages/exui/sendToGateKeeper/sendToGateKeeper1.po.js";

export interface SendToGateKeeperJourneyParams {
  sendToGateKeeperParams: SendToGateKeeperParams;
  snapshotPath: string[];
  snapshotName: string;
}

export const SendToGateKeeperCourtAdminScenarios: SendToGateKeeperJourneyParams[] =
  [
    {
      sendToGateKeeperParams: {
        sendToSpecificGateKeeper: false,
      },
      snapshotPath: ["caseProgression", "sendToGateKeeper"],
      snapshotName: "send-to-no-specific-gatekeeper",
    },
    {
      sendToGateKeeperParams: {
        sendToSpecificGateKeeper: true,
        judgeOrLegalAdviser: "Judge",
        judgeName: "Ms Elizabeth Williams",
      },
      snapshotPath: ["caseProgression", "sendToGateKeeper"],
      snapshotName: "send-to-judiciary-gatekeeper",
    },
    {
      sendToGateKeeperParams: {
        sendToSpecificGateKeeper: true,
        judgeOrLegalAdviser: "Legal adviser",
        legalAdviserName:
          process.env.MANAGE_CASES_TEST_ENV === "demo"
            ? "Prl legal advisor"
            : "prl legaladvisor-swansea-two",
        legalAdviserEmail: process.env.LEGALADVISOR_USERNAME,
      },
      snapshotPath: ["caseProgression", "sendToGateKeeper"],
      snapshotName:
        process.env.MANAGE_CASES_TEST_ENV === "demo"
          ? "send-to-legal-adviser-gatekeeper-demo"
          : "send-to-legal-adviser-gatekeeper",
    },
  ];
