import { Page } from "@playwright/test";
import { UserRole } from "../../../../common/types.ts";
import {
  WelshLanguageRequirements1Page,
  WelshPageRequirementType,
} from "../../../../pages/manageCases/createCase/C100/welshLanguageRequirements/welshLanguageRequirements1Page.ts";
import { SolicitorCreateInitial } from "../solicitorCreateInitial.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { WelshLanguageRequirementsSubmitPage } from "../../../../pages/manageCases/createCase/C100/welshLanguageRequirements/welshLanguageRequirementsSubmitPage.ts";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage.ts";

interface c100WelshLanguageRequirementsOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  WelshPageRequirementType: WelshPageRequirementType;
  yesNoWelshLanguage: boolean;
  subJourney: boolean;
}

export class C100WelshLanguageRequirements {
  public static async c100WelshLanguageRequirements({
    page: page,
    user: user,
    accessibilityTest: accessibilityTest,
    WelshPageRequirementType: WelshPageRequirementType,
    yesNoWelshLanguage: yesNoWelshLanguage,
    subJourney: subJourney,
  }: c100WelshLanguageRequirementsOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: user,
        accessibilityTest: false,
        solicitorCaseType: "C100",
        errorMessaging: false,
      });
    }
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
