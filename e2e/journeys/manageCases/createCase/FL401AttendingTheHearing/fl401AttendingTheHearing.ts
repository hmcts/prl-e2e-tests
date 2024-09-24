import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { Helpers } from "../../../../common/helpers";
import {
  AttendingTheHearing1Page
} from "../../../../pages/manageCases/createCase/FL401/attendingTheHearing/attendingTheHearing1Page";

interface Fl401AttendingTheHearingOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  fl401AttendingTheHearingYesNo: boolean;
  subJourney: boolean
}

export class Fl401AttendingTheHearing {
  public static async fl401AttendingTheHearing({
    page,
    accessibilityTest,
    errorMessaging,
    fl401AttendingTheHearingYesNo,
    subJourney
  }: Fl401AttendingTheHearingOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: 'solicitor',
        accessibilityTest: false,
        solicitorCaseType: 'FL401',
        errorMessaging: false
      })
    }
    await Helpers.selectSolicitorEvent(
      page,
      "Attending the hearing"
    );
    await AttendingTheHearing1Page.attendingTheHearing1Page({
      page,
      accessibilityTest,
      errorMessaging,
      fl401AttendingTheHearingYesNo
    });
  }
}