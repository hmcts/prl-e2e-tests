import { test } from "@playwright/test";
import { FL401WelshLanguageRequirements } from "../../../../journeys/manageCases/createCase/FL401WelshLanguageRequirements/FL401WelshLanguageRequirements";

test.describe("FL401 Create case welsh language requirements tests @manageCases", (): void => {
  test(`Complete the FL401 welsh language requirements event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options, 
  Selecting English, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401WelshLanguageRequirements.fl401WelshLanguageRequirements({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      welshLanguageRequirementsAllOptionsYes: true,
      welshLanguageRequirementsSelectWelsh: false,
      subJourney: true,
    });
  });

  test(`Complete the FL401 welsh language requirements event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options, 
  Selecting Welsh, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401WelshLanguageRequirements.fl401WelshLanguageRequirements({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      welshLanguageRequirementsAllOptionsYes: true,
      welshLanguageRequirementsSelectWelsh: true,
      subJourney: true,
    });
  });

  test(`Complete the FL401 welsh language requirements event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,`, async ({ page }): Promise<void> => {
    await FL401WelshLanguageRequirements.fl401WelshLanguageRequirements({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      welshLanguageRequirementsAllOptionsYes: false,
      subJourney: true,
    });
  });

  test(`Complete the FL401 welsh language requirements event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options, 
  Selecting English, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401WelshLanguageRequirements.fl401WelshLanguageRequirements({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      welshLanguageRequirementsAllOptionsYes: true,
      welshLanguageRequirementsSelectWelsh: false,
      subJourney: true,
    });
  });
});

test(`Accessibility test the FL401 welsh language requirements event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options, 
  Selecting English, @accessibilityManageCases`, async ({
  page,
}): Promise<void> => {
  await FL401WelshLanguageRequirements.fl401WelshLanguageRequirements({
    page: page,
    accessibilityTest: false,
    errorMessaging: false,
    welshLanguageRequirementsAllOptionsYes: true,
    welshLanguageRequirementsSelectWelsh: false,
    subJourney: true,
  });
});
