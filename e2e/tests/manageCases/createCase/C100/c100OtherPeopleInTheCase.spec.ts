import { Page, test } from "@playwright/test";
import { C100OtherPeopleInTheCase } from "../../../../journeys/manageCases/createCase/C100OtherPeopleInTheCase/C100OtherPeopleInTheCase";


test.describe("C100 Create case Other people in the case Tests @manageCases", (): void => {
  test(`Complete the C100 Create case Other people in the case as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100OtherPeopleInTheCase.c100OtherPeopleInTheCase({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoOtherPeopleInTheCase: true,
      applicantGender: "male",
      subJourney: true
    })
  });
});
