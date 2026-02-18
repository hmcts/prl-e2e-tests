import { SendToGateKeeperJourneyParams } from "../journeys/manageCases/caseProgression/sendToGateKeeper/sendToGateKeeperJourney.js";

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
        legalAdviserDropdownName:
          process.env.MANAGE_CASES_TEST_ENV === "demo"
            ? "legal advisor(prl_demo_la_swansea@justice.gov.uk)"
            : "legaladvisor-swansea-two(prl_legaladvisor_swansea@justice.gov.uk)",
        legalAdviserDisplayName:
          process.env.MANAGE_CASES_TEST_ENV === "demo"
            ? "Prl legal advisor"
            : "prl legaladvisor-swansea-two",
      },
      snapshotPath: ["caseProgression", "sendToGateKeeper"],
      snapshotName: "send-to-legal-adviser-gatekeeper",
    },
  ];
