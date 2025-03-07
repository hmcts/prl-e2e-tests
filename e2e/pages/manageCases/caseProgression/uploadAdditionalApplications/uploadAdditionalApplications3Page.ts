// this page covers "other" additional applications
import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
// import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { UploadAdditionalApplications3Content } from "../../../../fixtures/manageCases/caseProgression/uploadAdditionalApplications/uploadAdditionalApplications3Content.ts";
import config from "../../../../config.ts";
import { solicitorCaseCreateType } from "../../../../common/types.ts";
import { Helpers } from "../../../../common/helpers.ts";

enum UniqueSelectors {
  daApplicationDropdown = "#temporaryOtherApplicationsBundle_daApplicantApplicationType",
  caApplicationDropdown = "#temporaryOtherApplicationsBundle_caApplicantApplicationType",
  applicationFileUpload = "#temporaryOtherApplicationsBundle_document",
  yesDocumentRelatesToCaseCheckbox = "#temporaryOtherApplicationsBundle_documentAcknowledge-ACK_RELATED_TO_CASE",
  sameDayRadio = "#temporaryOtherApplicationsBundle_urgencyTimeFrameType-SAME_DAY",
}

// only reach this page for an "Other" type of application
export class UploadAdditionalApplications3Page {
  public static async uploadAdditionalApplications3Page(
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
        hasText: UploadAdditionalApplications3Content.headingH2,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${UploadAdditionalApplications3Content.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications3Content.formLabel1}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications3Content.formLabel2}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications3Content.formLabel3}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications3Content.formLabel4}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications3Content.formLabel5}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications3Content.formLabel6}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications3Content.formLabel7}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH2}:text-is("${UploadAdditionalApplications3Content.headingH2SupportingDocuments}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}"):visible`,
        1,
      ),
    ]);
    if (caseType === "C100") {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukWarningText}:text-is("${UploadAdditionalApplications3Content.govWarningTextCA}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.headingH2}:text-is("${UploadAdditionalApplications3Content.headingH2Supplements}")`,
          1,
        ),
      ]);
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukWarningText}:text-is("${UploadAdditionalApplications3Content.govWarningTextDA}")`,
        1,
      );
    }
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page); //to be turned on once EXUI-2858 is fixed
    }
  }

  private static async fillInFields(
    page: Page,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    if (caseType === "C100") {
      await page.selectOption(
        UniqueSelectors.caApplicationDropdown,
        UploadAdditionalApplications3Content.caApplicationType,
      );
    } else {
      await page.selectOption(
        UniqueSelectors.daApplicationDropdown,
        UploadAdditionalApplications3Content.daApplicationType,
      );
    }
    // upload application file
    const fileInput = page.locator(UniqueSelectors.applicationFileUpload);
    await fileInput.setInputFiles(config.testPdfFile);
    // wait for file upload to complete
    await page
      .locator(".error-message", { hasText: " Uploading..." })
      .waitFor({ state: "hidden" });
    await page.check(UniqueSelectors.yesDocumentRelatesToCaseCheckbox);
    await page.check(UniqueSelectors.sameDayRadio);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
