import { Page } from "@playwright/test";
import {
  ApplicantGender,
  Relationship,
  yesNoDontKnow,
} from "../../../../../common/types";
import { ApplicantAddressLookupPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantAddressLookupPage";
import { ApplicantAddressSelectPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantAddressSelectPage";
import { ApplicantPersonalDetailsPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantPersonalDetailsPage";
import { ApplicantRelationshipToChildPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantRelationshipToChildPage";
import { ApplicantAddressManualPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantAddressManualPage";
import { ApplicantContactDetailPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantContactDetailPage";
import { ApplicantContactPreferencePage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantContactPreferencePage";
import { RespondentDetailsAddRespondentsPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/respondentDetailsAddRespondentsPage";
import { RespondentDetailsPersonalDetailsPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/respondentDetailsPersonalDetailsPage";
import { RespondentDetailsAddressLookupPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/respondentDetailsAddressLookupPage";
import { RespondentDetailsAddressSelectPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/respondentDetailsAddressSelectPage";
import { RespondentDetailsAddressManualPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/respondentDetailsAddressManualPage";
import { RespondentDetailsContactDetailsPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/respondentDetailsContactDetailsPage";
import { OtherPersonDetailsAddOtherPersonsPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/otherPersonDetailsAddOtherPersonsPage";
import { OtherPersonDetailsCheckPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/otherPersonDetailsCheckPage";

interface c100CasePartyDetailsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  applicantChangedName: boolean;
  applicantGender: ApplicantGender;
  applicantRelationship: Relationship;
  applicantAddressLookup: boolean;
  appAddressLookupSuccessful: boolean;
  applicantPrevAddress5Years: boolean;
  applicantEmailTelephoneVoicemail: boolean;
  applicantDigitalPreference: boolean;
  respondentKnownDoB: boolean;
  respondentKnownPlaceOfBirth: boolean;
  respondentGender: ApplicantGender;
  respondentChangedName: yesNoDontKnow;
  respAddress5Years: yesNoDontKnow;
  respAddressLookup: boolean;
  respAddressLookupSuccessful: boolean;
  respKnownEmailAndPhone: boolean;
  yesNoOtherPersonDetails: boolean;
}

export class C100CasePartyDetails {
  public static async C100CasePartyDetails({
    page,
    accessibilityTest,
    errorMessaging,
    applicantChangedName,
    applicantGender,
    applicantRelationship,
    applicantAddressLookup,
    appAddressLookupSuccessful,
    applicantPrevAddress5Years,
    applicantEmailTelephoneVoicemail,
    applicantDigitalPreference,
    respondentKnownDoB,
    respondentKnownPlaceOfBirth,
    respondentChangedName,
    respondentGender,
    respAddress5Years,
    respAddressLookup,
    respAddressLookupSuccessful,
    respKnownEmailAndPhone,
    yesNoOtherPersonDetails,
  }: c100CasePartyDetailsOptions): Promise<void> {
    await ApplicantPersonalDetailsPage.applicantPersonalDetailsPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      changeNameYesNo: applicantChangedName,
      gender: applicantGender,
      under18: false,
    });
    await ApplicantRelationshipToChildPage.applicantRelationshipToChildPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      relationship: applicantRelationship,
    });
    await ApplicantAddressLookupPage.applicantAddressLookupPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      addressLookup: applicantAddressLookup,
    });
    await ApplicantAddressSelectPage.applicantAddressSelectPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      addressLookupSuccessful: appAddressLookupSuccessful,
    });
    await ApplicantAddressManualPage.applicantAddressManualPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      prevAddress5Years: applicantPrevAddress5Years,
    });
    await ApplicantContactDetailPage.applicantContactDetailPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      provideEmailTelephoneVoicemail: applicantEmailTelephoneVoicemail,
    });
    await ApplicantContactPreferencePage.applicantContactPreferencePage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      digitalPreference: applicantDigitalPreference,
    });
    await RespondentDetailsAddRespondentsPage.respondentDetailsAddRespondentsPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
      },
    );
    await RespondentDetailsPersonalDetailsPage.respondentDetailsPersonalDetailsPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        changeNameYesNoDontKnow: respondentChangedName,
        respondentGender: respondentGender,
        knownDob: respondentKnownDoB,
        knownPlaceOfBirth: respondentKnownPlaceOfBirth,
      },
    );
    await RespondentDetailsAddressLookupPage.respondentDetailsAddressLookupPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        addressLookup: respAddressLookup,
      },
    );
    await RespondentDetailsAddressSelectPage.respondentDetailsAddressSelectPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        addressLookupSuccessful: respAddressLookupSuccessful,
      },
    );

    await RespondentDetailsAddRespondentsPage.respondentDetailsAddRespondentsPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
      },
    );
    await RespondentDetailsAddressManualPage.respondentDetailsAddressManualPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        respAddress5Years: respAddress5Years,
      },
    );
    await RespondentDetailsContactDetailsPage.respondentDetailsContactDetailsPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        dontKnowEmailAndTelephone: respKnownEmailAndPhone,
      },
    );
    await OtherPersonDetailsCheckPage.otherPersonDetailsCheckPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoOtherPersonDetails: yesNoOtherPersonDetails,
    });
    if (yesNoOtherPersonDetails) {
      await OtherPersonDetailsAddOtherPersonsPage.otherPersonDetailsAddOtherPersonsPage(
        {
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
        },
      );
    }
  }
}
