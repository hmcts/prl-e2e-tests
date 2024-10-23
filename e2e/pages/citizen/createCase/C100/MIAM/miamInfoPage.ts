import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { MiamInfoContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamInfoContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

interface MiamInfoPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

const uniqueSelector: string = `#miam_consent`;

export class MiamInfoPage {
  public static async miamInfoPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: MiamInfoPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({ page: page });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<MiamInfoPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Missing the page object.");
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${MiamInfoContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${MiamInfoContent.insetText}")`,
        1,
      ),
      Helpers.checkGroup(page, 2, MiamInfoContent, `h2`, Selectors.h2),
      Helpers.checkGroup(
        page,
        2,
        MiamInfoContent,
        `bodyM`,
        Selectors.GovukBodyM,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:has-text("${MiamInfoContent.bodyM3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:has-text("${MiamInfoContent.bodyM4}")`,
        1,
      ),
      Helpers.checkGroup(page, 6, MiamInfoContent, `li`, Selectors.li),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${MiamInfoContent.govukLabel}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<MiamInfoPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Missing the page object.");
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${MiamInfoContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${MiamInfoContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
  }: Partial<MiamInfoPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Missing the page object.");
    }
    await page.click(`${uniqueSelector}`);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
