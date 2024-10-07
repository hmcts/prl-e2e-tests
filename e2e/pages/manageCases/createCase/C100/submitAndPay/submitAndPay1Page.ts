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

enum contentSelectors {
  p1 = "ccd-field-read[class='ng-untouched ng-pristine ng-invalid'] p:nth-child(1)",
  p2 = "ccd-field-read[class='ng-untouched ng-pristine ng-invalid'] p:nth-child(2)",
  p3 = "ccd-field-read[class='ng-untouched ng-pristine ng-invalid'] p:nth-child(4)",
  li1 = "ccd-field-read[class='ng-untouched ng-pristine ng-invalid'] li:nth-child(1)",
  li2 = "ccd-field-read[class='ng-untouched ng-pristine ng-invalid'] li:nth-child(2)",
  li3 = "ccd-field-read[class='ng-untouched ng-pristine ng-invalid'] li:nth-child(3)",
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
      Helpers.checkVisibleAndPresent(
        page,
        `${contentSelectors.p1}:text-is("${SubmitAndPay1Content.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${contentSelectors.p2}:text-is("${SubmitAndPay1Content.p2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${contentSelectors.p3}:text-is("${SubmitAndPay1Content.p3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${contentSelectors.li1}:text-is("${SubmitAndPay1Content.li1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${contentSelectors.li2}:text-is("${SubmitAndPay1Content.li2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${contentSelectors.li3}:text-is("${SubmitAndPay1Content.li3}")`,
        1,
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
