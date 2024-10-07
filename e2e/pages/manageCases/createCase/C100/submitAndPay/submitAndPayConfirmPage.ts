import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Helpers } from "../../../../../common/helpers";
import { SubmitAndPayConfirmContent } from "../../../../../fixtures/manageCases/createCase/C100/submitAndPay/submitAndPayConfirmContent";

interface SubmitAndPayOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class SubmitAndPayConfirmPage {
  public static async submitAndPayConfirmPage({
    page: page,
    accessibilityTest: accessibilityTest,
  }: SubmitAndPayOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: SubmitAndPayOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${SubmitAndPayConfirmContent.h1}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h1}:text-is("${SubmitAndPayConfirmContent.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${SubmitAndPayConfirmContent.h3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${SubmitAndPayConfirmContent.p}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.a}:text-is("${SubmitAndPayConfirmContent.a}")`,
    );
  }
}