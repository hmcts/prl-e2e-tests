import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { MiamOtherProceedingsContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamOtherProceedingsContent";
import { Helpers } from "../../../../../common/helpers";
import AxeTest from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface OtherProceedingsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  MIAMChildrenInvolvedOtherProceedings: boolean;
}

enum uniqueSelectors {
  otherProceedingsYes = "#miam_otherProceedings",
  otherProceedingsNo = "#miam_otherProceedings-2",
}

export class MiamOtherProceedingsPage {
  public static async otherProceedingsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    MIAMChildrenInvolvedOtherProceedings: MIAMChildrenInvolvedOtherProceedings,
  }: OtherProceedingsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
      MIAMChildrenInvolvedOtherProceedings:
        MIAMChildrenInvolvedOtherProceedings,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<OtherProceedingsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is undefined.");
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${MiamOtherProceedingsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.div}:text-is("${MiamOtherProceedingsContent.div}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        MiamOtherProceedingsContent,
        `govLabel`,
        `${Selectors.GovukLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AxeTest.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<OtherProceedingsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is undefined.");
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${MiamOtherProceedingsContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${MiamOtherProceedingsContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    MIAMChildrenInvolvedOtherProceedings: MIAMChildrenInvolvedOtherProceedings,
  }: Partial<OtherProceedingsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is undefined.");
    }
    if (MIAMChildrenInvolvedOtherProceedings) {
      await page.click(`${uniqueSelectors.otherProceedingsYes}`);
    } else {
      await page.click(`${uniqueSelectors.otherProceedingsNo}`);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
  }
}
