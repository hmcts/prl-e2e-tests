import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

test.describe("Complete amend Child details event as a court admin", () => {
  let caseRef: string;

  test.beforeEach(
    async ({ solicitor, courtAdminStoke, caseEventUtils, navigationUtils }) => {
      caseRef = await caseEventUtils.createCACaseSubmitAndPayIndividualEvents(
        solicitor.page,
      );
      await navigationUtils.goToCase(
        courtAdminStoke.page,
        config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

  [
    {
      scenario: "male and under 18",
      fillInFieldsOptions: {
        c100ChildGender: "male" as const,
        under18: true,
      },
      confirmOptions: { yesNoDontKnow: "yes" as const },
    },
  ].forEach(({ scenario, fillInFieldsOptions, confirmOptions }) => {
    test(`Amend the following Child details: firstname, lastname, date of birth, gender - ${scenario} @regression`, async ({
      courtAdminStoke,
    }): Promise<void> => {
      const { summaryPage, amendChildDetails } = courtAdminStoke;

      await summaryPage.chooseEventFromDropdown("Amend Child details");

      await amendChildDetails.page1.assertPageContents();
      await amendChildDetails.page1.fillInFields(fillInFieldsOptions);

      await amendChildDetails.page2.assertPageContents();
      await amendChildDetails.page2.fillInFields(confirmOptions);

      await amendChildDetails.submitPage.assertPageContents(
        ["caseProgression", "amendDetails", "amendChildDetails"],
        "amend-child-details",
      );
      await amendChildDetails.submitPage.clickSaveAndContinue();
    });
  });
});
