import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import config from "../../../../../utils/config.utils.ts";
import { ApplicantDetails1Content } from "../../../../../fixtures/manageCases/createCase/C100/applicantDetails/applicantDetails1Content.ts";

enum UniqueSelectors {
  uploadC8FormLabel = "label[for='applicants_0_refugeConfidentialityC8Form'] .form-label",
  uploadC8FormHint = "label[for='applicants_0_refugeConfidentialityC8Form'] + .form-hint",
  c8RefugeFormUploadFileInput = "#applicants_0_refugeConfidentialityC8Form",
}

enum PageLoadFields {
  applicantLivesInRefugeYes = "#applicants_0_liveInRefuge_Yes",
  applicantLivesInRefugeNo = "#applicants_0_liveInRefuge_No",
  applicantPostCode = "#applicants_0_address_address_postcodeInput",
  addressConfidentialYes = "#applicants_0_isAddressConfidential_Yes",
  addressConfidentialNo = "#applicants_0_isAddressConfidential_No",
}

export class DummyC100ApplicantDetailsPage {
  public static async dummyApplicantDetailsPage(
    page: Page,
    applicantLivesInRefuge: boolean,
  ): Promise<void> {
    await expect(
      page.locator(Selectors.GovukHeadingL, {
        hasText: ApplicantDetails1Content.pageTitle,
      }),
    ).toBeVisible();
    if (applicantLivesInRefuge) {
      await page.click(PageLoadFields.applicantLivesInRefugeYes);
      const applicant1: Locator = page.locator("#applicants_0_0");
      await expect(
        applicant1
          .locator(Selectors.GovukFormLabel, {
            hasText: ApplicantDetails1Content.formLabelC8FormUpload,
          })
          .first(),
      ).toBeVisible({ timeout: 30000 }); // big timeout as it seems to take a while to load
      await expect(
        applicant1
          .locator(Selectors.p, {
            hasText: ApplicantDetails1Content.c8FormUploadP,
          })
          .first(),
      ).toBeVisible();
      const fileInput = applicant1.locator(
        UniqueSelectors.c8RefugeFormUploadFileInput,
      );
      await fileInput.setInputFiles(config.testPdfFile);
      await expect(
        applicant1.locator(Selectors.GovukErrorMessage, {
          hasText: ApplicantDetails1Content.uploadingFile,
        }),
      ).toBeHidden();
      await page.click(`${PageLoadFields.addressConfidentialYes}`);
    } else {
      await page.click(`${PageLoadFields.applicantLivesInRefugeNo}`);
    }
  }
}
