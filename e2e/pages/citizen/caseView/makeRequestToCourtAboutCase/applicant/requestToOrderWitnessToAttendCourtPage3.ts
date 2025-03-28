import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { RequestToOrderWitnessContent3 } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/applicant/requestToOrderWitnessContent3.ts";
import config from "../../../../../config.ts";

interface UploadFP25 {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
}

enum UniqueSelectors {
  documentUpload = "#awp-doc-form-upload",
}

export class RequestToOrderWitnessToAttendCourtPage3 {
  public static async uploadFP25page({
    page,
    accessibilityTest,
  }: UploadFP25): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields({ page: page });
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukCaptionL, {
        hasText: RequestToOrderWitnessContent3.GovukCaptionL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${RequestToOrderWitnessContent3.GovukHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${RequestToOrderWitnessContent3.GovukBody}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingS}:text-is("${RequestToOrderWitnessContent3.GovukHeadingS}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${RequestToOrderWitnessContent3.GovukHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryText}:text-is("${RequestToOrderWitnessContent3.GovukSummaryText}")`,
        1,
      ),
      await page.click(
        `${Selectors.GovukSummaryText}:text-is("${RequestToOrderWitnessContent3.GovukSummaryText}")`,
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
      await AccessibilityTestHelper.run(page);
    }
  }
  private static async fillInFields({
    page,
  }: fillInFieldsOptions): Promise<void> {
    const fileInput = page.locator(`${UniqueSelectors.documentUpload}`);
    await fileInput.setInputFiles(config.testPdfFile);

    await page.click(
      `${Selectors.GovukButton}:text-is("${RequestToOrderWitnessContent3.uploadButton}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.a}:text-is("${RequestToOrderWitnessContent3.removeButton}")`,
      1,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
