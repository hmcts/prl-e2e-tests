import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { ApplicantDetails1Content } from "../../../../../fixtures/manageCases/createCase/FL401/applicantDetails/applicantDetails1Content.ts";

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
      await page.click(`${PageLoadFields.addressConfidentialYes}`);
    } else {
      await page.click(`${PageLoadFields.applicantLivesInRefugeNo}`);
    }
  }
}
