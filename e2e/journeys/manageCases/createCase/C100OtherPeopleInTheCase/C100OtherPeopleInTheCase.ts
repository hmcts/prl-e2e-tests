import { Page } from "@playwright/test";
import { ApplicantGender } from "../../../../common/types";
import { Helpers } from "../../../../common/helpers";
import { OtherPeopleInTheCase1Page } from "../../../../pages/manageCases/createCase/C100/otherPeopleInTheCase/otherPeopleInTheCase1Page";
import { OtherPeopleInTheCaseSubmitPage } from "../../../../pages/manageCases/createCase/C100/otherPeopleInTheCase/otherPeopleInTheCaseSubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

interface c100OtherPeopleInTheCaseOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoOtherPeopleInTheCase: boolean;
  otherPersonLivesInRefuge: boolean;
  applicantGender: ApplicantGender;
}

export class C100OtherPeopleInTheCase {
  public static async c100OtherPeopleInTheCase({
    page,
    accessibilityTest,
    errorMessaging,
    yesNoOtherPeopleInTheCase,
    otherPersonLivesInRefuge,
    applicantGender,
  }: c100OtherPeopleInTheCaseOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(
      page,
      "Other people in the case",
    );
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
