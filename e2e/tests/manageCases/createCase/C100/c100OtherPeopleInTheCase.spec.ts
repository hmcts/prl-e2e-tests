import { test } from "@playwright/test";
import { C100OtherPeopleInTheCase } from "../../../../journeys/manageCases/createCase/C100OtherPeopleInTheCase/C100OtherPeopleInTheCase";
import Config from "../../../../utils/config";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case Other people in the case Tests", (): void => {
  test(`Complete the C100 Create case Other people in the case as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options, 
  Setting the applicant Gender to male. @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100OtherPeopleInTheCase.c100OtherPeopleInTheCase({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: true,
      yesNoOtherPeopleInTheCase: true,
      otherPersonLivesInRefuge: true,
      applicantGender: "male",
      subJourney: true,
    });
  });
  test(`Complete the C100 Create case Other people in the case as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  Setting the applicant Gender to female. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100OtherPeopleInTheCase.c100OtherPeopleInTheCase({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoOtherPeopleInTheCase: false,
      otherPersonLivesInRefuge: false,
      applicantGender: "female",
      subJourney: true,
    });
  });
  test(`Complete the C100 Create case Other people in the case as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to other. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100OtherPeopleInTheCase.c100OtherPeopleInTheCase({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoOtherPeopleInTheCase: true,
      otherPersonLivesInRefuge: true,
      applicantGender: "other",
      subJourney: true,
    });
  });
  test(`Complete the C100 Create case Other people in the case as a solicitor with the following options:
    Not Accessibility testing,
    Not Error message testing,
    Saying yes to all options,
    Saying no for other person lives in refuge,
    Setting the applicant Gender to other. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100OtherPeopleInTheCase.c100OtherPeopleInTheCase({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoOtherPeopleInTheCase: true,
      otherPersonLivesInRefuge: false,
      applicantGender: "other",
      subJourney: true,
    });
  });
});

test(`Complete the C100 Create case Other people in the case as a solicitor with the following options:
  Accessibility testing,
  not Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await C100OtherPeopleInTheCase.c100OtherPeopleInTheCase({
    page: page,
    user: "solicitor",
    accessibilityTest: false,
    errorMessaging: false,
    yesNoOtherPeopleInTheCase: true,
    otherPersonLivesInRefuge: true,
    applicantGender: "male",
    subJourney: true,
  });
});
