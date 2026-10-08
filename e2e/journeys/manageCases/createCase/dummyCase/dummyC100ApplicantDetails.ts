import { Helpers } from "../../../../common/helpers.ts";
import { Page } from "@playwright/test";
import { ApplicantDetails1Content } from "../../../../fixtures/manageCases/createCase/C100/applicantDetails/applicantDetails1Content.ts";
import { DummyC100ApplicantDetailsPage } from "../../../../pages/manageCases/createCase/C100/dummyCase/dummyC100ApplicantDetailsPage.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

export class DummyC100ApplicantDetails {
  public static async dummyC100ApplicantDetails(
    page: Page,
    applicantLivesInRefuge: boolean,
  ): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "Applicant details");
    await DummyC100ApplicantDetailsPage.dummyApplicantDetailsPage(
      page,
      applicantLivesInRefuge,
    );
    await page
      .getByRole("button", {
        name: ApplicantDetails1Content.continue,
        exact: true,
      })
      .click();
    await page
      .getByRole("button", {
        name: CommonStaticText.saveAndContinue,
        exact: true,
      })
      .click();
  }
}
