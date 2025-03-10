import { Page } from "@playwright/test";
import { ApplicantGender, UserRole } from "../../../../common/types";
import { Helpers } from "../../../../common/helpers";
import { ApplicantDetails1Page } from "../../../../pages/manageCases/createCase/C100/applicantDetails/applicantDetails1Page";
import { ApplicantDetailsSubmitPage } from "../../../../pages/manageCases/createCase/C100/applicantDetails/applicantDetailsSubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

interface c100ApplicantDetailsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoApplicantDetails: boolean;
  applicantGender: ApplicantGender;
}

export class C100ApplicantDetails {
  public static async C100ApplicantDetails({
    page,
    accessibilityTest,
    errorMessaging,
    yesNoApplicantDetails,
    applicantGender,
  }: c100ApplicantDetailsOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "Applicant details");
    await ApplicantDetails1Page.applicantDetails1Page(
      page,
      accessibilityTest,
      errorMessaging,
      yesNoApplicantDetails,
      applicantGender,
    );
    await ApplicantDetailsSubmitPage.applicantDetailsSubmitPage(
      page,
      accessibilityTest,
      yesNoApplicantDetails,
      applicantGender,
    );
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
