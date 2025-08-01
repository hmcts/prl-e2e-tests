import Config from "../../../../utils/config.utils.ts";
import { AmendChildDetails } from "../../../../journeys/manageCases/caseProgression/amendDetails/amendChildDetails.ts";
import { test } from "../../../fixtures.js";

test.use({ storageState: Config.sessionStoragePath + "courtAdminStoke.json" });

test.describe("Complete amend Child details event as a court admin", () => {
  let caseRef: string;

  test.beforeEach(async ({ browser, caseEventUtils }) => {
    caseRef = await caseEventUtils.createCACase(browser);
  });

  test(`Amend the following Child details: firstname, lastname, date of birth, gender @regression`, async ({
    page,
  }): Promise<void> => {
    await AmendChildDetails.amendChildDetails({
      page: page,
      accessibilityTest: false,
      c100ChildGender: "male",
      yesNoDontKnow: "yes",
      under18: true,
      caseRef: caseRef,
    });
  });
});
