import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { FeeGuidanceContent } from "../../../../../fixtures/citizen/createCase/C100/helpWithFees/feeGuidanceContent";
import { Helpers } from "../../../../../common/helpers";
import { SafetyConcernHelpers } from "../safetyConcerns/safetyConcernHelpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";

enum inputIDs {
  referenceNumber = "#helpWithFeesReferenceNumber",
}

interface FeeGuidancePageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class FeeGuidancePage {
  public static async feeGuidancePage({
    page,
    accessibilityTest,
    errorMessaging,
  }: FeeGuidancePageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${FeeGuidanceContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${FeeGuidanceContent.formLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${FeeGuidanceContent.formHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${FeeGuidanceContent.insetText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${FeeGuidanceContent.link}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        FeeGuidanceContent,
        "bodyM",
        Selectors.GovukBodyM,
      ),
    ]);
    await SafetyConcernHelpers.checkContactDetailsText(page);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${FeeGuidanceContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${FeeGuidanceContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.fill(
      inputIDs.referenceNumber,
      FeeGuidanceContent.referenceNumber,
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}}")`,
    );
  }
}
