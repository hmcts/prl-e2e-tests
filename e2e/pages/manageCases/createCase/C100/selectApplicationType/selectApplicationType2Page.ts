import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { SelectApplicationType2Content } from "../../../../../fixtures/manageCases/createCase/C100/selectApplicationType/selectApplicationType2Content";
import config from "../../../../../config";

enum PageIDs {
  yes = "#consentOrder_Yes",
  no = "#consentOrder_No",
  uploadFileInput = "#draftConsentOrderFile",
}

export class selectApplicationType2Page {
  public static async selectApplicationType2Page(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    yesNo: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields(page, yesNo);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.p}:text-is("${SelectApplicationType2Content.p1}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SelectApplicationType2Content.title}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType2Content.formLabel1}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SelectApplicationType2Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${SelectApplicationType2Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${SelectApplicationType2Content.errorMessage1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${SelectApplicationType2Content.errorMessage1}")`,
        1,
      ),
    ]);
    await page.click(`${PageIDs.yes}`);
    await this.draftConsentContent(page);
    await page.click(
      `${Selectors.button}:text-is("${SelectApplicationType2Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${SelectApplicationType2Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${SelectApplicationType2Content.errorMessage2}")`,
        1,
      ),
    ]);
    const fileInput = page.locator(`${PageIDs.uploadFileInput}`);
    await fileInput.setInputFiles(config.testOdtFile);
    await page.waitForTimeout(5000);
    await page.click(
      `${Selectors.button}:text-is("${SelectApplicationType2Content.continue}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukErrorMessage}:text-is("${SelectApplicationType2Content.errorMessage3}")`,
      1,
    );
  }

  private static async fillInFields(page: Page, yesNo: boolean): Promise<void> {
    if (yesNo) {

      await page.click(`${PageIDs.yes}`);
      const fileInput = page.locator(`${PageIDs.uploadFileInput}`);
      await fileInput.setInputFiles(config.testPdfFile);
      await this.draftConsentContent(page);
    } else {
      await page.click(`${PageIDs.no}`);
    }
    await page.waitForTimeout(5000);
    await page.click(
      `${Selectors.button}:text-is("${SelectApplicationType2Content.continue}")`,
    );
  }

  private static async draftConsentContent(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType2Content.formLabel4}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${SelectApplicationType2Content.formHint}")`,
        1,
      ),
    ]);
  }
}
