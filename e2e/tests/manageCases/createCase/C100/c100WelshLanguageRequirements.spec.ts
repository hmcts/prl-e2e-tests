import { test } from "@playwright/test";
import { C100WelshLanguageRequirements } from "../../../../journeys/manageCases/createCase/C100welshLanguageRequirements/C100welshLanguageRequirements";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.describe("C100 Create case Welsh Language Requirements Tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "C100",
    });
  });
  test(`Complete the C100 Create case Welsh Language Requirements as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  WelshPageRequirementType is no. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100WelshLanguageRequirements.c100WelshLanguageRequirements({
      page: page,
      accessibilityTest: false,
      WelshPageRequirementType: "no",
      yesNoWelshLanguage: true,
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
      accessibilityTest: false,
      WelshPageRequirementType: "english",
      yesNoWelshLanguage: true,
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
      accessibilityTest: false,
      WelshPageRequirementType: "welsh",
      yesNoWelshLanguage: true,
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
      accessibilityTest: false,
      WelshPageRequirementType: "no",
      yesNoWelshLanguage: false,
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
      accessibilityTest: false,
      WelshPageRequirementType: "english",
      yesNoWelshLanguage: false,
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
      accessibilityTest: false,
      WelshPageRequirementType: "welsh",
      yesNoWelshLanguage: false,
    });
  });
});

test(`Complete the C100 Create case Welsh Language Requirements as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  WelshPageRequirementType is welsh. @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await C100WelshLanguageRequirements.c100WelshLanguageRequirements({
    page: page,
    accessibilityTest: true,
    WelshPageRequirementType: "english",
    yesNoWelshLanguage: true,
  });
});
