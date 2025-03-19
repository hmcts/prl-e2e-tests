import { Browser, Page } from "@playwright/test";
import {
  solicitorCaseCreateType,
  SupportType,
} from "../../../../common/types.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../config.ts";
import { Fl401ManageFlags1SelectCaseFlagPage } from "../../../../pages/manageCases/caseProgression/caseFlags/fl401/fl401ManageFlags1SelectCaseFlagPage.ts";
import { Fl401ManageFlags1UpdateCaseFlagPage } from "../../../../pages/manageCases/caseProgression/caseFlags/fl401/fl401ManageFlags1UpdateCaseFlagPage.ts";
import { Fl401ManageFlags1SubmitPage } from "../../../../pages/manageCases/caseProgression/caseFlags/fl401/fl401ManageFlags1SubmitPage.ts";
import { Fl401ManageFlags1AddTranslationsPage } from "../../../../pages/manageCases/caseProgression/caseFlags/fl401/fl401ManageFlags1AddTranslationsPage.ts";
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
export class ManageFlags {
  public static async manageFlags({
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
    await Fl401ManageFlags1SelectCaseFlagPage.fl401ManageFlags1SelectCaseFlagPage(
      page,
      caseType,
      supportType,
      accessibilityTest,
    );
    await Fl401ManageFlags1UpdateCaseFlagPage.fl401ManageFlags1UpdateCaseFlagPage(
      page,
      supportType,
      isApproved,
      withTranslation,
      accessibilityTest,
    );
    if (withTranslation) {
      await Fl401ManageFlags1AddTranslationsPage.fl401ManageFlags1AddTranslationsPage(
        page,
        accessibilityTest,
      );
    }
    await Fl401ManageFlags1SubmitPage.fl401ManageFlags1SubmitPage(
      page,
      caseType,
      supportType,
      isApproved,
      withTranslation,
      accessibilityTest,
    );
    await this.checkCaseFlagsTab(page, supportType, isApproved);
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
