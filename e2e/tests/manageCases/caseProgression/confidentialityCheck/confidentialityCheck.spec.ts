import {
  caseTypes,
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../common/types.js";
import { test } from "../../../fixtures.js";
import config from "../../../../utils/config.utils.js";

// TEST COMMENT
interface ConfidentialityCheckScenario {
  orderType: OrderTypes;
  serveApplication: boolean;
  snapshotName: string;
}

const scenarios: Record<
  solicitorCaseCreateType,
  ConfidentialityCheckScenario[]
> = {
  C100: [
    {
      orderType:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      serveApplication: true,
      snapshotName: "c100-confidential-check",
    },
  ],
  FL401: [
    {
      orderType: "Power of arrest (FL406)",
      serveApplication: true,
      snapshotName: "fl401-confidential-check",
    },
  ],
};

caseTypes.forEach((caseType) => {
  test.describe(`Confidentiality check task for ${caseType} Solicitor case tests.`, () => {
    let caseRef: string;

    test.beforeEach(async ({ manageCasesEventUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase(caseType))
        .caseRef;
      if (caseType === "C100") {
        await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
      }
      await manageCasesEventUtils.sendToGatekeeper(caseRef, caseType);
    });

    scenarios[caseType].forEach(
      ({ orderType, serveApplication, snapshotName }) => {
        test(`Complete Task - Confidentiality check with serving the application as ${serveApplication}. @regression @accessibility @nightly`, async ({
          caseManager,
          navigationUtils,
          manageCasesEventUtils,
        }): Promise<void> => {
          const {
            tasksPage,
            confidentialityCheck,
            summaryPage,
            serviceOfApplication,
          } = caseManager;

          await manageCasesEventUtils.createOrder({
            caseRef,
            orderType,
            isDraft: false,
            doServe: false,
          });
          await manageCasesEventUtils.serviceOfApplication(
            caseRef,
            caseType,
            orderType,
          );
          await navigationUtils.goToCase(
            caseManager.page,
            config.manageCasesBaseURLCase,
            caseRef,
            "tasks",
          );

          await tasksPage.assignTaskToMeAndTriggerNextSteps(
            "C8 - Confidential details check",
            "Confidential Check",
            "caseManager",
          );

          await confidentialityCheck.confidentialityCheck1Page.assertPageContents(
            caseType,
            orderType,
            ["caseProgression", "confidentialityCheck"],
          );
          await confidentialityCheck.confidentialityCheck1Page.serveApplication(
            serveApplication,
          );
          await confidentialityCheck.confidentialityCheck1Page.clickContinue();

          await confidentialityCheck.confidentialityCheckSubmitPage.assertPageContents(
            ["caseProgression", "confidentialityCheck"],
            snapshotName,
          );
          await confidentialityCheck.confidentialityCheckSubmitPage.verifyAccessibility();
          await confidentialityCheck.confidentialityCheckSubmitPage.clickSaveAndContinue();

          await confidentialityCheck.confidentialityCheckConfirmPage.assertPageContents();
          await confidentialityCheck.confidentialityCheckConfirmPage.verifyAccessibility();
          await confidentialityCheck.confidentialityCheckConfirmPage.clickCloseAndReturnToCaseDetails();

          //***** Assertions  ********** //
          await summaryPage.alertBanner.assertEventAlert(
            caseRef,
            "Confidentiality check",
          );
          await serviceOfApplication.serviceOfApplicationPage.goToPage();
          await serviceOfApplication.serviceOfApplicationPage.assertServicePacks(
            caseType,
            orderType,
            false,
            true,
            { personallyServed: "yes", servedBy: "courtAdmin" }, // these are the same options as the api call
            true,
          );
        });
      },
    );
  });
});
