import { Helpers } from "../../../../common/helpers";
import { Page } from "@playwright/test";
import { ApplicantsFamilyPage } from "../../../../pages/manageCases/createCase/FL401/applicantsFamily/applicantsFamilyPage";
// import { ApplicantsFamilySubmitPage } from "../../../../pages/manageCases/createCase/FL401/applicantsFamily/applicantsFamilySubmitPage";
// import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";

export class FL401ApplicantsFamily {
  public static async fl401ApplicantsFamily(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    applicantHasChildren: boolean,
  ): Promise<void> {
    await Helpers.selectSolicitorEvent(page, "Applicant's family");
    await ApplicantsFamilyPage.applicantsFamilyPage(
      page,
      errorMessaging,
      accessibilityTest,
      applicantHasChildren,
    );
    // await ApplicantsFamilySubmitPage.applicantsFamilySubmitPage(
    //   page,
    //   accessibilityTest,
    // );
    // await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
