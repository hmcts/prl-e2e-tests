import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";

test.use({ storageState: config.sessionStoragePath + "caseManager.json" });

test.describe("Confidentiality check task for CA Solicitor case tests.", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ caseManager, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
    await manageCasesEventUtils.createOrder({
      caseRef: caseRef,
      orderType:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      isDraft: false,
      doServe: false,
    });
    await manageCasesEventUtils.serviceOfApplication(
      caseRef,
      "C100",
      "Child arrangements, specific issue or prohibited steps order (C43)",
    );
    await navigationUtils.goToCase(
      caseManager.page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  [{ serveApplication: true, snapshotName: "c100-confidential-check-cya" }].forEach(
    ({ serveApplication, snapshotName }) => {
  test("Complete Task - Confidentiality check with serving the application as true. @nightly @regression @visual", async ({
    caseManager,
  }) => {
    const { tasksPage, confidentialityCheck, summaryPage, serviceOfApplication } = caseManager;

    await tasksPage.assignTaskToMeAndTriggerNextSteps(
      "C8 - Confidential details check",
      "Confidential Check",
      "caseManager",
    );

    await confidentialityCheck.confidentialityCheck1Page.assertPageContents(
      ["caseProgression", "c100ConfidentialityCheck"],
    );
    await confidentialityCheck.confidentialityCheck1Page.serveApplication(
      serveApplication,
    );
    await confidentialityCheck.confidentialityCheck1Page.clickContinue();

    await confidentialityCheck.confidentialityCheckSubmitPage.assertPageContents(
      ["caseProgression", "c100ConfidentialityCheck"],
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



  });
    },
  );
});
