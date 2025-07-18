import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import config from "../../../../../utils/config.utils.ts";
import { MiamUploadEvidenceOfAttendingMiamOrNCDRContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamUploadEvidenceOfAttendingMiamOrNCDRContent.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface miamUploadEvidenceOfAttendingMiamOrNCDRPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

const documentUpload: string = "#fileupload";

export class MiamUploadEvidenceOfAttendingMiamOrNCDRPage {
  public static async miamUploadEvidenceOfAttendingMiamOrNCDRPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: miamUploadEvidenceOfAttendingMiamOrNCDRPageOptions): Promise<void> {
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
  }: Partial<miamUploadEvidenceOfAttendingMiamOrNCDRPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${MiamUploadEvidenceOfAttendingMiamOrNCDRContent.pageTitle}")`,
    );
    await page.click(
      `${Selectors.GovukSummaryText}:text-is("${MiamUploadEvidenceOfAttendingMiamOrNCDRContent.govukDetailsSummaryText}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${MiamUploadEvidenceOfAttendingMiamOrNCDRContent.govukBody}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${MiamUploadEvidenceOfAttendingMiamOrNCDRContent.govukBold}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        MiamUploadEvidenceOfAttendingMiamOrNCDRContent,
        `li`,
        Selectors.li,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<miamUploadEvidenceOfAttendingMiamOrNCDRPageOptions>): Promise<void> {
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
        `${Selectors.a}:text-is("${MiamUploadEvidenceOfAttendingMiamOrNCDRContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${MiamUploadEvidenceOfAttendingMiamOrNCDRContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
  }: Partial<miamUploadEvidenceOfAttendingMiamOrNCDRPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.setInputFiles(`${documentUpload}`, config.testPdfFile);
    await page.click(
      `${Selectors.GovukButton}:text-is("${MiamUploadEvidenceOfAttendingMiamOrNCDRContent.uploadButton}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.a}:text-is("${MiamUploadEvidenceOfAttendingMiamOrNCDRContent.removeButton}")`,
      1,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
