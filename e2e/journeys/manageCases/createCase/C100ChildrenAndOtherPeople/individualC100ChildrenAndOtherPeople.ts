import { Page } from "@playwright/test";
import { ApplicantGender, UserRole } from "../../../../common/types";
import {
  C100ChildGender,
  ChildDetailsRevised1Page,
} from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised1Page";
import {
  ChildDetailsRevised2Page,
  yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
} from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised2Page";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { Helpers } from "../../../../common/helpers";
import { OtherPeopleInTheCase1Page } from "../../../../pages/manageCases/createCase/C100/otherPeopleInTheCase/otherPeopleInTheCase1Page";
import { OtherPeopleInTheCaseSubmitPage } from "../../../../pages/manageCases/createCase/C100/otherPeopleInTheCase/otherPeopleInTheCaseSubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";
import { C100ChildDetailsSubmitPage } from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsSubmitPage";
import { ChildrenAndOtherPeople1Page } from "../../../../pages/manageCases/createCase/C100/childrenAndOtherPeople/childrenAndOtherPeople1Page";
import { ChildrenAndOtherPeopleSubmitPage } from "../../../../pages/manageCases/createCase/C100/childrenAndOtherPeople/childrenAndOtherPeopleSubmitPage";

interface c100ChildrenAndOtherPeopleOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoOtherPeopleInTheCase: boolean;
  applicantGender: ApplicantGender;
  c100ChildGender: C100ChildGender;
  yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions;
  yesNoChildrenAndOtherPeople: boolean;
  subJourney: boolean;
}

export class IndividualC100ChildrenAndOtherPeople {
  public static async c100ChildrenAndOtherPeople({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    yesNoOtherPeopleInTheCase,
    applicantGender,
    c100ChildGender,
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
    yesNoChildrenAndOtherPeople,
    subJourney,
  }: c100ChildrenAndOtherPeopleOptions): Promise<void> {
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
      applicantGender,
    );
    await OtherPeopleInTheCaseSubmitPage.otherPeopleInTheCaseSubmitPage(
      page,
      accessibilityTest,
      yesNoOtherPeopleInTheCase,
      applicantGender,
    );
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
    await Helpers.selectSolicitorEvent(page, "Child details");
    await ChildDetailsRevised1Page.childDetailsRevised1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      c100ChildGender: c100ChildGender,
    });
    await ChildDetailsRevised2Page.childDetailsRevised2Page({
      page: page,
      accessibilityTest: accessibilityTest,
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
    });
    await C100ChildDetailsSubmitPage.c100ChildDetailsSubmitPage({
      page: page,
      accessibilityTest: accessibilityTest,
      c100ChildGender: c100ChildGender,
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
    });
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
    await Helpers.selectSolicitorEvent(page, "Children and other people");
    await ChildrenAndOtherPeople1Page.childrenAndOtherPeople1Page(
      page,
      accessibilityTest,
      errorMessaging,
      yesNoChildrenAndOtherPeople,
    );
    await ChildrenAndOtherPeopleSubmitPage.childrenAndOtherPeopleSubmitPage(
      page,
      accessibilityTest,
      yesNoChildrenAndOtherPeople,
    );
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
