import { Page } from "@playwright/test";
import { ApplicantGender, UserRole } from "../../../../common/types";
import { C100ChildGender } from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised1Page";
import { yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions } from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised2Page";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { C100ChildDetails } from "../C100ChildDetails/c100ChildDetails";
import { C100OtherPeopleInTheCase } from "../C100OtherPeopleInTheCase/C100OtherPeopleInTheCase";
import { C100ChildrenAndOtherPeople } from "./c100ChildrenAndOtherPeople";

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
    await SolicitorCreateInitial.createInitialCase({
      page: page,
      user: user,
      accessibilityTest: false,
      solicitorCaseType: "C100",
      errorMessaging: false,
    });
    await C100OtherPeopleInTheCase.c100OtherPeopleInTheCase({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoOtherPeopleInTheCase: yesNoOtherPeopleInTheCase,
      applicantGender: applicantGender,
      subJourney: subJourney,
    });
    await C100ChildDetails.c100ChildDetails({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      c100ChildGender: c100ChildGender,
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
      subJourney: subJourney,
    });
    await C100ChildrenAndOtherPeople.c100ChildrenAndOtherPeople({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoChildrenAndOtherPeople: yesNoChildrenAndOtherPeople,
      subJourney: subJourney,
    });
  }
}
