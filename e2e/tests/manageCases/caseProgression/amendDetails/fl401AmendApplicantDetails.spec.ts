import { test } from "../../../fixtures";
import Config from "../../../../utils/config.utils";
import { Helpers } from "../../../../common/helpers";
import { AmendApplicantDetails } from "../../../../journeys/manageCases/caseProgression/amendDetails/amendApplicantDetails";

test.use({ storageState: Config.sessionStoragePath + "courtAdminStoke.json" });

test.describe("Complete amend applicant details event as a court admin for a DA case", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
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
    await AmendApplicantDetails.fl401AmendApplicantDetails({
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
