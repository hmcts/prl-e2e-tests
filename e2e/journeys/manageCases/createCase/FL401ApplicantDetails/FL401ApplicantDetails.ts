import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";
import {
  ApplicantDetails1Page
} from "../../../../pages/manageCases/createCase/FL401/applicantDetails/applicantDetails1Page";

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
    console.log('Navigated successfully')
    await ApplicantDetails1Page.applicantDetails1Page(
      page,
      accessibilityTest,
      errorMessaging
    )
    // await Fl401TasksTabPage.fl401TasksTabPage(
    //   page,
    //   accessibilityTest
    // )
  }
}