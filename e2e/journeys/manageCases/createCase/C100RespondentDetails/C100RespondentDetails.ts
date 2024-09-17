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

interface C100RespondentDetailsOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  yesNoRespondentDetailsC100: boolean;
  respondentGender: C100RespondentGender;
  respondentAddress5Years: C100RespondentAddress5Years;
  respondentLegalRepresentation: C100RespondentLegalRepresentation;
  subJourney: boolean;
}

export class C100RespondentDetails {
  public static async c100RespondentDetails({
    page: page,
    user: user,
    accessibilityTest: accessibilityTest,
    yesNoRespondentDetailsC100: yesNoRespondentDetailsC100,
    respondentGender: respondentGender,
    respondentAddress5Years: respondentAddress5Years,
    respondentLegalRepresentation: respondentLegalRepresentation,
    subJourney: subJourney,
  }: C100RespondentDetailsOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: user,
        accessibilityTest: false,
        solicitorCaseType: "C100",
        errorMessaging: false,
      });
    }
    await Helpers.selectSolicitorEvent(page, "Respondent details");
    await RespondentDetails1Page.respondent1DetailsPage({
      page,
      accessibilityTest,
      yesNoRespondentDetailsC100,
      respondentGender,
      respondentAddress5Years,
      respondentLegalRepresentation,
    });
  }
}
