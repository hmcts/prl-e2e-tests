import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";

test.describe("Create a hearing request for a C100 case", () => {
  let caseRef: string;

  test.beforeEach(
    async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
        .caseRef;
      await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
      await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

  test("Complete Task - Create Hearing Request with accessibility test. @nightly @regression @accessibility", async ({
    caseWorker,
  }): Promise<void> => {
    const { hearingsPage, createHearingRequest } = caseWorker;

    await hearingsPage.goToPage();
    await hearingsPage.requestAHearing();

    await createHearingRequest.requirementsPage.assertPageContents();
    await createHearingRequest.requirementsPage.verifyAccessibility();
    await createHearingRequest.requirementsPage.clickContinue();

    await createHearingRequest.facilitiesPage.assertPageContents();
    await createHearingRequest.facilitiesPage.verifyAccessibility();
    await createHearingRequest.facilitiesPage.fillInFields();
    await createHearingRequest.facilitiesPage.clickContinue();

    await createHearingRequest.stagePage.assertPageContents();
    await createHearingRequest.stagePage.verifyAccessibility();
    await createHearingRequest.stagePage.fillInFields();
    await createHearingRequest.stagePage.clickContinue();

    await createHearingRequest.attendancePage.assertPageContents();
    await createHearingRequest.attendancePage.verifyAccessibility();
    await createHearingRequest.attendancePage.fillInFields();
    await createHearingRequest.attendancePage.clickContinue();

    await createHearingRequest.venuePage.assertPageContents();
    // TODO FPET-1231: re-enable the accessibility check when the upstream issue is resolved.
    await createHearingRequest.venuePage.clickContinue();

    await createHearingRequest.welshPage.assertPageContents();
    await createHearingRequest.welshPage.verifyAccessibility();
    await createHearingRequest.welshPage.fillInFields();
    await createHearingRequest.welshPage.clickContinue();

    await createHearingRequest.judgePage.assertPageContents();
    await createHearingRequest.judgePage.verifyAccessibility();
    await createHearingRequest.judgePage.fillInFields();
    await createHearingRequest.judgePage.clickContinue();

    await createHearingRequest.timingPage.assertPageContents();
    await createHearingRequest.timingPage.verifyAccessibility();
    await createHearingRequest.timingPage.fillInFields();
    await createHearingRequest.timingPage.clickContinue();

    await createHearingRequest.linkPage.assertPageContents();
    await createHearingRequest.linkPage.verifyAccessibility();
    await createHearingRequest.linkPage.fillInFields();
    await createHearingRequest.linkPage.clickContinue();

    await createHearingRequest.additionalInstructionsPage.assertPageContents();
    await createHearingRequest.additionalInstructionsPage.verifyAccessibility();
    await createHearingRequest.additionalInstructionsPage.fillInFields();
    await createHearingRequest.additionalInstructionsPage.clickContinue();

    await createHearingRequest.summaryPage.assertPageContents();
    await createHearingRequest.summaryPage.verifyAccessibility();
    await createHearingRequest.summaryPage.submitRequest();

    await createHearingRequest.confirmationPage.assertPageContents();
    await createHearingRequest.confirmationPage.verifyAccessibility();
    await createHearingRequest.confirmationPage.viewHearingStatus();
  });
});
