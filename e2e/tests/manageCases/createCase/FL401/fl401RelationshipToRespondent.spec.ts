import { test } from "@playwright/test";
import {
  FL401RelationshipToRespondent
} from "../../../../journeys/manageCases/createCase/FL401RelationshipToRespondent/FL401RelationshipToRespondent";

test.describe("FL401 Create case relationship to respondent tests @manageCases", (): void => {
  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'Married or in a civil partnership', @crossbrowserManageCases`, async ({
      page,
    }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "Married or in a civil partnership",
      subJourney: true
    })
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
      relationshipToRespondent: "Formerly married or in a civil partnership",
      subJourney: true
    })
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
      relationshipToRespondent: "Engaged or proposed civil partnership",
      subJourney: true
    })
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
      relationshipToRespondent: "Formerly engaged or proposed civil partnership",
      subJourney: true
    })
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
      relationshipToRespondent: "Live together as a couple",
      subJourney: true
    })
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
      relationshipToRespondent: "Formerly lived together as a couple",
      subJourney: true
    })
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
      relationshipToRespondent: "Boyfriend, girlfriend or partner who does not live with them",
      subJourney: true
    })
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
      relationshipToRespondent: "Formerly boyfriend, girlfriend or partner who has not lived with them",
      subJourney: true
    })
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
      relationshipToRespondent: "None of the above",
      relationshipToRespondentOther: 'Father',
      subJourney: true
    })
  });
  
  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Mother'`, async ({
    page,
   }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "None of the above",
      relationshipToRespondentOther: 'Mother',
      subJourney: true
    })
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Son'`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "None of the above",
      relationshipToRespondentOther: 'Son',
      subJourney: true
    })
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Daughter'`, async ({
      page,
     }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "None of the above",
      relationshipToRespondentOther: 'Daughter',
      subJourney: true
    })
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Brother'`, async ({
     page,
    }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "None of the above",
      relationshipToRespondentOther: 'Brother',
      subJourney: true
    })
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Sister'`, async ({
    page,
   }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "None of the above",
      relationshipToRespondentOther: 'Sister',
      subJourney: true
    })
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Grandfather'`, async ({
         page,
        }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "None of the above",
      relationshipToRespondentOther: 'Grandfather',
      subJourney: true
    })
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Grandmother'`, async ({
   page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "None of the above",
      relationshipToRespondentOther: 'Grandmother',
      subJourney: true
    })
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Uncle'`, async ({
   page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "None of the above",
      relationshipToRespondentOther: 'Uncle',
      subJourney: true
    })
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Aunt'`, async ({
  page,
 }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "None of the above",
      relationshipToRespondentOther: 'Aunt',
      subJourney: true
    })
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Nephew'`, async ({
    page,
   }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "None of the above",
      relationshipToRespondentOther: 'Nephew',
      subJourney: true
    })
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Niece'`, async ({
   page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "None of the above",
      relationshipToRespondentOther: 'Niece',
      subJourney: true
    })
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Cousin'`, async ({
    page,
   }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "None of the above",
      relationshipToRespondentOther: 'Cousin',
      subJourney: true
    })
  });

  test(`Complete the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Other'`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      relationshipToRespondent: "None of the above",
      relationshipToRespondentOther: 'Other',
      subJourney: true
    })
  });

  test(`Check the errors of the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Relationship is 'Formerly lived together as a couple', @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      relationshipToRespondent: "Formerly lived together as a couple",
      subJourney: true
    })
  });

  test(`Check the errors of the FL401 relationship to respondent event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Relationship is 'None of the above',
  Other Relationship Is: 'Other'`, async ({
    page,
  }): Promise<void> => {
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      relationshipToRespondent: "None of the above",
      relationshipToRespondentOther: 'Other',
      subJourney: true
    })
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
    relationshipToRespondent: "Formerly boyfriend, girlfriend or partner who has not lived with them",
    subJourney: true
  })
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
    relationshipToRespondent: "None of the above",
    relationshipToRespondentOther: 'Father',
    subJourney: true
  })
});