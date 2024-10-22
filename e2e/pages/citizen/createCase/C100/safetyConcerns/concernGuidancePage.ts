import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import {
  ConcernGuidanceContent
} from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/concernGuidanceContent";
import { Helpers } from "../../../../../common/helpers";

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface ConcernGuidancePageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class ConcernGuidancePage {
  public static async concernGuidancePage({
    page,
    accessibilityTest
  }: ConcernGuidancePageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest
    });
    await this.fillInFields(page)
  }

  private static async checkPageLoads({
    page,
    accessibilityTest
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ConcernGuidanceContent.pageTitle}")`
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyL}:text-is("${ConcernGuidanceContent.bodyL}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ConcernGuidanceContent.span}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ConcernGuidanceContent.strong}")`,
        1
      ),
      Helpers.checkGroup(
        page,
        15,
        ConcernGuidanceContent,
        'body',
        `${Selectors.GovukBody}`
      ),
      Helpers.checkGroup(
        page,
        3,
        ConcernGuidanceContent,
        'headingM',
        `${Selectors.GovukHeadingM}`
      ),
      Helpers.checkGroup(
        page,
        6,
        ConcernGuidanceContent,
        'li',
        `${Selectors.li}`
      ),
      Helpers.checkGroup(
        page,
        4,
        ConcernGuidanceContent,
        'link',
        `${Selectors.GovukLink}`
      ),
    ]);
    await page.click(
      `${Selectors.GovukSummaryText}:text-is("${ConcernGuidanceContent.summaryText}")`
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ConcernGuidanceContent,
        'detailsLink',
        `${Selectors.GovukLink}`
      ),
      Helpers.checkGroup(
        page,
        5,
        ConcernGuidanceContent,
        'detailsBody',
        `${Selectors.GovukBody}`
      ),
    ])
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page)
    }
  }

  private static async fillInFields(
    page: Page
  ): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.paddedContinue}")`
    );
  }
}