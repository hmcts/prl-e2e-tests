import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

test.use({ storageState: config.sessionStoragePath + "courtAdminStoke.json" });
// TEST COMMENT
test.describe("Complete Remove legal representative event for FL401 case", () => {
  let caseNumber: string;

  test.beforeEach(async ({ browser, caseEventUtils, navigationUtils }) => {
    caseNumber = await caseEventUtils.createDACase(browser);
    await navigationUtils.goToCase(
      config.manageCasesBaseURLCase,
      caseNumber,
      "summary",
    );
  });

  [
    {
      existingRepresentatives: ["Legal Solicitor (John Smith)"],
      snapshotName: "fl401-remove-legal-representative",
    },
  ].forEach(({ existingRepresentatives, snapshotName }) => {
    test(`Remove legal representation from applicants. @regression @accessibility @nightly`, async ({
      summaryPage,
      fl401RemoveLegalRepresentative1Page,
      fl401RemoveLegalRepresentativeSubmitPage,
      fl401RemoveLegalRepresentativeConfirmPage,
      partiesPage,
      axeUtils,
    }) => {
      await summaryPage.chooseEventFromDropdown("Remove legal representative");
      await fl401RemoveLegalRepresentative1Page.assertPageContents(
        existingRepresentatives,
      );
      await axeUtils.audit();
      await fl401RemoveLegalRepresentative1Page.selectRepresentativesToRemove(
        existingRepresentatives,
      );
      await fl401RemoveLegalRepresentative1Page.clickContinue();
      await fl401RemoveLegalRepresentativeSubmitPage.assertPageContents(
        snapshotName,
      );
      await axeUtils.audit();
      await fl401RemoveLegalRepresentativeSubmitPage.clickSubmit();
      await fl401RemoveLegalRepresentativeConfirmPage.assertPageContents();
      await axeUtils.audit();
      await fl401RemoveLegalRepresentativeConfirmPage.clickCloseAndReturnToCaseDetails();
      await summaryPage.alertBanner.assertEventAlert(
        caseNumber,
        "Remove legal representative",
      );
      // assert legal representation is removed on parties tab
      await partiesPage.goToPage();
      await partiesPage.assertFl401ApplicantSolicitorDetailsRemoved();
    });
  });
});
