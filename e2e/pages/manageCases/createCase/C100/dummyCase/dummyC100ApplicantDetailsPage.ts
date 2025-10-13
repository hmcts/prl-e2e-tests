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
      const applicant1: Locator = page.locator("#applicants_0_0");
      await page.check(PageLoadFields.applicantLivesInRefugeYes);
      // work around: adding poll for c8 upload section because the showing of the c8 fields isn't consistent on this screen
      await expect
        .poll(
          async () => {
            const c8UploadLabelVisible = await applicant1
              .locator(Selectors.GovukFormLabel, {
                hasText: ApplicantDetails1Content.formLabelC8FormUpload,
              })
              .first()
              .isVisible();
            // if (!c8UploadLabelVisible) {
            //   // if not visible then click no and then yes radio button to try and re-trigger
            //   await page.check(PageLoadFields.applicantLivesInRefugeNo);
            //   await page.check(PageLoadFields.applicantLivesInRefugeYes);
            // }
            return c8UploadLabelVisible;
          },
          {
            // Allow 5s delay before retrying
            intervals: [5_000],
            // Allow up to 5 minutes for the go button to disappear
            timeout: 300_000,
          },
        )
        .toBeTruthy();
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
