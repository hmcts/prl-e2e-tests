import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { DocumentUploadContent } from "../../../../fixtures/citizen/caseView/requestMoreTime/documentUploadContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";

export enum UniqueSelectors {
  fileUpload = "#awp-doc-form-upload",
}

export class DocumentUploadPage {
  public static async documentUploadPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukCaptionL, {
        hasText: DocumentUploadContent.GovukCaptionL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${DocumentUploadContent.GovukHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${DocumentUploadContent.GovukBody}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingS}:text-is("${DocumentUploadContent.GovukHeadingS}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${DocumentUploadContent.GovukHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryText}:text-is("${DocumentUploadContent.GovukSummaryText}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    const fileInput = page.locator(UniqueSelectors.fileUpload);
    await fileInput.setInputFiles(config.testPdfFile);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.uploadFile}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukTableCell}:text-is("${DocumentUploadContent.GovukTableCell}")`,
      1,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
