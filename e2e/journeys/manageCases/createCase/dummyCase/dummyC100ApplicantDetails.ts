import { Helpers } from "../../../../common/helpers";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { ApplicantDetails1Content } from "../../../../fixtures/manageCases/createCase/C100/applicantDetails/applicantDetails1Content";
import { ApplicantDetailsSubmitContent } from "../../../../fixtures/manageCases/createCase/C100/applicantDetails/applicantDetailsSubmitContent";
import { DummyApplicantDetailsPage } from "../../../../pages/manageCases/createCase/C100/dummyCase/dummyApplicantDetailsPage";

export class DummyC100ApplicantDetails {
  public static async dummyC100ApplicantDetails(
    page: Page,
    applicantLivesInRefuge: boolean,
  ): Promise<void> {
    await Helpers.selectSolicitorEvent(page, "Applicant details");
    await DummyApplicantDetailsPage.dummyApplicantDetailsPage(
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
