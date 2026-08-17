import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

test.describe("Complete amend applicant details event as a court admin for a DA case", () => {
  let caseRef: string;

  test.beforeEach(
    async ({ courtAdminStoke, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
        .caseRef;
      await navigationUtils.goToCase(
        courtAdminStoke.page,
        config.manageCasesBaseURLCase,
        caseRef,
        "tasks",
      );
    },
  );

  test(`Amend the following applicant details: name, date of birth, gender,
  live in a refuge: yes,
  whether to keep details confidential: yes to all.
  Accessibility testing: Yes. @nightly @regression @accessibility`, async ({
    courtAdminStoke,
  }): Promise<void> => {
    const { summaryPage, amendApplicantDetails } = courtAdminStoke;

    await summaryPage.chooseEventFromDropdown("Amend applicant details");

    await amendApplicantDetails.page1.assertPageContents("FL401");
    await amendApplicantDetails.page1.selectCannotFindOrganisation();
    await amendApplicantDetails.page1.verifyAccessibility();
    await amendApplicantDetails.page1.fillInFields({
      caseType: "FL401",
      gender: "male",
    });
    await amendApplicantDetails.page1.clickContinue();

    await amendApplicantDetails.submitPage.assertPageContents(
      ["caseProgression", "amendDetails", "FL401"],
      "fl401-amend-applicant-details",
    );
    // Accessibility is disabled on this EXUI check-your-answers page until EXUI-2726 is fixed.
    await amendApplicantDetails.submitPage.clickSaveAndContinue();

    await summaryPage.alertBanner.assertEventAlert(
      caseRef,
      "Amend applicant details",
    );
  });
});
