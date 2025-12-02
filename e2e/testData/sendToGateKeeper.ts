import { SendToGateKeeperJourneyParams } from "../journeys/manageCases/caseProgression/sendToGateKeeper/sendToGateKeeperJourney.js";
import { JudgeAndLegalAdviser } from "../common/types.js";

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
        judgeOrLegalAdviser: "Judge" as JudgeAndLegalAdviser,
        judgeName: "Ms Elizabeth Williams",
      },
      snapshotPath: ["caseProgression", "sendToGateKeeper"],
      snapshotName: "send-to-judiciary-gatekeeper",
    },
    {
      sendToGateKeeperParams: {
        sendToSpecificGateKeeper: true,
        judgeOrLegalAdviser: "Legal adviser" as JudgeAndLegalAdviser,
        legalAdviserDropdownName:
          "legaladvisor-swansea-two(prl_legaladvisor_swansea@justice.gov.uk)",
        legalAdviserDisplayName: "prl legaladvisor-swansea-two",
      },
      snapshotPath: ["caseProgression", "sendToGateKeeper"],
      snapshotName: "send-to-legal-adviser-gatekeeper",
    },
  ];
