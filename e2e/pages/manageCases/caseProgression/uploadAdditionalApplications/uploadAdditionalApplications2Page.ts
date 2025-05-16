import { Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../../common/types.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { UploadAdditionalApplications2Content } from "../../../../fixtures/manageCases/caseProgression/uploadAdditionalApplications/uploadAdditionalApplications2Content.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import config from "../../../../utils/config.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";

enum UniqueSelectors {
  c2ApplicationFileUpload = "#temporaryC2Document_document",
  yesDocumentRelatesToCaseCheckbox = "#temporaryC2Document_documentAcknowledge-ACK_RELATED_TO_CASE",
  c100OtherReasonCheckbox = "#temporaryC2Document_caReasonsForC2Application-OTHER",
  fl401OtherReasonCheckbox = "#temporaryC2Document_daReasonsForC2Application-OTHER",
  otherReasonTextbox = "#temporaryC2Document_otherReasonsFoC2Application",
  sameDayRadio = "#temporaryC2Document_urgencyTimeFrameType-SAME_DAY",
}

// this page is only for a C2 application
export class UploadAdditionalApplications2Page {
  public static async uploadAdditionalApplications2Page(
    page: Page,
    caseType: solicitorCaseCreateType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, caseType, accessibilityTest);
    await this.fillInFields(page, caseType);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    caseType: solicitorCaseCreateType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.headingH2, {
        hasText: UploadAdditionalApplications2Content.headingH2,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${UploadAdditionalApplications2Content.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications2Content.formLabel1}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications2Content.formLabel2}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications2Content.formLabel3}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications2Content.formLabel4}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications2Content.formLabel5}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications2Content.formLabel6}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications2Content.formLabel7}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${UploadAdditionalApplications2Content.formHint}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH2}:text-is("${UploadAdditionalApplications2Content.headingH2DraftOrders}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH2}:text-is("${UploadAdditionalApplications2Content.headingH2SupportingDocuments}"):visible`,
        1,
      ),
    ]);
    if (caseType === "C100") {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukWarningText}:text-is("${UploadAdditionalApplications2Content.govWarningTextCA}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications2Content.c100FromLabel1}"):visible`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications2Content.c100FromLabel2}"):visible`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications2Content.c100FromLabel3}"):visible`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications2Content.c100FromLabel4}"):visible`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications2Content.c100FromLabel5}"):visible`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications2Content.c100FromLabel6}"):visible`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.headingH2}:text-is("${UploadAdditionalApplications2Content.headingH2Supplements}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.button}:text-is("${CommonStaticText.addNew}"):visible`,
          3,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukWarningText}:text-is("${UploadAdditionalApplications2Content.govWarningTextDA}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications2Content.fl401FromLabel1}"):visible`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications2Content.fl401FromLabel2}"):visible`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.button}:text-is("${CommonStaticText.addNew}"):visible`,
          2,
        ),
      ]);
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
    page: Page,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    // upload C2 application file
    const fileInput = page.locator(UniqueSelectors.c2ApplicationFileUpload);
    await fileInput.setInputFiles(config.testPdfFile);
    // wait for file upload to complete
    await page
      .locator(".error-message", { hasText: " Uploading..." })
      .waitFor({ state: "hidden" });
    await page.check(UniqueSelectors.yesDocumentRelatesToCaseCheckbox);
    if (caseType === "C100") {
      // select "Other" option for "Are you using the C2 to apply for any of the below?" regardless of case type
      await page.check(UniqueSelectors.c100OtherReasonCheckbox);
    } else {
      await page.check(UniqueSelectors.fl401OtherReasonCheckbox);
    }
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications2Content.otherReasonFormLabel}")`,
      1,
    );
    await page.fill(
      UniqueSelectors.otherReasonTextbox,
      UploadAdditionalApplications2Content.otherReasonText,
    );
    await page.check(UniqueSelectors.sameDayRadio);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
