import { ApplicantGender, UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { FL401TypeOfApplication } from "./FL401TypeOfApplication/FL401TypeOfApplication";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";
import { FL401RespondentDetails } from "./FL401RespondentDetails/FL401RespondentDetails";
import { FL401WithoutNoticeOrder } from "./FL401WithoutNoticeOrder/FL401WIthoutNoticeOrder";
import { FL401ApplicantDetails } from "./FL401ApplicantDetails/FL401ApplicantDetails";
import { FL401ApplicantsFamily } from "./FL401ApplicantsFamily/FL401ApplicantsFamily";
import { FL401RelationshipToRespondent } from "./FL401RelationshipToRespondent/FL401RelationshipToRespondent";

export type relationshipToRespondent =
  | "Married or in a civil partnership"
  | "Formerly married or in a civil partnership"
  | "Engaged or proposed civil partnership"
  | "Formerly engaged or proposed civil partnership"
  | "Live together as a couple"
  | "Formerly lived together as a couple"
  | "Boyfriend, girlfriend or partner who does not live with them"
  | "Formerly boyfriend, girlfriend or partner who has not lived with them"
  | "None of the above";

export type respondentRelationshipOther =
  | "Father"
  | "Mother"
  | "Son"
  | "Daughter"
  | "Brother"
  | "Sister"
  | "Grandfather"
  | "Grandmother"
  | "Uncle"
  | "Aunt"
  | "Nephew"
  | "Niece"
  | "Cousin"
  | "Other";

export type bailConditionRadios = "Yes" | "No" | "Don't know";

interface fl401Options {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  isLinkedToC100: boolean;
  respondentDetailsAllOptionsYes: boolean;
  applicantHasChildren: boolean;
  yesNoFL401ApplicantDetails: boolean;
  applicantGender: ApplicantGender;
  isWithoutNoticeDetailsYes: boolean;
  isWithoutNoticeDetailsBailConditions: bailConditionRadios;
  relationshipToRespondent: relationshipToRespondent;
  relationshipToRespondentOther?: respondentRelationshipOther;
}

export class FL401 {
  public static async fl401({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    isLinkedToC100,
    respondentDetailsAllOptionsYes,
    applicantHasChildren,
    yesNoFL401ApplicantDetails,
    applicantGender,
    isWithoutNoticeDetailsYes,
    isWithoutNoticeDetailsBailConditions,
    relationshipToRespondent,
    relationshipToRespondentOther
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
    });
    await FL401RespondentDetails.fl401RespondentDetails({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      respondentDetailsAllOptionsYes: respondentDetailsAllOptionsYes,
      subJourney: false,
    });
    await FL401ApplicantsFamily.fl401ApplicantsFamily({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      applicantHasChildren: applicantHasChildren,
      subJourney: false,
    });
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      relationshipToRespondent: relationshipToRespondent,
      relationshipToRespondentOther: relationshipToRespondentOther,
      subJourney: false
    });
  }
}