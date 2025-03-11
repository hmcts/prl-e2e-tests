import { test } from "@playwright/test";
import { FL401RelationshipToRespondent } from "../../../../journeys/manageCases/createCase/FL401RelationshipToRespondent/FL401RelationshipToRespondent";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.describe("FL401 Create case relationship to respondent tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "FL401",
    });
  });
  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'Married or in a civil partnership', @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "marriedOrCivil", // Changed here
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'Formerly married or in a civil partnership' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "formerlyMarriedOrCivil", // Changed here
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'Engaged or proposed civil partnership' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "engagedOrProposed", // Changed here
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'Formerly engaged or proposed civil partnership' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "formerlyEngagedOrProposed", // Changed here
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'Live together as a couple' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "liveTogether", // Changed here
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'Formerly lived together as a couple' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "foremerlyLivedTogether", // Changed here
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'Boyfriend, girlfriend or partner who does not live with them' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "bfGfOrPartnerNotLivedTogether", // Changed here
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'Formerly boyfriend, girlfriend or partner who has not lived with them' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "formerBfGfOrPartnerNotLivedTogether", // Changed here
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Father', @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Father",
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Mother' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Mother",
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Son' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Son",
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Daughter' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Daughter",
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Brother' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Brother",
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Sister' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Sister",
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Grandfather' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Grandfather",
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Grandmother' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Grandmother",
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Uncle' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Uncle",
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Aunt' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Aunt",
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Nephew' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Nephew",
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Niece' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Niece",
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Cousin' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Cousin",
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Other' @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Other",
    });
  });

  test(`Check the errors of the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Relationship is 'Formerly lived together as a couple', @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      relationshipToRespondent: "foremerlyLivedTogether",
    });
  });

  test(`Check the errors of the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Other' @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Other",
    });
  });

  test(`FL401 relationship to respondent event as a solicitor with the following options:
    Accessibility testing,
    Not Error message testing,
    Relationship is 'Formerly boyfriend, girlfriend or partner who has not lived with them', @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      relationshipToRespondent: "bfGfOrPartnerNotLivedTogether",
    });
  });

  test(`FL401 relationship to respondent event as a solicitor with the following options:
    Accessibility testing,
    Not Error message testing,
    Relationship is 'None of the above',
    Other Relationship Type is: 'Father', @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Father",
    });
  });
});