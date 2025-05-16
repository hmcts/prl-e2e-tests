import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors";
import { OtherPersonUploadC8FormContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonUploadC8FormContent";
import { Helpers } from "../../../../../../common/helpers";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper";
import config from "../../../../../../utils/config.utils";

interface otherPersonUploadC8FormOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

const documentUpload: string = "#fileupload";

export class OtherPersonUploadC8FormPage {
  public static async otherPersonUploadC8FormPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: otherPersonUploadC8FormOptions): Promise<void> {
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
  }: Partial<otherPersonUploadC8FormOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${OtherPersonUploadC8FormContent.pageTitle}")`,
    );
    await page.click(
      `${Selectors.GovukSummaryText}:text-is("${OtherPersonUploadC8FormContent.govukDetailsSummaryText}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:has-text("${OtherPersonUploadC8FormContent.govukBody}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${OtherPersonUploadC8FormContent.hint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingS}:text-is("${OtherPersonUploadC8FormContent.h2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        OtherPersonUploadC8FormContent,
        `li`,
        Selectors.li,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<otherPersonUploadC8FormOptions>): Promise<void> {
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
        `${Selectors.a}:text-is("${OtherPersonUploadC8FormContent.errorMessageNoUpload}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${OtherPersonUploadC8FormContent.errorMessageNoUpload}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
  }: Partial<otherPersonUploadC8FormOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.setInputFiles(`${documentUpload}`, config.testPdfFile);
    await page.click(
      `${Selectors.GovukButton}:text-is("${OtherPersonUploadC8FormContent.uploadButton}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.a}:text-is("${OtherPersonUploadC8FormContent.removeButton}")`,
      1,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
