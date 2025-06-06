import { Page } from "@playwright/test";
import { ApplicantGender, UserRole } from "../../../../common/types.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { ApplicantDetails1Page } from "../../../../pages/manageCases/createCase/C100/applicantDetails/applicantDetails1Page.ts";
import { ApplicantDetailsSubmitPage } from "../../../../pages/manageCases/createCase/C100/applicantDetails/applicantDetailsSubmitPage.ts";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage.ts";
import { SolicitorCreateInitial } from "../solicitorCreateInitial.ts";

interface c100ApplicantDetailsOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoApplicantDetails: boolean;
  applicantGender: ApplicantGender;
  subJourney: boolean;
}

export class C100ApplicantDetails {
  public static async C100ApplicantDetails({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    yesNoApplicantDetails,
    applicantGender,
    subJourney,
  }: c100ApplicantDetailsOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: user,
        accessibilityTest: false,
        solicitorCaseType: "C100",
        errorMessaging: false,
      });
    }
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
