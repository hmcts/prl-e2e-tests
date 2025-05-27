import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors.ts";
import { ApplicantUploadC8FormContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/applicant/applicantUploadC8FormContent.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import config from "../../../../../../utils/config.utils.ts";

interface applicantUploadC8FormOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

const documentUpload: string = "#fileupload";

export class ApplicantUploadC8FormPage {
  public static async applicantUploadC8FormPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: applicantUploadC8FormOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<applicantUploadC8FormOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${ApplicantUploadC8FormContent.pageTitle}")`,
    );
    await page.click(
      `${Selectors.GovukSummaryText}:text-is("${ApplicantUploadC8FormContent.govukDetailsSummaryText}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:has-text("${ApplicantUploadC8FormContent.govukBody}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ApplicantUploadC8FormContent.hint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingS}:text-is("${ApplicantUploadC8FormContent.h2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        ApplicantUploadC8FormContent,
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
  }: Partial<applicantUploadC8FormOptions>): Promise<void> {
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
        `${Selectors.a}:text-is("${ApplicantUploadC8FormContent.errorMessageNoUpload}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ApplicantUploadC8FormContent.errorMessageNoUpload}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
  }: Partial<applicantUploadC8FormOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.setInputFiles(`${documentUpload}`, config.testPdfFile);
    await page.click(
      `${Selectors.GovukButton}:text-is("${ApplicantUploadC8FormContent.uploadButton}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.a}:text-is("${ApplicantUploadC8FormContent.removeButton}")`,
      1,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
