import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { ShortStatementContent } from "../../../../../fixtures/citizen/createCase/C100/typeOfOrder/shortStatementContent.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";

interface ShortStatementPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessage: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillinFieldsOptions {
  page: Page;
}

enum UniqueSelectors {
  too_shortStatement = "#too_shortStatement",
}

export class ShortStatementPage {
  public static async shortStatementPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessage: errorMessage,
  }: ShortStatementPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessage) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ShortStatementContent.h1}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.div}:text-is("${ShortStatementContent.div}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ShortStatementContent.p}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        ShortStatementContent,
        "li",
        `${Selectors.li}`,
      ),
    ]);

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: fillinFieldsOptions): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${ShortStatementContent.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${ShortStatementContent.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ShortStatementContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ShortStatementContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
  }: fillinFieldsOptions): Promise<void> {
    await page.fill(
      `${UniqueSelectors.too_shortStatement}`,
      ShortStatementContent.loremIpsum,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${ShortStatementContent.continue}")`,
    );
  }
}
