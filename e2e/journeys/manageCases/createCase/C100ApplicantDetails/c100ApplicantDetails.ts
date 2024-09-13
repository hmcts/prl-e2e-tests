import { Page } from "@playwright/test";
import { UserRole } from "../../../../common/types";
import { Helpers } from "../../../../common/helpers";
import {
  ApplicantDetails1Page,
  ApplicantGender,
} from "../../../../pages/manageCases/createCase/C100/applicantDetails/applicantDetails1Page";
import { ApplicantDetailsSubmitPage } from "../../../../pages/manageCases/createCase/C100/applicantDetails/applicantDetailsSubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

export class C100ApplicantDetails {
  public static async C100ApplicantDetails(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    yesNoApplicantDetails: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await Helpers.selectSolicitorEvent(page, "Applicant details");
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
