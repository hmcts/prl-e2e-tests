import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ShortStatementContent } from "../../../../../fixtures/citizen/createCase/C100/typeOfOrder/shortStatementContent";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";

interface ShortStatementPageOptions {
  page: Page;
  accessibilityTest: boolean;
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
  }: ShortStatementPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${ShortStatementContent.h1}")`,
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

  private static async fillInFields({
    page: page,
  }: fillinFieldsOptions): Promise<void> {
    await page.fill(
      `${UniqueSelectors.too_shortStatement}`,
      ShortStatementContent.loremIpsum,
    );
    await page.click(
      `${Selectors.button}:text-is("${ShortStatementContent.continue}")`,
    );
  }
}
