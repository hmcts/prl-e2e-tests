import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { ApplicantGender, UserRole } from "../../../../common/types";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";
import { C100ChildGender } from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised1Page";
import { yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions } from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised2Page";
import { ChildrenAndOtherPeople1Page } from "../../../../pages/manageCases/createCase/C100/childrenAndOtherPeople/childrenAndOtherPeople1Page";
import { ChildrenAndOtherPeopleSubmitPage } from "../../../../pages/manageCases/createCase/C100/childrenAndOtherPeople/childrenAndOtherPeopleSubmitPage";
import { C100ChildDetails } from "../C100ChildDetails/c100ChildDetails";
import { C100OtherPeopleInTheCase } from "../C100OtherPeopleInTheCase/C100OtherPeopleInTheCase";

interface c100ChildrenAndOtherPeopleOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ChildGender: C100ChildGender;
  yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions;
  yesNoChildrenAndOtherPeople: boolean;
  otherPersonLivesInRefuge: boolean;
  applicantGender: ApplicantGender;
  yesNoOtherPeopleInTheCase: boolean;
  subJourney: boolean;
}

export class C100ChildrenAndOtherPeople {
  public static async c100ChildrenAndOtherPeople({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    c100ChildGender,
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
    yesNoOtherPeopleInTheCase,
    otherPersonLivesInRefuge,
    applicantGender,
    yesNoChildrenAndOtherPeople,
    subJourney,
  }: c100ChildrenAndOtherPeopleOptions): Promise<void> {
    if (subJourney) {
      await C100ChildDetails.c100ChildDetails({
        page: page,
        user: user,
        accessibilityTest: accessibilityTest,
        c100ChildGender: c100ChildGender,
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
          yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
        subJourney: true,
      });
      await C100OtherPeopleInTheCase.c100OtherPeopleInTheCase({
        page: page,
        user: user,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        yesNoOtherPeopleInTheCase: yesNoOtherPeopleInTheCase,
        otherPersonLivesInRefuge: otherPersonLivesInRefuge,
        applicantGender: applicantGender,
        subJourney: false,
      });
    }
    await Helpers.handleEventBasedOnEnvironment(page, "Children and other people");
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
