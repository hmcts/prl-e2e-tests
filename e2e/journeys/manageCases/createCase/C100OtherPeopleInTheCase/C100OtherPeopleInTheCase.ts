import { Page } from "@playwright/test";
import { ApplicantGender, UserRole } from "../../../../common/types";
import { Helpers } from "../../../../common/helpers";
import { OtherPeopleInTheCase1Page } from "../../../../pages/manageCases/createCase/C100/otherPeopleInTheCase/otherPeopleInTheCase1Page";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { OtherPeopleInTheCaseSubmitPage } from "../../../../pages/manageCases/createCase/C100/otherPeopleInTheCase/otherPeopleInTheCaseSubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

interface c100OtherPeopleInTheCaseOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoOtherPeopleInTheCase: boolean;
  otherPersonLivesInRefuge: boolean;
  applicantGender: ApplicantGender;
  subJourney: boolean;
}

export class C100OtherPeopleInTheCase {
  public static async c100OtherPeopleInTheCase({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    yesNoOtherPeopleInTheCase,
    otherPersonLivesInRefuge,
    applicantGender,
    subJourney,
  }: c100OtherPeopleInTheCaseOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: user,
        accessibilityTest: false,
        solicitorCaseType: "C100",
        errorMessaging: false,
      });
    }
    await Helpers.selectSolicitorEvent(page, "Other people in the case");
    await OtherPeopleInTheCase1Page.otherPeopleInTheCase1Page(
      page,
      accessibilityTest,
      errorMessaging,
      yesNoOtherPeopleInTheCase,
      otherPersonLivesInRefuge,
      applicantGender,
    );
    await OtherPeopleInTheCaseSubmitPage.otherPeopleInTheCaseSubmitPage(
      page,
      accessibilityTest,
      yesNoOtherPeopleInTheCase,
      otherPersonLivesInRefuge,
      applicantGender,
    );
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
