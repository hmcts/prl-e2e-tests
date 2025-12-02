import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures/fixtures.ts";

test.describe("Complete Remove legal representative event for FL401 case", () => {
  let caseNumber: string;

  test.beforeEach(
    async ({ courtAdminStoke, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createDACase(browser);
      await navigationUtils.goToCase(
        courtAdminStoke.page,
        config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  [
    {
      existingRepresentatives: ["Legal Solicitor (John Smith)"],
      snapshotName: "fl401-remove-legal-representative",
    },
  ].forEach(({ existingRepresentatives, snapshotName }) => {
    test(`Remove legal representation from applicants. @regression @accessibility @nightly`, async ({
      courtAdminStoke,
    }) => {
      const { summaryPage, fl401RemoveLegalRepresentative, partiesPage } =
        courtAdminStoke;

      await summaryPage.chooseEventFromDropdown("Remove legal representative");

      await fl401RemoveLegalRepresentative.page1.assertPageContents(
        existingRepresentatives,
      );
      await fl401RemoveLegalRepresentative.page1.verifyAccessibility();
      await fl401RemoveLegalRepresentative.page1.selectRepresentativesToRemove(
        existingRepresentatives,
      );
      await fl401RemoveLegalRepresentative.page1.clickContinue();

      await fl401RemoveLegalRepresentative.submitPage.assertPageContents(
        ["caseProgression", "removeLegalRepresentative"],
        snapshotName,
      );
      await fl401RemoveLegalRepresentative.submitPage.verifyAccessibility();
      await fl401RemoveLegalRepresentative.submitPage.clickSubmit();

      await fl401RemoveLegalRepresentative.confirmPage.assertPageContents();
      await fl401RemoveLegalRepresentative.confirmPage.verifyAccessibility();
      await fl401RemoveLegalRepresentative.confirmPage.clickCloseAndReturnToCaseDetails();

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
