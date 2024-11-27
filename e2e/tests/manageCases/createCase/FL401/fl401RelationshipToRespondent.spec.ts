import { test } from "@playwright/test";
import { FL401RelationshipToRespondent } from "../../../../journeys/manageCases/createCase/FL401RelationshipToRespondent/FL401RelationshipToRespondent";
import Config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Create case relationship to respondent tests @manageCases", (): void => {
  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'Married or in a civil partnership', @crossbrowserManageCases @manageCasesNightlyPipeline`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "marriedOrCivil", // Changed here
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'Formerly married or in a civil partnership'`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "formerlyMarriedOrCivil", // Changed here
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'Engaged or proposed civil partnership'`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "engagedOrProposed", // Changed here
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'Formerly engaged or proposed civil partnership'`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "formerlyEngagedOrProposed", // Changed here
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'Live together as a couple'`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "liveTogether", // Changed here
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'Formerly lived together as a couple'`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "foremerlyLivedTogether", // Changed here
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'Boyfriend, girlfriend or partner who does not live with them'`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "bfGfOrPartnerNotLivedTogether", // Changed here
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'Formerly boyfriend, girlfriend or partner who has not lived with them'`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "formerBfGfOrPartnerNotLivedTogether", // Changed here
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Father', @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Father",
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Mother'`, async ({ page }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Mother",
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Son'`, async ({ page }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Son",
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Daughter'`, async ({ page }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Daughter",
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Brother'`, async ({ page }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Brother",
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Sister'`, async ({ page }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Sister",
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Grandfather'`, async ({ page }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Grandfather",
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Grandmother'`, async ({ page }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Grandmother",
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Uncle'`, async ({ page }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Uncle",
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Aunt'`, async ({ page }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Aunt",
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Nephew'`, async ({ page }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Nephew",
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Niece'`, async ({ page }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Niece",
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Cousin'`, async ({ page }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Cousin",
      subJourney: true,
    });
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Other'`, async ({ page }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Other",
      subJourney: true,
    });
  });

  test(`Check the errors of the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Relationship is 'Formerly lived together as a couple', @crossbrowserManageCases @errorMessageManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      relationshipToRespondent: "foremerlyLivedTogether",
      subJourney: true,
    });
  });

  test(`Check the errors of the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Other' @errorMessageManageCases`, async ({ page }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Other",
      subJourney: true,
    });
  });
});

test(`Accessibility test the FL401 relationship to respondent event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Relationship is 'Formerly boyfriend, girlfriend or partner who has not lived with them', @accessibilityManageCases`, async ({
  page,
}): Promise<void> => {
  await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    relationshipToRespondent: "bfGfOrPartnerNotLivedTogether",
    subJourney: true,
  });
});

test(`Accessibility test the FL401 relationship to respondent event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Type is: 'Father', @accessibilityManageCases`, async ({
  page,
}): Promise<void> => {
  await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    relationshipToRespondent: "noneOfTheAbove",
    relationshipToRespondentOther: "Father",
    subJourney: true,
  });
});
