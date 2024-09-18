import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";
import { ApplicantDetails1Page } from "../../../../pages/manageCases/createCase/FL401/applicantDetails/applicantDetails1Page";
import { ApplicantDetailsSubmitPage } from "../../../../pages/manageCases/createCase/FL401/applicantDetails/applicantDetailsSubmitPage";
import { ApplicantGender } from "../../../../common/types";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";

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
    await Helpers.selectSolicitorEvent(page, "Applicant details");
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
