import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { RequestToOrderWitnessContent4 } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessContent4.ts";
import config from "../../../../../utils/config.utils.ts";
import { RequestToOrderWitnessContent6 } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessContent6.ts";

interface UploadSupportingDocuments {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
}

enum UniqueSelectors {
  documentUpload = "#awp-doc-form-upload",
}

export class RequestToOrderWitnessToAttendCourtPage6 {
  public static async uploadSupportingDocumentsPage({
    page,
    accessibilityTest,
  }: UploadSupportingDocuments): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields({ page: page });
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukCaptionL, {
        hasText: RequestToOrderWitnessContent6.GovukCaptionL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${RequestToOrderWitnessContent6.GovukHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${RequestToOrderWitnessContent6.GovukBody}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingS}:text-is("${RequestToOrderWitnessContent6.GovukHeadingS}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${RequestToOrderWitnessContent6.GovukHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryText}:text-is("${RequestToOrderWitnessContent6.GovukSummaryText}")`,
        1,
      ),
      await page.click(
        `${Selectors.GovukSummaryText}:text-is("${RequestToOrderWitnessContent6.GovukSummaryText}")`,
      ),
    ]);
    await Helpers.checkGroup(
      page,
      5,
      RequestToOrderWitnessContent4,
      `GovukDetailsText`,
      `${Selectors.li}`,
    );
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
  private static async fillInFields({
    page,
  }: fillInFieldsOptions): Promise<void> {
    const fileInput = page.locator(`${UniqueSelectors.documentUpload}`);
    await fileInput.setInputFiles(config.testPdfFile);

    await page.click(
      `${Selectors.GovukButton}:text-is("${RequestToOrderWitnessContent6.uploadButton}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.a}:text-is("${RequestToOrderWitnessContent6.removeButton}")`,
      1,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
