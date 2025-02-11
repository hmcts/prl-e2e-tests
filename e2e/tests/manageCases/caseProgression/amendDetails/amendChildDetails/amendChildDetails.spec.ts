import { test } from "@playwright/test";
import Config from "../../../../../config.ts";
import { AmendChildDetails } from "../../../../../journeys/manageCases/caseProgression/amendDetails/amendChildDetails/amendChildDetails.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Complete amend Child details event as a court admin", () => {
  test(`Amend the following Child details: firstname, lastname, date of birth, gender @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await AmendChildDetails.amendChildDetails({
      page: page,
      browser: browser,
      accessibilityTest: false,
      c100ChildGender: "male",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "yes",
    });
  });
});
