import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { ApplicantDetails1Content } from "../../../../../fixtures/manageCases/createCase/C100/applicantDetails/applicantDetails1Content.ts";

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
      await page.check(PageLoadFields.applicantLivesInRefugeYes);
      await page.click(`${PageLoadFields.addressConfidentialYes}`);
    } else {
      await page.click(`${PageLoadFields.applicantLivesInRefugeNo}`);
    }
  }
}
