import { ApplicantGender, UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { FL401TypeOfApplication } from "./FL401TypeOfApplication/FL401TypeOfApplication";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";
import { FL401RespondentDetails } from "./FL401RespondentDetails/FL401RespondentDetails";
import { FL401WithoutNoticeOrder } from "./FL401WithoutNoticeOrder/FL401WIthoutNoticeOrder";
import { FL401ApplicantDetails } from "./FL401ApplicantDetails/FL401ApplicantDetails";

export type bailConditionRadios = "Yes" | "No" | "Don't know";

interface fl401Options {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  isLinkedToC100: boolean;
  respondentDetailsAllOptionsYes: boolean;
  yesNoFL401ApplicantDetails: boolean,
  applicantGender: ApplicantGender,
  isWithoutNoticeDetailsYes: boolean;
  isWithoutNoticeDetailsBailConditions: bailConditionRadios
}

export class FL401 {
  public static async fl401({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    isLinkedToC100,
    respondentDetailsAllOptionsYes,
    yesNoFL401ApplicantDetails,
    applicantGender
    isWithoutNoticeDetailsYes,
    isWithoutNoticeDetailsBailConditions
  }: fl401Options): Promise<void> {
    await SolicitorCreateInitial.createInitialCase({
      page: page,
      user: user,
      accessibilityTest: false,
      solicitorCaseType: "FL401",
      errorMessaging: false,
    });
    await FL401TypeOfApplication.fl401TypeOfApplication({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      isLinkedToC100: isLinkedToC100,
      subJourney: false,
    });
    await FL401WithoutNoticeOrder.fl401WithoutNoticeOrder({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      isWithoutNoticeDetailsYes: isWithoutNoticeDetailsYes,
      isWithoutNoticeDetailsBailConditions: isWithoutNoticeDetailsBailConditions,
      subJourney: false,
    })
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoFL401ApplicantDetails: yesNoFL401ApplicantDetails,
      applicantGender: applicantGender,
      subJourney: false,
    })
    await FL401RespondentDetails.fl401RespondentDetails({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      respondentDetailsAllOptionsYes: respondentDetailsAllOptionsYes,
      subJourney: false,
    });
  }
}
