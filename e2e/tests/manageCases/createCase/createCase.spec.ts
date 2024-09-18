import { test } from "@playwright/test";
import { C100 } from "../../../journeys/manageCases/createCase/C100";
import { FL401 } from "../../../journeys/manageCases/createCase/FL401";

test.describe("Manage cases case solicitor create case tests. @manageCases", (): void => {
  test(`Complete the C100 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all hearing urgency questions,
  Saying yes to all applicant details questions with a male applicant @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100.c100({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoHearingUrgency: true,
      yesNoApplicantDetails: true,
      applicantGender: "male",
    });
  });

  test(`Complete the C100 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all hearing urgency questions,
  Saying no to all applicant details questions with a female applicant @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100.c100({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoHearingUrgency: false,
      yesNoApplicantDetails: false,
      applicantGender: "male",
    });
  });

  test(`Complete the FL401 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Male applicant,
  Saying yes to all Type of application questions
  Saying yes to applicant details questions
  Saying yes to all Respondent details questions,
  Relationship is 'Married or in a civil partnership', @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401.fl401({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      isLinkedToC100: true,
      respondentDetailsAllOptionsYes: true,
      yesNoFL401ApplicantDetails: true,
      applicantGender: "male",
      relationshipToRespondent: 'Married or in a civil partnership',
    });
  });

  test(`Complete the FL401 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Female applicant,
  Saying no to all Type of application questions
  Saying no to applicant details questions
  Saying no to all Respondent details questions,
  Relationship is 'None of the above',
  Other Relationship Is: 'Son', @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401.fl401({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      isLinkedToC100: false,
      respondentDetailsAllOptionsYes: false,
      yesNoFL401ApplicantDetails: false,
      applicantGender: "female",
      relationshipToRespondent: 'None of the above',
      relationshipToRespondentOther: 'Son'
    });
  });
});
