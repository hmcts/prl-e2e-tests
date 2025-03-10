import { Page } from "@playwright/test";
import {
  WelshLanguageRequirements1Page,
  WelshPageRequirementType,
} from "../../../../pages/manageCases/createCase/C100/welshLanguageRequirements/welshLanguageRequirements1Page";
import { Helpers } from "../../../../common/helpers";
import { WelshLanguageRequirementsSubmitPage } from "../../../../pages/manageCases/createCase/C100/welshLanguageRequirements/welshLanguageRequirementsSubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

interface c100WelshLanguageRequirementsOptions {
  page: Page;
  accessibilityTest: boolean;
  WelshPageRequirementType: WelshPageRequirementType;
  yesNoWelshLanguage: boolean;
}

export class C100WelshLanguageRequirements {
  public static async c100WelshLanguageRequirements({
    page: page,
    accessibilityTest: accessibilityTest,
    WelshPageRequirementType: WelshPageRequirementType,
    yesNoWelshLanguage: yesNoWelshLanguage,
  }: c100WelshLanguageRequirementsOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(
      page,
      "Welsh language requirements",
    );
    await WelshLanguageRequirements1Page.welshLanguageRequirements1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      WelshPageRequirementType: WelshPageRequirementType,
      yesNoWelshLanguage: yesNoWelshLanguage,
    });
    await WelshLanguageRequirementsSubmitPage.welshLanguageRequirementsSubmitPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        WelshPageRequirementType: WelshPageRequirementType,
        yesNoWelshLanguage: yesNoWelshLanguage,
      },
    );
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
