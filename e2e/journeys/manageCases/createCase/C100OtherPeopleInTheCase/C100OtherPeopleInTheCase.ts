import { Page } from "@playwright/test";
import { ApplicantGender } from "../../../../pages/manageCases/createCase/C100/applicantDetails/applicantDetails1Page";
import { UserRole } from "../../../../common/types";
import { Helpers } from "../../../../common/helpers";
import {
  OtherPeopleInTheCase1Page
} from "../../../../pages/manageCases/createCase/C100/otherPeopleInTheCase/otherPeopleInTheCase1Page";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import {
  OtherPeopleInTheCaseSubmitPage
} from "../../../../pages/manageCases/createCase/C100/otherPeopleInTheCase/otherPeopleInTheCaseSubmitPage";

interface c100OtherPeopleInTheCaseOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoOtherPeopleInTheCase: boolean;
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
      await Helpers.selectSolicitorEvent(page, "Hearing urgency");
      await OtherPeopleInTheCase1Page.otherPeopleInTheCase1Page(
        page,
        accessibilityTest,
        errorMessaging,
        yesNoOtherPeopleInTheCase,
        applicantGender
      );
      await OtherPeopleInTheCaseSubmitPage.otherPeopleInTheCaseSubmitPage(
        page,
        accessibilityTest,
        yesNoOtherPeopleInTheCase,
        applicantGender,
      );
    }
  }
}
