import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ConsentOrderUploadContent } from "../../../../../fixtures/citizen/createCase/C100/consentOrderUpload/consentOrderUploadContent";
import { SuccessPageContent } from "../../../../../fixtures/citizen/createCase/C100/consentOrderUpload/successPageContent";
import { Helpers } from "../../../../../common/helpers";

interface SuccessPageOptions {
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

export class SuccessPage {
  public static async successPage({
    page: page,
    accessibilityTest: accessibilityTest,
  }: SuccessPageOptions): Promise<void> {
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
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerTitle}:text-is("${SuccessPageContent.bannerTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerHeading}:text-is("${SuccessPageContent.bannerHeading}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SuccessPageContent.h2}")`,
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
    await page.click(
      `${Selectors.button}:text-is("${SuccessPageContent.continue}")`,
    );
  }
}
