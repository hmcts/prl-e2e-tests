import { Page } from "@playwright/test";
import { UserRole } from "../../../../common/types.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { ChildrenAndRespondents1Page } from "../../../../pages/manageCases/createCase/C100/childrenAndRespondents/childrenAndRespondents1Page.ts";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage.ts";
import { ChildrenAndRespondentsSubmitPage } from "../../../../pages/manageCases/createCase/C100/childrenAndRespondents/childrenAndRespondentsSubmitPage.ts";
import { C100RespondentDetails } from "../C100RespondentDetails/C100RespondentDetails.ts";
import { C100ChildDetails } from "../C100ChildDetails/c100ChildDetails.ts";
import { C100ChildGender } from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised1Page.ts";
import { yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions } from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised2Page.ts";
import {
  C100RespondentAddress5Years,
  C100RespondentGender,
  C100RespondentLegalRepresentation,
} from "../../../../pages/manageCases/createCase/C100/respondentDetails/respondentDetails1Page.ts";

interface c100ChildrenAndRespondentsOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoRespondentDetails: boolean;
  respondentGender: C100RespondentGender;
  respondentAddress5Years: C100RespondentAddress5Years;
  respondentLegalRepresentation: C100RespondentLegalRepresentation;
  c100ChildGender: C100ChildGender;
  yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions;
  yesNoChildrenAndRespondents: boolean;
  subJourney: boolean;
}

export class C100ChildAndRespondents {
  public static async c100ChildrenAndRespondents({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    yesNoRespondentDetails,
    respondentGender,
    respondentAddress5Years,
    respondentLegalRepresentation,
    c100ChildGender,
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
    yesNoChildrenAndRespondents,
    subJourney,
  }: c100ChildrenAndRespondentsOptions): Promise<void> {
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
      await C100RespondentDetails.c100RespondentDetails({
        page: page,
        user: user,
        accessibilityTest: accessibilityTest,
        yesNoRespondentDetailsC100: yesNoRespondentDetails,
        respondentGender: respondentGender,
        respondentAddress5Years: respondentAddress5Years,
        respondentLegalRepresentation: respondentLegalRepresentation,
        subJourney: false,
      });
    }
    await Helpers.handleEventBasedOnEnvironment(
      page,
      "Children and respondents",
    );
    await ChildrenAndRespondents1Page.childrenAndRespondents1Page(
      page,
      accessibilityTest,
      errorMessaging,
      yesNoChildrenAndRespondents,
    );
    await ChildrenAndRespondentsSubmitPage.childrenAndRespondentsSubmitPage(
      page,
      accessibilityTest,
      yesNoChildrenAndRespondents,
    );
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
