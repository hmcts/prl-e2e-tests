import { Helpers } from "../../../../common/helpers.ts";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { ApplicantDetails1Content } from "../../../../fixtures/manageCases/createCase/FL401/applicantDetails/applicantDetails1Content.ts";
import { ApplicantDetailsSubmitContent } from "../../../../fixtures/manageCases/createCase/FL401/applicantDetails/applicantDetailsSubmitContent.ts";
import { DummyFL401ApplicantDetailsPage } from "../../../../pages/manageCases/createCase/FL401/dummyCase/dummyFL401ApplicantDetailsPage.ts";

export class DummyFL401ApplicantDetails {
  public static async dummyFL401ApplicantDetails(
    page: Page,
    applicantLivesInRefuge: boolean,
  ): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "Applicant details");
    await DummyFL401ApplicantDetailsPage.dummyApplicantDetailsPage(
      page,
      applicantLivesInRefuge,
    );
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetailsSubmitContent.saveAndContinue}")`,
    );
  }
}
