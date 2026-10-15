import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

test.describe("Complete Remove legal representative event for C100 case", () => {
  let caseRef: string;

  test.beforeEach(
    async ({ courtAdminStoke, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
        .caseRef;
      await navigationUtils.goToCase(
        courtAdminStoke.page,
        config.manageCasesBaseURLCase,
        caseRef,
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
      courtAdminStoke,
    }) => {
      const { summaryPage, c100RemoveLegalRepresentative, partiesPage } =
        courtAdminStoke;

      await summaryPage.chooseEventFromDropdown("Remove legal representative");

      await c100RemoveLegalRepresentative.page1.assertPageContents(
        existingRepresentatives,
      );
      await c100RemoveLegalRepresentative.page1.verifyAccessibility();
      await c100RemoveLegalRepresentative.page1.selectRepresentativesToRemove(
        existingRepresentatives,
      );
      await c100RemoveLegalRepresentative.page1.clickContinue();

      await c100RemoveLegalRepresentative.submitPage.assertPageContents(
        ["caseProgression", "removeLegalRepresentative"],
        snapshotName,
      );
      await c100RemoveLegalRepresentative.submitPage.verifyAccessibility();
      await c100RemoveLegalRepresentative.submitPage.clickSubmit();

      await c100RemoveLegalRepresentative.confirmPage.assertPageContents();
      await c100RemoveLegalRepresentative.confirmPage.verifyAccessibility();
      await c100RemoveLegalRepresentative.confirmPage.clickCloseAndReturnToCaseDetails();

      await summaryPage.alertBanner.assertEventAlert(
        caseRef,
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
