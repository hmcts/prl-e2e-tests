import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { SubmitAndPay1Content } from "../../../../../fixtures/manageCases/createCase/C100/submitAndPay/submitAndPay1Content.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

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
  checkText = "#confidentialityChecksText",
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
      expect(
        page.locator(UniqueSelectors.checkText, {
          hasText: SubmitAndPay1Content.p1,
        }),
      ).toBeVisible(),
      expect(
        page.locator(UniqueSelectors.checkText, {
          hasText: SubmitAndPay1Content.p2,
        }),
      ).toBeVisible(),
      expect(
        page.locator(UniqueSelectors.checkText, {
          hasText: SubmitAndPay1Content.p3,
        }),
      ).toBeVisible(),
      expect(
        page.locator(UniqueSelectors.checkText, {
          hasText: SubmitAndPay1Content.li1,
        }),
      ).toBeVisible(),
      expect(
        page.locator(UniqueSelectors.checkText, {
          hasText: SubmitAndPay1Content.li2,
        }),
      ).toBeVisible(),
      expect(
        page.locator(UniqueSelectors.checkText, {
          hasText: SubmitAndPay1Content.li3,
        }),
      ).toBeVisible(),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
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
