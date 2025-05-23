import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../../common/helpers";
import { SubmitAndPayConfirmContent } from "../../../../../fixtures/manageCases/createCase/C100/submitAndPay/submitAndPayConfirmContent";
import { SubmitAndPay1Content } from "../../../../../fixtures/manageCases/createCase/C100/submitAndPay/submitAndPay1Content";

interface SubmitAndPayOptions {
  page: Page;
  yesNoWelshLanguage: boolean;
  accessibilityTest: boolean;
}

export class SubmitAndPayConfirmPage {
  public static async submitAndPayConfirmPage({
    page: page,
    yesNoWelshLanguage: yesNoWelshLanguage,
    accessibilityTest: accessibilityTest,
  }: SubmitAndPayOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      yesNoWelshLanguage: yesNoWelshLanguage,
      accessibilityTest: accessibilityTest,
    });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page: page,
    yesNoWelshLanguage: yesNoWelshLanguage,
    accessibilityTest: accessibilityTest,
  }: SubmitAndPayOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${SubmitAndPayConfirmContent.h1}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h1}:text-is("${SubmitAndPay1Content.pageTitle}")`,
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
    if (yesNoWelshLanguage) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h3}:text-is("${SubmitAndPayConfirmContent.h3w}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${SubmitAndPayConfirmContent.pw}")`,
          1,
        ),
      ]);
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.a}:has-text("${SubmitAndPayConfirmContent.a}")`,
    );
  }
}
