import { test } from "@playwright/test";
import Config from "../../../../config";
import { C100WelshLanguageRequirements } from "../../../../journeys/manageCases/createCase/C100welshLanguageRequirements/C100welshLanguageRequirements";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case Welsh Language Requirements Tests", (): void => {
  test(`Complete the C100 Create case Welsh Language Requirements as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  WelshPageRequirementType is no. @regression @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100WelshLanguageRequirements.c100WelshLanguageRequirements({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      WelshPageRequirementType: "no",
      yesNoWelshLanguage: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 Create case Welsh Language Requirements as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  WelshPageRequirementType is English. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100WelshLanguageRequirements.c100WelshLanguageRequirements({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      WelshPageRequirementType: "english",
      yesNoWelshLanguage: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 Create case Welsh Language Requirements as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  WelshPageRequirementType is welsh. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100WelshLanguageRequirements.c100WelshLanguageRequirements({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      WelshPageRequirementType: "welsh",
      yesNoWelshLanguage: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 Create case Welsh Language Requirements as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  WelshPageRequirementType is no. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100WelshLanguageRequirements.c100WelshLanguageRequirements({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      WelshPageRequirementType: "no",
      yesNoWelshLanguage: false,
      subJourney: true,
    });
  });

  test(`Complete the C100 Create case Welsh Language Requirements as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  WelshPageRequirementType is English. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100WelshLanguageRequirements.c100WelshLanguageRequirements({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      WelshPageRequirementType: "english",
      yesNoWelshLanguage: false,
      subJourney: true,
    });
  });

  test(`Complete the C100 Create case Welsh Language Requirements as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  WelshPageRequirementType is welsh. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100WelshLanguageRequirements.c100WelshLanguageRequirements({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      WelshPageRequirementType: "welsh",
      yesNoWelshLanguage: false,
      subJourney: true,
    });
  });
});

test(`Complete the C100 Create case Welsh Language Requirements as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  WelshPageRequirementType is welsh. @accessibility`, async ({
  page,
}): Promise<void> => {
  await C100WelshLanguageRequirements.c100WelshLanguageRequirements({
    page: page,
    user: "solicitor",
    accessibilityTest: true,
    WelshPageRequirementType: "english",
    yesNoWelshLanguage: true,
    subJourney: true,
  });
});
