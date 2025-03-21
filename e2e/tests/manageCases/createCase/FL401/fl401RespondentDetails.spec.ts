import { test } from "@playwright/test";
import Config from "../../../../config";
import { FL401RespondentDetails } from "../../../../journeys/manageCases/createCase/FL401RespondentDetails/FL401RespondentDetails";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";
import { FL401ApplicantDetails } from "../../../../journeys/manageCases/createCase/FL401ApplicantDetails/FL401ApplicantDetails.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Create case respondent details tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "FL401",
    });
    //need to complete the applicant details event before the respondent details event
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoFL401ApplicantDetails: false,
      applicantGender: "male",
    });
  });
  test(`Complete the FL401 respondent details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options, @regression`, async ({ page }): Promise<void> => {
    await FL401RespondentDetails.fl401RespondentDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      respondentDetailsAllOptionsYes: true,
    });
  });

  test(`Complete the FL401 respondent details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options, @regression`, async ({ page }): Promise<void> => {
    await FL401RespondentDetails.fl401RespondentDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      respondentDetailsAllOptionsYes: false,
    });
  });

  test(`Complete the FL401 respondent details event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options, @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await FL401RespondentDetails.fl401RespondentDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      respondentDetailsAllOptionsYes: true,
    });
  });

  test(`FL401 respondent details event as a solicitor with the following options:
    Accessibility testing,
    Not Error message testing,
  Saying yes to all options, @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await FL401RespondentDetails.fl401RespondentDetails({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      respondentDetailsAllOptionsYes: true,
    });
  });
});
