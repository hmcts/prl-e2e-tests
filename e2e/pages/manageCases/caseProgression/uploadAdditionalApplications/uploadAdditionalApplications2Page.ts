import { Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../../common/types.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { UploadAdditionalApplications2Content } from "../../../../fixtures/manageCases/caseProgression/uploadAdditionalApplications/uploadAdditionalApplications2Content.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import config from "../../../../config.ts";

enum UniqueSelectors {
  c2ApplicationFileUpload = "#temporaryC2Document_document",
  yesDocumentRelatesToCaseCheckbox = "#temporaryC2Document_documentAcknowledge-ACK_RELATED_TO_CASE",
  otherReasonCheckbox = "#temporaryC2Document_caReasonsForC2Application-OTHER",
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
    await this.fillInFields(page);
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
      Helpers.checkGroup(
        page,
        7,
        UploadAdditionalApplications2Content,
        `formLabel`,
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${UploadAdditionalApplications2Content.formHint}")`,
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
        Helpers.checkGroup(
          page,
          6,
          UploadAdditionalApplications2Content,
          `c100FromLabel`,
          Selectors.GovukFormLabel,
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
        Helpers.checkGroup(
          page,
          2,
          UploadAdditionalApplications2Content,
          `fl401FromLabel`,
          Selectors.GovukFormLabel,
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

  private static async fillInFields(page: Page): Promise<void> {
    // upload C2 application file
    const fileInput = page.locator(UniqueSelectors.c2ApplicationFileUpload);
    await fileInput.setInputFiles(config.testPdfFile);
    // TODO: change this to uses generic manage case url once those changes have been merged
    // wait for document upload to complete
    await page.waitForResponse(
      "https://manage-case.aat.platform.hmcts.net/documents",
    );
    await page.check(UniqueSelectors.yesDocumentRelatesToCaseCheckbox);
    // select "Other" option for "Are you using the C2 to apply for any of the below?" regardless of case type
    await page.check(UniqueSelectors.otherReasonCheckbox);
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
