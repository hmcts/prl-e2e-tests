import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SubmitAndPay2Content } from "../../../../../fixtures/manageCases/createCase/C100/submitAndPay/submitAndPay2Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

interface SubmitAndPay2PageOptions {
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
  payAgreeStatementAgree = "payAgreeStatement-agree",
}

export class SubmitAndPay2Page {
  public static async submitAndPay2Page({
    page: page,
    accessibilityTest: accessibilityTest,
  }: SubmitAndPay2PageOptions): Promise<void> {
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
      `${Selectors.h3}:text-is("${SubmitAndPay2Content.h3}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SubmitAndPay2Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SubmitAndPay2Content.formLabelAgreeWithStatement}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${SubmitAndPay2Content.formHint}")`,
        1,
      ),
      Helpers.checkGroup(page, 2, SubmitAndPay2Content, "p", `${Selectors.p}`),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page: page,
  }: fillInFieldsOptions): Promise<void> {
    await page.click(`${UniqueSelectors.payAgreeStatementAgree}`);
    await this.checkHiddenContentLoads(page);
    await page.click(
      `${Selectors.button}:text-is("${SubmitAndPay2Content.continue}")`,
    );
  }

  private static async checkHiddenContentLoads(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        7,
        SubmitAndPay2Content,
        "h3Hidden",
        `${Selectors.h3}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitAndPay2Content.price}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        SubmitAndPay2Content,
        "hiddenP",
        `${Selectors.p}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukTextFieldLabel}:text-is("${SubmitAndPay2Content.formLabelDraftConsent}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukTextFieldLabel}:text-is("${SubmitAndPay2Content.formLabelDraftDocumentWelsh}")`,
        1,
      ),
      Helpers.checkGroup(page, 2, SubmitAndPay2Content, "a", `${Selectors.a}`),
    ]);
  }
}
