import {
  C100RespondentAddress5Years,
  C100RespondentGender,
  C100RespondentLegalRepresentation,
  RespondentDetails1Page,
} from "../../../../pages/manageCases/createCase/C100/respondentDetails/respondentDetails1Page";
import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { UserRole } from "../../../../common/types";
import { Helpers } from "../../../../common/helpers";
import { RespondentDetailsSubmitPage } from "../../../../pages/manageCases/createCase/C100/respondentDetails/respondentDetailsSubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

interface C100RespondentDetailsOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoRespondentDetailsC100: boolean;
  respondentGender: C100RespondentGender;
  respondentAddress5Years: C100RespondentAddress5Years;
  respondentLegalRepresentation: C100RespondentLegalRepresentation;
}

export class C100RespondentDetails {
  public static async c100RespondentDetails({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoRespondentDetailsC100: yesNoRespondentDetailsC100,
    respondentGender: respondentGender,
    respondentAddress5Years: respondentAddress5Years,
    respondentLegalRepresentation: respondentLegalRepresentation,
  }: C100RespondentDetailsOptions): Promise<void> {
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
  }
}
