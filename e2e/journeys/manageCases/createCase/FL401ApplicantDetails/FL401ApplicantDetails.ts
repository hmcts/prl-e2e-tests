import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";
import {
  ApplicantDetails1Page
} from "../../../../pages/manageCases/createCase/FL401/applicantDetails/applicantDetails1Page";
import {
  ApplicantDetailsSubmitPage
} from "../../../../pages/manageCases/createCase/FL401/applicantDetails/applicantDetailsSubmitPage";

export class FL401ApplicantDetails {
  public static async fl401ApplicantDetails(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean
  ): Promise<void> {
    await Helpers.selectSolicitorEvent(
      page,
      "Applicant details"
    )
    await ApplicantDetails1Page.applicantDetails1Page(
      page,
      accessibilityTest,
      errorMessaging
    );
    console.log('Submitting')
    await ApplicantDetailsSubmitPage.applicantDetailsSubmitPage(
      page,
      accessibilityTest
    )
    console.log('Submitted')
    await Fl401TasksTabPage.fl401TasksTabPage(
      page,
      accessibilityTest
    )
  }
}