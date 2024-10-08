import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SubmitAndPay3Content } from "../../../../../fixtures/manageCases/createCase/C100/submitAndPay/submitAndPay3Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { SubmitAndPay1Content } from "../../../../../fixtures/manageCases/createCase/C100/submitAndPay/submitAndPay1Content";

interface SubmitAndPay3PageOptions {
  page: Page;
  yesNoHelpWithFees: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
}

interface fillInFieldsOptions {
  page: Page;
  yesNoHelpWithFees: boolean;
}

enum UniqueSelectors {
  helpWithFees_Yes = "#helpWithFees_Yes",
  helpWithFees_No = "#helpWithFees_No",
  helpWithFeesReferenceNumber = "#helpWithFeesReferenceNumber",
}

export class SubmitAndPay3Page {
  public static async submitAndPay3Page({
    page: page,
    yesNoHelpWithFees: yesNoHelpWithFees,
  }: SubmitAndPay3PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
    });
    await this.fillInFields({
      page: page,
      yesNoHelpWithFees: yesNoHelpWithFees,
    });
  }

  private static async checkPageLoads({
    page: page,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukFormLabel}:text-is("${SubmitAndPay3Content.formLabel}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SubmitAndPay1Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${SubmitAndPay3Content.formHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SubmitAndPay3Content.formLabelYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SubmitAndPay3Content.formLabelNo}")`,
        1,
      ),
    ]);
    await AccessibilityTestHelper.run(page);
  }

  private static async fillInFields({
    page: page,
    yesNoHelpWithFees: yesNoHelpWithFees,
  }: fillInFieldsOptions): Promise<void> {
    // NOTE: Help with Fees are not connected yet
    if (yesNoHelpWithFees) {
      await page.click(`${UniqueSelectors.helpWithFees_Yes}`);
      await page.fill(
        `${UniqueSelectors.helpWithFeesReferenceNumber}`,
        SubmitAndPay3Content.hwfReferenceNumber,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SubmitAndPay3Content.formLabelHidden}")`,
        1,
      );
    } else {
      await page.click(`${UniqueSelectors.helpWithFees_No}`);
    }
    await page.click(
      `${Selectors.button}:text-is("${SubmitAndPay3Content.continue}")`,
    );
  }
}
