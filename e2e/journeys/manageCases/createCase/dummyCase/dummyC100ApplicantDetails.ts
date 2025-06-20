import { Helpers } from "../../../../common/helpers.ts";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { ApplicantDetails1Content } from "../../../../fixtures/manageCases/createCase/C100/applicantDetails/applicantDetails1Content.ts";
import { ApplicantDetailsSubmitContent } from "../../../../fixtures/manageCases/createCase/C100/applicantDetails/applicantDetailsSubmitContent.ts";
import { DummyC100ApplicantDetailsPage } from "../../../../pages/manageCases/createCase/C100/dummyCase/dummyC100ApplicantDetailsPage.ts";

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
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetailsSubmitContent.continue}")`,
    );
  }
}
