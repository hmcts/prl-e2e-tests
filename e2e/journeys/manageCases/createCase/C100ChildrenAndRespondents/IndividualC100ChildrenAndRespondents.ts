import { Page } from "@playwright/test";
import { UserRole } from "../../../../common/types";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { Helpers } from "../../../../common/helpers";
import { ChildrenAndRespondents1Page } from "../../../../pages/manageCases/createCase/C100/childrenAndRespondents/childrenAndRespondents1Page";
import { ChildrenAndRespondentsSubmitPage } from "../../../../pages/manageCases/createCase/C100/childrenAndRespondents/childrenAndRespondentsSubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";
import {
  C100ChildGender,
  ChildDetailsRevised1Page,
} from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised1Page";
import {
  ChildDetailsRevised2Page,
  yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
} from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised2Page";
import { C100ChildDetailsSubmitPage } from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsSubmitPage";
import {
  C100RespondentAddress5Years,
  C100RespondentGender,
  C100RespondentLegalRepresentation,
  RespondentDetails1Page,
} from "../../../../pages/manageCases/createCase/C100/respondentDetails/respondentDetails1Page";
import { RespondentDetailsSubmitPage } from "../../../../pages/manageCases/createCase/C100/respondentDetails/respondentDetailsSubmitPage";

interface c100ChildrenAndRespondentsOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoRespondentDetailsC100: boolean;
  respondentGender: C100RespondentGender;
  respondentAddress5Years: C100RespondentAddress5Years;
  respondentLegalRepresentation: C100RespondentLegalRepresentation;
  c100ChildGender: C100ChildGender;
  yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions;
  yesNoChildrenAndRespondents: boolean;
  subJourney: boolean;
}

export class IndividualC100ChildAndRespondents {
  public static async c100ChildrenAndRespondents({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    yesNoRespondentDetailsC100,
    respondentGender,
    respondentAddress5Years,
    respondentLegalRepresentation,
    c100ChildGender,
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
    yesNoChildrenAndRespondents,
    subJourney,
  }: c100ChildrenAndRespondentsOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: user,
        accessibilityTest: false,
        solicitorCaseType: "C100",
        errorMessaging: false,
      });
    }
    await Helpers.handleEventBasedOnEnvironment(page, "Respondent details");
    await RespondentDetails1Page.respondent1DetailsPage({
      page,
      accessibilityTest,
      yesNoRespondentDetailsC100,
      respondentGender,
      respondentAddress5Years,
      respondentLegalRepresentation,
    });
    await RespondentDetailsSubmitPage.RespondentDetailsSubmitPage({
      page,
      accessibilityTest,
      yesNoRespondentDetailsC100,
      respondentGender,
      respondentAddress5Years,
      respondentLegalRepresentation,
    });
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
    await Helpers.selectSolicitorEvent(page, "Children and respondents");
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
