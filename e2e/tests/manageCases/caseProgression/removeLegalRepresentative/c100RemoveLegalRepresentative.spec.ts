import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

test.use({ storageState: config.sessionStoragePath + "courtAdminStoke.json" });

test.describe("Complete Remove legal representative event for C100 case", () => {
  let caseNumber: string;

  test.beforeEach(
    async ({ page, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createCACase(browser);
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  [
    {
      existingRepresentatives: [
        "Legal Solicitor (John Doe)",
        "Legal Solicitor Jr (Jeremy Anderson)",
        "Sr Legal Solicitor (Martina Graham)",
      ],
      snapshotName: "c100-remove-legal-representative",
      applicants: [
        { firstname: "John", surname: "Doe" },
        { firstname: "Jeremy", surname: "Anderson" },
        { firstname: "Martina", surname: "Graham" },
      ],
    },
  ].forEach(({ existingRepresentatives, snapshotName, applicants }) => {
    test(`Remove legal representation from applicants. @regression @accessibility @nightly`, async ({
      summaryPage,
      c100RemoveLegalRepresentative1Page,
      c100RemoveLegalRepresentativeSubmitPage,
      c100RemoveLegalRepresentativeConfirmPage,
      partiesPage,
      axeUtils,
    }) => {
      await summaryPage.chooseEventFromDropdown("Remove legal representative");
      await c100RemoveLegalRepresentative1Page.assertPageContents(
        existingRepresentatives,
      );
      await axeUtils.audit();
      await c100RemoveLegalRepresentative1Page.selectRepresentativesToRemove(
        existingRepresentatives,
      );
      await c100RemoveLegalRepresentative1Page.clickContinue();
      await c100RemoveLegalRepresentativeSubmitPage.assertPageContents(
        ["caseProgression", "removeLegalRepresentative"],
        snapshotName,
      );
      await axeUtils.audit();
      await c100RemoveLegalRepresentativeSubmitPage.clickSubmit();
      await c100RemoveLegalRepresentativeConfirmPage.assertPageContents();
      await axeUtils.audit();
      await c100RemoveLegalRepresentativeConfirmPage.clickCloseAndReturnToCaseDetails();
      await summaryPage.alertBanner.assertEventAlert(
        caseNumber,
        "Remove legal representative",
      );
      // assert legal representation is removed on parties tab
      await partiesPage.goToPage();
      await partiesPage.assertC100ApplicantsSolicitorsDetailsRemoved(
        applicants,
      );
    });
  });
});
