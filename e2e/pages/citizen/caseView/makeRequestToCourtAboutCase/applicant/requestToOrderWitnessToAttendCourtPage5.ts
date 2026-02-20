import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { RequestToOrderWitnessContent3 } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/applicant/requestToOrderWitnessContent3";
import config from "../../../../../utils/config.utils";
import { RequestToOrderWitnessContent5 } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/applicant/requestToOrderWitnessContent5";

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

export class RequestToOrderWitnessToAttendCourtPage5 {
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
        hasText: RequestToOrderWitnessContent5.GovukCaptionL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${RequestToOrderWitnessContent5.GovukHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${RequestToOrderWitnessContent5.GovukBody}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingS}:text-is("${RequestToOrderWitnessContent5.GovukHeadingS}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${RequestToOrderWitnessContent5.GovukHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryText}:text-is("${RequestToOrderWitnessContent5.GovukSummaryText}")`,
        1,
      ),
      await page.click(
        `${Selectors.GovukSummaryText}:text-is("${RequestToOrderWitnessContent5.GovukSummaryText}")`,
      ),
    ]);
    await Helpers.checkGroup(
      page,
      5,
      RequestToOrderWitnessContent3,
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
      `${Selectors.GovukButton}:text-is("${RequestToOrderWitnessContent5.uploadButton}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.a}:text-is("${RequestToOrderWitnessContent5.removeButton}")`,
      1,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
