import { ApplicantGender, UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";
import { C100HearingUrgency } from "./C100HearingUrgency/C100HearingUrgency";
import { C100ApplicantDetails } from "./C100ApplicantDetails/c100ApplicantDetails";

export class C100 {
  public static async c100(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    yesNo: boolean,
    yesNoApplicantDetails: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await SolicitorCreateInitial.createInitialCase(
      page,
      user,
      false,
      "C100",
      false,
    );
    await C100HearingUrgency.c100HearingUrgency(
      page,
      user,
      accessibilityTest,
      errorMessaging,
      yesNo,
    );
    await C100ApplicantDetails.C100ApplicantDetails(
      page,
      user,
      accessibilityTest,
      errorMessaging,
      yesNoApplicantDetails,
      applicantGender,
    );
  }
}
