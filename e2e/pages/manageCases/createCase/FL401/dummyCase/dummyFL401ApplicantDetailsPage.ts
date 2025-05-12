import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import config from "../../../../../config";
import { ApplicantDetails1Content } from "../../../../../fixtures/manageCases/createCase/FL401/applicantDetails/applicantDetails1Content";

enum UniqueSelectors {
  uploadC8FormLabel = "label[for='applicantsFL401_refugeConfidentialityC8Form'] .form-label",
  uploadC8FormHint = "label[for='applicantsFL401_refugeConfidentialityC8Form'] + .form-hint",
  c8RefugeFormUploadFileInput = "#applicantsFL401_refugeConfidentialityC8Form",
}

enum PageLoadFields {
  applicantLivesInRefugeYes = "#applicantsFL401_liveInRefuge_Yes",
  applicantLivesInRefugeNo = "#applicantsFL401_liveInRefuge_No",
  applicantPostCode = "#applicantsFL401_address_address_postcodeInput",
  addressConfidentialYes = "#applicantsFL401_isAddressConfidential_Yes",
  addressConfidentialNo = "#applicantsFL401_isAddressConfidential_No",
}

export class DummyFL401ApplicantDetailsPage {
  public static async dummyApplicantDetailsPage(
    page: Page,
    applicantLivesInRefuge: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${ApplicantDetails1Content.headingL}")`,
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
