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
      const {
        summaryPage,
        fl401RemoveLegalRepresentative1Page,
        fl401RemoveLegalRepresentativeSubmitPage,
        fl401RemoveLegalRepresentativeConfirmPage,
        partiesPage,
      } = courtAdminStoke;

      await summaryPage.chooseEventFromDropdown("Remove legal representative");

      await fl401RemoveLegalRepresentative1Page.assertPageContents(
        existingRepresentatives,
      );
      await fl401RemoveLegalRepresentative1Page.verifyAccessibility();
      await fl401RemoveLegalRepresentative1Page.selectRepresentativesToRemove(
        existingRepresentatives,
      );
      await fl401RemoveLegalRepresentative1Page.clickContinue();

      await fl401RemoveLegalRepresentativeSubmitPage.assertPageContents(
        ["caseProgression", "removeLegalRepresentative"],
        snapshotName,
      );
      await fl401RemoveLegalRepresentativeSubmitPage.verifyAccessibility();
      await fl401RemoveLegalRepresentativeSubmitPage.clickSubmit();

      await fl401RemoveLegalRepresentativeConfirmPage.assertPageContents();
      await fl401RemoveLegalRepresentativeConfirmPage.verifyAccessibility();
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
