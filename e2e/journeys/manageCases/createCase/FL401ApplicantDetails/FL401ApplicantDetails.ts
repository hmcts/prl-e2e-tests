import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage.ts";
import { ApplicantDetails1Page } from "../../../../pages/manageCases/createCase/FL401/applicantDetails/applicantDetails1Page.ts";
import { ApplicantDetailsSubmitPage } from "../../../../pages/manageCases/createCase/FL401/applicantDetails/applicantDetailsSubmitPage.ts";
import { ApplicantGender } from "../../../../common/types.ts";
import { SolicitorCreateInitial } from "../solicitorCreateInitial.ts";

interface fl401ApplicantDetailsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoFL401ApplicantDetails: boolean;
  applicantGender: ApplicantGender;
  subJourney: boolean;
}

export class FL401ApplicantDetails {
  public static async fl401ApplicantDetails({
    page,
    accessibilityTest,
    errorMessaging,
    yesNoFL401ApplicantDetails,
    applicantGender,
    subJourney,
  }: fl401ApplicantDetailsOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: "solicitor",
        accessibilityTest: false,
        solicitorCaseType: "FL401",
        errorMessaging: false,
      });
    }
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
