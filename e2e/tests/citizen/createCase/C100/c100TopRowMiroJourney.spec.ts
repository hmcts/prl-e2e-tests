import { test } from "@playwright/test";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";
import Config from "../../../../config";
import IdamLoginHelper from "../../../../common/idamLoginHelper";

test.describe("C100 Citizen Application tests on the top MIRO set. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
  test.beforeEach(async ({ page }) => {
    // Sign in as a citizen user before each test
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
  });
  test(`Test the C100 of the citizen journey with the following options:
    Not Accessibility Testing,
    Not Error Messaging,
    Yes Screening and Written Review
    With urgency and without notice all options yes
    People gender male, People option all options yes`, async ({
    page,
  }): Promise<void> => {
    await C100.c100TopMiroJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      c100PeopleGender: "male",
      c100PeopleYesNoDontKnow: "yes",
    });
  });

  test(`Test the C100 of the citizen journey with the following options:
    Not Accessibility Testing,
    Error Messaging,
    Yes Screening and Written Review
    With urgency and without notice all options yes
    People gender female, People option all options yes`, async ({
    page,
  }): Promise<void> => {
    await C100.c100TopMiroJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      c100PeopleGender: "female",
      c100PeopleYesNoDontKnow: "yes",
    });
  });
});

test(`Test the C100 of the citizen journey with the following options:
    Accessibility Testing,
    Not Error Messaging,
    Yes Screening and Written Review
    With urgency and without notice all options yes
    People gender other, People option all options yes
    @accessibilityCitizenFrontend`, async ({ page }): Promise<void> => {
  await C100.c100TopMiroJourney({
    page: page,
    accessibilityTest: false,
    errorMessaging: true,
    urgencyAndWithoutNoticeAllOptionsYes: true,
    c100PeopleGender: "other",
    c100PeopleYesNoDontKnow: "yes",
  });
});
