import { test } from "../../../fixtures.ts";
import Config from "../../../../utils/config.utils.ts";
import { AmendApplicantDetails } from "../../../../journeys/manageCases/caseProgression/amendDetails/amendApplicantDetails.ts";
import config from "../../../../utils/config.utils.ts";

test.use({ storageState: Config.sessionStoragePath + "courtAdminStoke.json" });

test.describe("Complete amend applicant details event as a court admin for a DA case", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  test(`Amend the following applicant details: name, date of birth, gender,
  live in a refuge: yes,
  whether to keep details confidential: yes to all.
  Accessibility testing: Yes. @nightly @regression @accessibility`, async ({
    page,
  }): Promise<void> => {
    await AmendApplicantDetails.fl401AmendApplicantDetails({
      page,
      accessibilityTest: true,
      ccdRef: caseRef,
      nameChange: true,
      dobChange: true,
      genderChange: true,
      gender: "male",
      liveInRefuge: true,
      changeApplicantAddress: true,
      keepDetailsConfidential: true,
      solicitorDetailsChange: true,
      snapshotPath: ["caseProgression", "amendDetails", "FL401"],
      snapshotName: "fl401-amend-applicant-details",
    });
  });
});
