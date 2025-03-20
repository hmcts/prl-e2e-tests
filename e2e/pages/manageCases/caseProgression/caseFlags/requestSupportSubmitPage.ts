import { Page } from "@playwright/test";
import {
  solicitorCaseCreateType,
  SupportType,
} from "../../../../common/types.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { RequestSupportSubmitContent } from "../../../../fixtures/manageCases/caseProgression/caseFlags/requestSupportSubmitContent.ts";
import { Helpers } from "../../../../common/helpers.ts";

export class RequestSupportSubmitPage {
  public static async requestSupportSubmitPage(
    page: Page,
    caseType: solicitorCaseCreateType,
    supportType: SupportType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, caseType, supportType, accessibilityTest);
    await this.submit(page);
  }

  private static async checkPageLoads(
    page: Page,
    caseType: solicitorCaseCreateType,
    supportType: SupportType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.headingH2, {
        hasText: RequestSupportSubmitContent.headingH2,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${RequestSupportSubmitContent.govUKHeadingL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        RequestSupportSubmitContent,
        `govUkSummaryListKey`,
        `${Selectors.GovukSummaryListKey}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        RequestSupportSubmitContent,
        `govUkSummaryListValue`,
        `${Selectors.GovukSummaryListValue}`,
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
    if (supportType === "reasonableAdjustment") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${RequestSupportSubmitContent.govUkSummaryListValueReasonableAdjustmentSupportType}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${RequestSupportSubmitContent.govUkSummaryListValueLanguageInterpreterSupportType}")`,
        1,
      );
    }
    if (caseType === "C100") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${RequestSupportSubmitContent.c100GovUkSummaryListValue}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${RequestSupportSubmitContent.fl401GovUkSummaryListValue}")`,
        1,
      );
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
