import { test } from "@playwright/test";
import { FL401TheHome } from "../../../../journeys/manageCases/createCase/FL401TheHome/fl401TheHome";

test.describe("FL401 Create cases The Home tests @manageCases", (): void => {
  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        applicant has child
        yes to all other booleans, 
        'No' to has the applicant or respondent ever lived at the address, 
        'No' do they ever intend to live at the address, @crossbrowserManagecases`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: true,
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "No",
      fl401IntendToLiveAtAddress: "No",
      subJourney: true,
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        applicant has child
        yes to all other booleans, 
        'No' to has the applicant or respondent ever lived at the address, 
        'Yes, the Applicant' do they ever intend to live at the address`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: true,
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "No",
      fl401IntendToLiveAtAddress: "yesApplicant",
      subJourney: true,
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        applicant has child
        yes to all other booleans, 
        'No' to has the applicant or respondent ever lived at the address, 
        'Yes, the Respondent' do they ever intend to live at the address`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: true,
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "No",
      fl401IntendToLiveAtAddress: "yesRespondent",
      subJourney: true,
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        applicant has child
        yes to all other booleans, 
        'No' to has the applicant or respondent ever lived at the address, 
        'Yes, Both of them' do they ever intend to live at the address`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: true,
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "No",
      fl401IntendToLiveAtAddress: "yesBothOfThem",
      subJourney: true,
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        applicant has child
        yes to all other booleans, 
        'Yes, the applicant' to has the applicant or respondent ever lived at the address`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: true,
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "yesApplicant",
      subJourney: true,
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        applicant has child
        yes to all other booleans, 
        'Yes, the respondent' to has the applicant or respondent ever lived at the address`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: true,
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "yesRespondent",
      subJourney: true,
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        applicant has child
        yes to all other booleans, 
        'Yes, both of them' to has the applicant or respondent ever lived at the address`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: true,
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "yesBothOfThem",
      subJourney: true,
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        Applicant doesn't have children
        No to all booleans, 
        'No' to has the applicant or respondent ever lived at the address, 
        'No' do they ever intend to live at the address, @crossbrowserManagecases`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: false,
      fl401TheHomeYesNo: false,
      fl401EverLivedAtAddress: "No",
      fl401IntendToLiveAtAddress: "No",
      subJourney: true,
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        applicant doesn't have children
        no to all other booleans, 
        'Yes, both of them' to has the applicant or respondent ever lived at the address`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: true,
      fl401TheHomeYesNo: false,
      fl401EverLivedAtAddress: "yesBothOfThem",
      subJourney: true,
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        Applicant doesn't have children
        No to all booleans, 
        'Yes the applicant' to has the applicant or respondent ever lived at the address`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: false,
      fl401TheHomeYesNo: false,
      fl401EverLivedAtAddress: "yesApplicant",
      subJourney: true,
    });
  });
});

test(`Test the accessibility of the fl401 The Home Journey saying No to all, @accessibilityManageCases`, async ({
  page,
}): Promise<void> => {
  await FL401TheHome.fl401TheHome({
    page: page,
    accessibilityTest: true,
    applicantHasChildren: false,
    fl401TheHomeYesNo: false,
    fl401EverLivedAtAddress: "No",
    fl401IntendToLiveAtAddress: "No",
    subJourney: true,
  });
});

test(`Test the accessibility of the fl401 The Home Journey saying yes to all, @accessibilityManageCases`, async ({
  page,
}): Promise<void> => {
  await FL401TheHome.fl401TheHome({
    page: page,
    accessibilityTest: true,
    applicantHasChildren: true,
    fl401TheHomeYesNo: true,
    fl401EverLivedAtAddress: "yesApplicant",
    fl401IntendToLiveAtAddress: "yesRespondent",
    subJourney: true,
  });
});
