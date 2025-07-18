import { Browser, Page } from "@playwright/test";
import {
  solicitorCaseCreateType,
  SupportType,
} from "../../../../common/types.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { ManageFlagsSelectCaseFlagPage } from "../../../../pages/manageCases/caseProgression/caseFlags/manageFlagsSelectCaseFlagPage.ts";
import { ManageFlagsUpdateCaseFlagPage } from "../../../../pages/manageCases/caseProgression/caseFlags/manageFlagsUpdateCaseFlagPage.ts";
import { ManageFlagsAddTranslationsPage } from "../../../../pages/manageCases/caseProgression/caseFlags/manageFlagsAddTranslationsPage.ts";
import { Selectors } from "../../../../common/selectors.ts";

interface ManageFlagsParams {
  browser: Browser;
  caseRef: string;
  caseType: solicitorCaseCreateType;
  supportType: SupportType;
  isApproved: boolean;
  withTranslation: boolean;
  accessibilityTest: boolean;
}

// manage solicitor requested case flags
export class ManageFlagsCA {
  public static async manageFlagsCA({
    browser,
    caseRef,
    caseType,
    supportType,
    isApproved,
    withTranslation,
    accessibilityTest,
  }: ManageFlagsParams): Promise<void> {
    const page: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      page,
      "Review RA request",
      "Review RA request",
    );
    await ManageFlagsSelectCaseFlagPage.manageFlagsSelectCaseFlagPage(
      page,
      caseType,
      supportType,
      accessibilityTest,
    );
    await ManageFlagsUpdateCaseFlagPage.manageFlagsUpdateCaseFlagPage(
      page,
      supportType,
      isApproved,
      withTranslation,
      accessibilityTest,
      caseType,
    );
    if (withTranslation) {
      await ManageFlagsAddTranslationsPage.manageFlagsAddTranslationsPage(
        page,
        accessibilityTest,
        caseType,
      );
      await this.checkCaseFlagsTab(page, supportType, isApproved);
    }
  }

  private static async checkCaseFlagsTab(
    page: Page,
    supportType: SupportType,
    isApproved: boolean,
  ): Promise<void> {
    await Helpers.clickTab(page, "Case Flags");
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: "Case flags",
      })
      .waitFor();
    let rowFlagText: string = "Documents in a specified colour";
    if (supportType === "languageInterpreter") {
      rowFlagText = "Language Interpreter";
    }
    if (isApproved) {
      await page
        .getByRole("row", { name: rowFlagText })
        .getByText("ACTIVE")
        .isVisible();
    } else {
      await page
        .getByRole("row", { name: rowFlagText })
        .getByText("NOT APPROVED")
        .isVisible();
    }
  }
}
