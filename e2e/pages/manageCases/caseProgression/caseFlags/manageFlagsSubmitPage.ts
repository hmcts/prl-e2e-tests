import { Page } from "@playwright/test";
import {
  solicitorCaseCreateType,
  SupportType,
} from "../../../../common/types.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { ManageFlagsSubmitContent } from "../../../../fixtures/manageCases/caseProgression/caseFlags/manageFlagsSubmitContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";

export class ManageFlagsSubmitPage {
  public static async manageFlagsSubmitPage(
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
        hasText: ManageFlagsSubmitContent.headingH2,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ManageFlagsSubmitContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        ManageFlagsSubmitContent,
        `govUkSummaryListKey`,
        `${Selectors.GovukSummaryListKey}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${ManageFlagsSubmitContent.govUkSummaryListValue}")`,
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
        `${Selectors.GovukSummaryListValue}:text-is("${ManageFlagsSubmitContent.c100GovUkSummaryListValue}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${ManageFlagsSubmitContent.fl401GovUkSummaryListValue}")`,
        1,
      );
    }
    if (supportType === "reasonableAdjustment") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:has-text("${ManageFlagsSubmitContent.govUkSummaryListValueReasonableAdjustment}")`,
        1,
      );
    }
    if (isApproved) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${ManageFlagsSubmitContent.govUkSummaryListValueApproved}")`,
        1,
      );
      if (supportType === "languageInterpreter") {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukSummaryListValue}:has-text("${ManageFlagsSubmitContent.govUkSummaryListValueLanguageInterpreterApproved}")`,
          1,
        );
      }
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${ManageFlagsSubmitContent.govUkSummaryListValueNotApproved}")`,
        1,
      );
      if (supportType === "languageInterpreter") {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukSummaryListValue}:has-text("${ManageFlagsSubmitContent.govUkSummaryListValueLanguageInterpreterNotApproved}")`,
          1,
        );
      }
    }
    if (withTranslation) {
      await Promise.all([
        Helpers.checkGroup(
          page,
          2,
          ManageFlagsSubmitContent,
          `welshTranslationGovUkSummaryListKey`,
          `${Selectors.GovukSummaryListKey}`,
        ),
        Helpers.checkGroup(
          page,
          2,
          ManageFlagsSubmitContent,
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
