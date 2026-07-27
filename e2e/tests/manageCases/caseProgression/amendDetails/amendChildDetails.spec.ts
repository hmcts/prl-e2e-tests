import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

test.use({ storageState: config.sessionStoragePath + "courtAdminStoke.json" });

test.describe("Complete amend Child details event as a court admin", () => {
  let caseRef: string;

  test.beforeEach(async ({ solicitor, courtAdminStoke, browser, caseEventUtils, navigationUtils }) => {
    caseRef = await caseEventUtils.createCACaseSubmitAndPayIndividualEvents(
      solicitor.page,
    );
    await navigationUtils.goToCase(
      courtAdminStoke.page,
      config.manageCasesBaseURLCase,
      caseRef,
    );
  });

  test(`Amend the following Child details: firstname, lastname, date of birth, gender @regression`, async ({
    courtAdminStoke,
  }): Promise<void> => {
    const { summaryPage, amendChildDetails } = courtAdminStoke;

    await summaryPage.chooseEventFromDropdown("Amend Child details");

    await amendChildDetails.page1.assertPageContents();
    await amendChildDetails.page1.fillInFields({
      c100ChildGender: "male",
      under18: true,
    });

    await amendChildDetails.page2.assertPageContents();
    await amendChildDetails.page2.fillInFields({ yesNoDontKnow: "yes" });

    await amendChildDetails.submitPage.assertPageContents(
      ["caseProgression", "amendDetails", "amendChildDetails"],
      "amend-child-details",
    );
    await amendChildDetails.submitPage.clickSaveAndContinue();
  });
});
