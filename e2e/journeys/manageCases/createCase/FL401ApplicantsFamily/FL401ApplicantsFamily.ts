import { Helpers } from "../../../../common/helpers.ts";
import { Page } from "@playwright/test";
import { ApplicantsFamilyPage } from "../../../../pages/manageCases/createCase/FL401/applicantsFamily/applicantsFamilyPage.ts";
import { SolicitorCreateInitial } from "../solicitorCreateInitial.ts";
import { ApplicantsFamilySubmitPage } from "../../../../pages/manageCases/createCase/FL401/applicantsFamily/applicantsFamilySubmitPage.ts";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage.ts";

interface fl401ApplicantsFamilyOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  applicantHasChildren: boolean;
  subJourney: boolean;
}

export class FL401ApplicantsFamily {
  public static async fl401ApplicantsFamily({
    page,
    accessibilityTest,
    errorMessaging,
    applicantHasChildren,
    subJourney,
  }: fl401ApplicantsFamilyOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: "solicitor",
        accessibilityTest: false,
        solicitorCaseType: "FL401",
        errorMessaging: false,
      });
    }
    await Helpers.handleEventBasedOnEnvironment(page, "Applicant’s family");
    await ApplicantsFamilyPage.applicantsFamilyPage(
      page,
      errorMessaging,
      accessibilityTest,
      applicantHasChildren,
    );
    await ApplicantsFamilySubmitPage.applicantsFamilySubmitPage(
      page,
      accessibilityTest,
      applicantHasChildren,
    );
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
