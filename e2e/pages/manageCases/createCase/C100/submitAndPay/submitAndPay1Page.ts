import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SubmitAndPay1Content } from "../../../../../fixtures/manageCases/createCase/C100/submitAndPay/submitAndPay1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

interface SubmitAndPay1PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
}

enum UniqueSelectors {
  confidentialityDisclaimer = "#confidentialityDisclaimer_confidentialityChecksChecked-confidentialityChecksChecked",
}

export class SubmitAndPay1Page {
  public static async submitAndPay1Page({
    page: page,
    accessibilityTest: accessibilityTest,
  }: SubmitAndPay1PageOptions): Promise<void> {
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
      `${Selectors.h1}:text-is("${SubmitAndPay1Content.h1}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SubmitAndPay1Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${SubmitAndPay1Content.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SubmitAndPay1Content.formLabel}")`,
        1,
      ),
      Helpers.checkGroup(page, 2, SubmitAndPay1Content, "p", `${Selectors.p}`),
      Helpers.checkGroup(
        page,
        3,
        SubmitAndPay1Content,
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
  }: fillInFieldsOptions): Promise<void> {
    await page.click(`${UniqueSelectors.confidentialityDisclaimer}`);
    await page.click(
      `${Selectors.button}:text-is("${SubmitAndPay1Content.continue}")`,
    );
  }
}
