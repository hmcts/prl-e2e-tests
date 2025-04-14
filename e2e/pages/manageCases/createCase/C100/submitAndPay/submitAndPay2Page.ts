import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SubmitAndPay2Content } from "../../../../../fixtures/manageCases/createCase/C100/submitAndPay/submitAndPay2Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { SubmitAndPay1Content } from "../../../../../fixtures/manageCases/createCase/C100/submitAndPay/submitAndPay1Content";
import { CommonContent } from "../../../../../fixtures/manageCases/commonContent.ts";

interface SubmitAndPay2PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoWelshLanguage: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  yesNoWelshLanguage: boolean;
}

interface checkHiddenContentLoads {
  page: Page;
  yesNoWelshLanguage: boolean;
}

enum UniqueSelectors {
  payAgreeStatementAgree = "#payAgreeStatement-agree",
}

export class SubmitAndPay2Page {
  public static async submitAndPay2Page({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoWelshLanguage: yesNoWelshLanguage,
  }: SubmitAndPay2PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({
      page: page,
      yesNoWelshLanguage: yesNoWelshLanguage,
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
        `${Selectors.GovukHeadingL}:text-is("${SubmitAndPay1Content.pageTitle}")`,
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
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${SubmitAndPay2Content.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${SubmitAndPay2Content.p21}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${SubmitAndPay2Content.p22}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page: page,
    yesNoWelshLanguage: yesNoWelshLanguage,
  }: fillInFieldsOptions): Promise<void> {
    await page.click(`${UniqueSelectors.payAgreeStatementAgree}`);
    await this.checkHiddenContentLoads({
      page: page,
      yesNoWelshLanguage: yesNoWelshLanguage,
    });
    await page.click(
      `${Selectors.button}:text-is("${SubmitAndPay2Content.continue}")`,
    );
  }

  private static async checkHiddenContentLoads({
    page: page,
    yesNoWelshLanguage: yesNoWelshLanguage,
  }: checkHiddenContentLoads): Promise<void> {
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
        `${Selectors.GovukText16}:text-is("${CommonContent.c100Fee}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        SubmitAndPay2Content,
        "hiddenP",
        `${Selectors.p}`,
      ),
    ]);
    if (yesNoWelshLanguage) {
      await Promise.all([
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
        Helpers.checkGroup(
          page,
          2,
          SubmitAndPay2Content,
          "a",
          `${Selectors.a}`,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukTextFieldLabel}:text-is("${SubmitAndPay2Content.formLabelDraftConsent}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${SubmitAndPay2Content.a1}")`,
          1,
        ),
      ]);
    }
  }
}
