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
        anyJudgeOrLegalAdviser: "Send to a judge",
      },
      snapshotPath: ["caseProgression", "sendToGateKeeper"],
      snapshotName: "send-to-any-judge",
    },
    {
      sendToGateKeeperParams: {
        sendToSpecificGateKeeper: false,
        anyJudgeOrLegalAdviser: "Send to a legal adviser",
      },
      snapshotPath: ["caseProgression", "sendToGateKeeper"],
      snapshotName: "send-to-any-legal-adviser",
    },
    {
      sendToGateKeeperParams: {
        sendToSpecificGateKeeper: false,
      },
      snapshotPath: ["caseProgression", "sendToGateKeeper"],
      snapshotName: "send-to-both-judge-and-legal-adviser",
    },
    {
      sendToGateKeeperParams: {
        sendToSpecificGateKeeper: true,
        specificJudgeOrLegalAdviser: "Send to a specific judge",
        judgeName: "Ms Elizabeth Williams",
      },
      snapshotPath: ["caseProgression", "sendToGateKeeper"],
      snapshotName: "send-to-judiciary-gatekeeper",
    },
    {
      sendToGateKeeperParams: {
        sendToSpecificGateKeeper: true,
        specificJudgeOrLegalAdviser: "Send to a specific legal adviser",
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
