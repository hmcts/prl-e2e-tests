import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

// -------------------------------
// C100 CASE TYPE: Upload additional applications as a solicitor
// // upload additional applications is not present when the case is created via TS support
// // so we need to create the case the long way to enable the upload additional applications event
// -------------------------------
test.describe("Upload additional applications for C100 tests", () => {
  let caseNumber: string;
  test.beforeEach(
    async ({ solicitor, page, caseEventUtils, navigationUtils }) => {
      caseNumber =
        await caseEventUtils.createCACaseSubmitAndPayIndividualEvents(page);
      await navigationUtils.goToCase(
        solicitor.page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "summary",
      );
    },
  );

  [
    {
      additionalApplicationType: "c2",
      withNotice: true,
      snapshotName: "C2-with-notice",
    },
  ].forEach((data) => {
    test(`Upload additional C2 application with notice. @regression @accessibility @nightly @test`, async ({
      solicitor,
    }): Promise<void> => {
      const { summaryPage, uploadAdditionalApplications } = solicitor;

      await summaryPage.chooseEventFromDropdown(
        "Upload additional applications",
      );
      await uploadAdditionalApplications.uploadAdditionalApplications1Page.assertPageContents(
        "C100",
      );
      await uploadAdditionalApplications.uploadAdditionalApplications1Page.verifyAccessibility();
      await uploadAdditionalApplications.uploadAdditionalApplications1Page.selectApplicationType(
        data.additionalApplicationType,
        data.withNotice,
      );
      await uploadAdditionalApplications.uploadAdditionalApplications1Page.clickContinue();

      if (data.additionalApplicationType === "c2") {
        await uploadAdditionalApplications.uploadAdditionalApplications2Page.assertPageContents(
          "C100",
        );
        await uploadAdditionalApplications.uploadAdditionalApplications2Page.verifyAccessibility();
        await uploadAdditionalApplications.uploadAdditionalApplications2Page.fillInFields(
          "C100",
        );
        await uploadAdditionalApplications.uploadAdditionalApplications2Page.clickContinue();
      } else {
        await uploadAdditionalApplications.uploadAdditionalApplications3Page.assertPageContents("C100");
        await uploadAdditionalApplications.uploadAdditionalApplications3Page.verifyAccessibility();
        await uploadAdditionalApplications.uploadAdditionalApplications3Page.fillInFields(
          "C100",
        );
        await uploadAdditionalApplications.uploadAdditionalApplications3Page.clickContinue();
      }

      await uploadAdditionalApplications.uploadAdditionalApplications4Page.assertPageContents(
        data.additionalApplicationType,
        data.withNotice,
      );
      await uploadAdditionalApplications.uploadAdditionalApplications4Page.verifyAccessibility();
      await uploadAdditionalApplications.uploadAdditionalApplications4Page.selectHWF();
      await uploadAdditionalApplications.uploadAdditionalApplications4Page.clickContinue();

      await uploadAdditionalApplications.submitPage.assertPageContents(
        ["caseProgression", "Upload additional applications"],
        data.snapshotName,
      );
      await uploadAdditionalApplications.submitPage.verifyAccessibility();
      await uploadAdditionalApplications.submitPage.clickSaveAndContinue();

      await uploadAdditionalApplications.confirmPage.assertPageContents("C100");
      await uploadAdditionalApplications.confirmPage.verifyAccessibility();
      await uploadAdditionalApplications.confirmPage.clickCloseAndReturnToCaseDetails();

      await summaryPage.alertBanner.assertEventAlert(
        caseNumber,
        "Upload additional applications",
      );

    });
  });
});
