import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { StartContent } from "../../../../../fixtures/citizen/createCase/C100/confidentiality/startContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";

enum inputIDs {
  yes = "#start",
  no = "#start-2",
}

interface StartPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100PrivateDetails: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100PrivateDetails: boolean;
}

export class StartPage {
  public static async startPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100PrivateDetails,
  }: StartPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page,
      c100PrivateDetails: c100PrivateDetails,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${StartContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        StartContent,
        "bodyM",
        `${Selectors.GovukBodyM}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.paddedYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.paddedNo}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.paddedContinue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorSummaryList} ${Selectors.a}:text-is("${StartContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${StartContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100PrivateDetails,
  }: FillInFieldsOptions): Promise<void> {
    if (c100PrivateDetails) {
      await page.click(inputIDs.yes);
    } else {
      await page.click(inputIDs.no);
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.paddedContinue}")`,
    );
  }
}
