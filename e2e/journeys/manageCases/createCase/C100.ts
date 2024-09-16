import { UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";
import { C100TypeOfApplication } from "./C100TypeOfApplication/C100TypeOfAplication";
import { C100HearingUrgency } from "./C100HearingUrgency/C100HearingUrgency";
import { C100ApplicantDetails } from "./C100ApplicantDetails/c100ApplicantDetails";
import { ApplicantGender } from "../../../pages/manageCases/createCase/C100/applicantDetails/applicantDetails1Page";
import {
  typeOfChildArrangementOrderID
} from "../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationType1Page";

export class C100 {
  public static async c100(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    yesNo: boolean,
    yesNoApplicantDetails: boolean,
    applicantGender: ApplicantGender,
    typeOfChildArrangementOrder: typeOfChildArrangementOrderID,
  ): Promise<void> {
    await SolicitorCreateInitial.createInitialCase(
      page,
      user,
      false,
      "C100",
      false,
    );
    await C100TypeOfApplication.c100TypeOfApplication(
      page,
      errorMessaging,
      accessibilityTest,
      yesNo,
      typeOfChildArrangementOrder
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
