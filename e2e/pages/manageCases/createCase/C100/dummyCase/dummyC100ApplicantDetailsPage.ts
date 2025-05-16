import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import config from "../../../../../utils/config.utils";
import { ApplicantDetails1Content } from "../../../../../fixtures/manageCases/createCase/C100/applicantDetails/applicantDetails1Content";

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
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${ApplicantDetails1Content.pageTitle}")`,
    );
    if (applicantLivesInRefuge) {
      await page.click(`${PageLoadFields.applicantLivesInRefugeYes}`);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.formLabelC8FormUpload}"):visible`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ApplicantDetails1Content.c8FormUploadP}"):visible`,
        1,
      );
      const fileInput = page.locator(
        `${UniqueSelectors.c8RefugeFormUploadFileInput}`,
      );
      await fileInput.setInputFiles(config.testPdfFile);
      await page.waitForSelector(
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.uploadingFile}")`,
        { state: "hidden" },
      );
      await page.click(`${PageLoadFields.addressConfidentialYes}`);
    } else {
      await page.click(`${PageLoadFields.applicantLivesInRefugeNo}`);
    }
  }
}
