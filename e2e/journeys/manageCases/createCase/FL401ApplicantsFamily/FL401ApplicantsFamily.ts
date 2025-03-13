import { Helpers } from "../../../../common/helpers";
import { Page } from "@playwright/test";
import { ApplicantsFamilyPage } from "../../../../pages/manageCases/createCase/FL401/applicantsFamily/applicantsFamilyPage";
import { ApplicantsFamilySubmitPage } from "../../../../pages/manageCases/createCase/FL401/applicantsFamily/applicantsFamilySubmitPage";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";

interface fl401ApplicantsFamilyOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  applicantHasChildren: boolean;
}

export class FL401ApplicantsFamily {
  public static async fl401ApplicantsFamily({
    page,
    accessibilityTest,
    errorMessaging,
    applicantHasChildren,
  }: fl401ApplicantsFamilyOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "Applicant's family");
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
