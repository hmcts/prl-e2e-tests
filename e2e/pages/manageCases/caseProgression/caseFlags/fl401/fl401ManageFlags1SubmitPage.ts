import { Page } from "@playwright/test";
import {
  solicitorCaseCreateType,
  SupportType,
} from "../../../../../common/types.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Fl401ManageFlags1SubmitContent } from "../../../../../fixtures/manageCases/caseProgression/caseFlags/fl401/fl401ManageFlags1SubmitContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";

export class Fl401ManageFlags1SubmitPage {
  public static async fl401ManageFlags1SubmitPage(
    page: Page,
    caseType: solicitorCaseCreateType,
    supportType: SupportType,
    isApproved: boolean,
    withTranslation: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(
      page,
      caseType,
      supportType,
      isApproved,
      withTranslation,
      accessibilityTest,
    );
    await this.submit(page);
  }

  private static async checkPageLoads(
    page: Page,
    caseType: solicitorCaseCreateType,
    supportType: SupportType,
    isApproved: boolean,
    withTranslation: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.headingH2, {
        hasText: Fl401ManageFlags1SubmitContent.headingH2,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${Fl401ManageFlags1SubmitContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        Fl401ManageFlags1SubmitContent,
        `govUkSummaryListKey`,
        `${Selectors.GovukSummaryListKey}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${Fl401ManageFlags1SubmitContent.govUkSummaryListValue}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
    ]);
    if (caseType === "C100") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${Fl401ManageFlags1SubmitContent.c100GovUkSummaryListValue}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${Fl401ManageFlags1SubmitContent.fl401GovUkSummaryListValue}")`,
        1,
      );
    }
    if (supportType === "reasonableAdjustment") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:has-text("${Fl401ManageFlags1SubmitContent.govUkSummaryListValueReasonableAdjustment}")`,
        1,
      );
    }
    if (isApproved) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${Fl401ManageFlags1SubmitContent.govUkSummaryListValueApproved}")`,
        1,
      );
      if (supportType === "languageInterpreter") {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukSummaryListValue}:has-text("${Fl401ManageFlags1SubmitContent.govUkSummaryListValueLanguageInterpreterApproved}")`,
          1,
        );
      }
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${Fl401ManageFlags1SubmitContent.govUkSummaryListValueNotApproved}")`,
        1,
      );
      if (supportType === "languageInterpreter") {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukSummaryListValue}:has-text("${Fl401ManageFlags1SubmitContent.govUkSummaryListValueLanguageInterpreterNotApproved}")`,
          1,
        );
      }
    }
    if (withTranslation) {
      await Promise.all([
        Helpers.checkGroup(
          page,
          2,
          Fl401ManageFlags1SubmitContent,
          `welshTranslationGovUkSummaryListKey`,
          `${Selectors.GovukSummaryListKey}`,
        ),
        Helpers.checkGroup(
          page,
          2,
          Fl401ManageFlags1SubmitContent,
          `welshTranslationGovUkSummaryListValue`,
          `${Selectors.GovukSummaryListValue}`,
        ),
      ]);
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async submit(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
