import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";
import { ApplicantDetails1Page } from "../../../../pages/manageCases/createCase/FL401/applicantDetails/applicantDetails1Page";
import { ApplicantDetailsSubmitPage } from "../../../../pages/manageCases/createCase/FL401/applicantDetails/applicantDetailsSubmitPage";
import { ApplicantGender } from "../../../../common/types";

interface fl401ApplicantDetailsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoFL401ApplicantDetails: boolean;
  applicantGender: ApplicantGender;
}

export class FL401ApplicantDetails {
  public static async fl401ApplicantDetails({
    page,
    accessibilityTest,
    errorMessaging,
    yesNoFL401ApplicantDetails,
    applicantGender,
  }: fl401ApplicantDetailsOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "Applicant details");
    await ApplicantDetails1Page.applicantDetails1Page(
      page,
      accessibilityTest,
      errorMessaging,
      yesNoFL401ApplicantDetails,
      applicantGender,
    );
    await ApplicantDetailsSubmitPage.applicantDetailsSubmitPage(
      page,
      accessibilityTest,
      yesNoFL401ApplicantDetails,
      applicantGender,
    );
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
