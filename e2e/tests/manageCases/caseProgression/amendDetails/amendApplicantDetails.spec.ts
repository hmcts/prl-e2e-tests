import { test } from "@playwright/test";
import Config from "../../../../config";
import config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { Helpers } from "../../../../common/helpers";
import { AmendApplicantDetails } from "../../../../journeys/manageCases/caseProgression/amendDetails/amendApplicantDetails.ts";

test.use({ storageState: Config.sessionStoragePath + "courtAdminStoke.json" });

test.describe("Complete amend applicant details event as a court admin", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test(`Amend the following applicant details: name, date of birth, gender,
  live in a refuge: yes,
  whether to keep details confidential: yes to all.
  Accessibility testing: Yes. @nightly @regression @accessibility`, async ({
    page,
  }): Promise<void> => {
    await AmendApplicantDetails.amendApplicantDetails({
      page,
      accessibilityTest: true,
      ccdRef: ccdRef,
      nameChange: true,
      dobChange: true,
      genderChange: true,
      gender: "male",
      liveInRefuge: true,
      changeApplicantAddress: true,
      keepDetailsConfidential: true,
      solicitorDetailsChange: true,
    });
  });
});
