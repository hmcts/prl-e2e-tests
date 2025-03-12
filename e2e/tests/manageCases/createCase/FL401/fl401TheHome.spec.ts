import { test } from "@playwright/test";
import { FL401TheHome } from "../../../../journeys/manageCases/createCase/FL401TheHome/fl401TheHome";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.describe("FL401 Create cases The Home tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "FL401",
    });
  });
  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        applicant has child
        yes to all other booleans, 
        'No' to has the applicant or respondent ever lived at the address, 
        'No' do they ever intend to live at the address, @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: true,
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "No",
      fl401IntendToLiveAtAddress: "No",
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        applicant has child
        yes to all other booleans, 
        'No' to has the applicant or respondent ever lived at the address, 
        'Yes, the Applicant' do they ever intend to live at the address @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: true,
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "No",
      fl401IntendToLiveAtAddress: "yesApplicant",
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        applicant has child
        yes to all other booleans, 
        'No' to has the applicant or respondent ever lived at the address, 
        'Yes, the Respondent' do they ever intend to live at the address @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: true,
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "No",
      fl401IntendToLiveAtAddress: "yesRespondent",
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        applicant has child
        yes to all other booleans, 
        'No' to has the applicant or respondent ever lived at the address, 
        'Yes, Both of them' do they ever intend to live at the address @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: true,
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "No",
      fl401IntendToLiveAtAddress: "yesBothOfThem",
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        applicant has child
        yes to all other booleans, 
        'Yes, the applicant' to has the applicant or respondent ever lived at the address @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: true,
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "yesApplicant",
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        applicant has child
        yes to all other booleans, 
        'Yes, the respondent' to has the applicant or respondent ever lived at the address @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: true,
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "yesRespondent",
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        applicant has child
        yes to all other booleans, 
        'Yes, both of them' to has the applicant or respondent ever lived at the address @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: true,
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "yesBothOfThem",
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        Applicant doesn't have children
        No to all options, @regression`, async ({ page }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: false,
      fl401TheHomeYesNo: false,
      fl401EverLivedAtAddress: "No",
      fl401IntendToLiveAtAddress: "No",
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        applicant doesn't have children
        no to all other booleans, 
        'Yes, both of them' to has the applicant or respondent ever lived at the address @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: true,
      fl401TheHomeYesNo: false,
      fl401EverLivedAtAddress: "yesBothOfThem",
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        Applicant doesn't have children
        No to all booleans, 
        'Yes the applicant' to has the applicant or respondent ever lived at the address @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: false,
      fl401TheHomeYesNo: false,
      fl401EverLivedAtAddress: "yesApplicant",
    });
  });

  test(`Complete the FL401 The Home Journey with the following options:
          Accessibility testing, 
          Applicant has children
          Yes to all booleans, 
          'Yes the applicant' to has the applicant or respondent ever lived at the address @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: true,
      applicantHasChildren: true,
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "yesApplicant",
      fl401IntendToLiveAtAddress: "yesRespondent",
    });
  });
});
