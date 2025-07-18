import { Page } from "@playwright/test";
import { SubmitAndPaySubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/submitAndPay/submitAndPaySubmitContent.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../../common/helpers.ts";
import { SubmitAndPay1Content } from "../../../../../fixtures/manageCases/createCase/C100/submitAndPay/submitAndPay1Content.ts";

interface SubmitAndPayOptions {
  page: Page;
  yesNoHelpWithFees: boolean;
  accessibilityTest: boolean;
}

interface checkFieldsOptions {
  page: Page;
}

interface checkFilledDataOptions {
  page: Page;
  yesNoHelpWithFees: boolean;
}

export class SubmitAndPaySubmitPage {
  public static async submitAndPaySubmitPage({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoHelpWithFees: yesNoHelpWithFees,
  }: SubmitAndPayOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
      yesNoHelpWithFees: yesNoHelpWithFees,
    });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoHelpWithFees: yesNoHelpWithFees,
  }: SubmitAndPayOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${SubmitAndPaySubmitContent.h2}")`,
    );
    await Promise.all([
      this.checkPageFields({
        page: page,
      }),
      this.checkPageData({
        page: page,
        yesNoHelpWithFees: yesNoHelpWithFees,
      }),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkPageFields({
    page: page,
  }: checkFieldsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${SubmitAndPaySubmitContent.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SubmitAndPay1Content.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        SubmitAndPaySubmitContent,
        "text16",
        `${Selectors.GovukText16}`,
      ),
    ]);
  }

  private static async checkPageData({
    page: page,
    yesNoHelpWithFees: yesNoHelpWithFees,
  }: checkFilledDataOptions): Promise<void> {
    if (yesNoHelpWithFees) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${SubmitAndPaySubmitContent.text16Yes}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${SubmitAndPaySubmitContent.text16Change}")`,
          1,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${SubmitAndPaySubmitContent.textNo}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${SubmitAndPaySubmitContent.text16Change}")`,
          1,
        ),
      ]);
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SubmitAndPaySubmitContent.submit}")`,
    );
  }
}
