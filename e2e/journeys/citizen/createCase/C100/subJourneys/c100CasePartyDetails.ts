import { Page } from "@playwright/test";
import {
  ApplicantGender,
  Relationship,
  typeOfPerson,
  yesNoDontKnow,
} from "../../../../../common/types";
import { ApplicantAddressLookupPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicant/applicantAddressLookupPage.ts";
import { ApplicantAddressSelectPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicant/applicantAddressSelectPage.ts";
import { ApplicantPersonalDetailsPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicant/applicantPersonalDetailsPage.ts";
import { ApplicantRelationshipToChildPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicant/applicantRelationshipToChildPage.ts";
import { ApplicantStayingInRefugePage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicant/applicantStayingInRefugePage.ts";
import { ApplicantKeepingDetailsSafePage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicant/applicantKeepingDetailsSafePage.ts";
import { ApplicantUploadC8FormPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicant/applicantUploadC8FormPage.ts";
import { ApplicantAddressManualPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicant/applicantAddressManualPage.ts";
import { ApplicantContactDetailPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicant/applicantContactDetailPage.ts";
import { ApplicantContactPreferencePage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicant/applicantContactPreferencePage.ts";
import { RespondentDetailsAddRespondentsPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/respondent/respondentDetailsAddRespondentsPage.ts";
import { RespondentDetailsPersonalDetailsPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/respondent/respondentDetailsPersonalDetailsPage.ts";
import { RespondentDetailsAddressLookupPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/respondent/respondentDetailsAddressLookupPage.ts";
import { RespondentDetailsAddressSelectPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/respondent/respondentDetailsAddressSelectPage.ts";
import { RespondentDetailsAddressManualPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/respondent/respondentDetailsAddressManualPage.ts";
import { RespondentDetailsContactDetailsPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/respondent/respondentDetailsContactDetailsPage.ts";
import { OtherPersonDetailsAddOtherPersonsPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonDetailsAddOtherPersonsPage.ts";
import { OtherPersonDetailsCheckPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonDetailsCheckPage.ts";
import { PersonalDetailsPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/otherPeople/personalDetailsPage";
import { OtherPersonRelationshipPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonRelationshipPage";
import { OtherPersonStayingInRefugePage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonStayingInRefugePage";
import { OtherPersonKeepingDetailsSafePage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonKeepingDetailsSafePage";
import { OtherPersonUploadC8FormPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonUploadC8FormPage";
import { OtherPersonAddressLookupPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonAddressLookupPage";
import { OtherPersonSelectPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonSelectPage";
import { OtherPersonManualPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonManualPage";
import { MainlyLiveWithPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/otherPeople/mainlyLiveWithPage";
import { LivingArrangementsPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/otherPeople/livingArrangementsPage";
import { RespondentRelationshipToChildPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/respondent/respondentDetailsRelationshipToChildPage.ts";
import { OtherPersonDetailsConfidentiality } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonDetailsConfidentialityPage.ts";

interface c100CasePartyDetailsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  applicantChangedName: boolean;
  applicantGender: ApplicantGender;
  applicantRelationship: Relationship;
  applicantLivesInRefuge: boolean;
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
  respondentRelationship: Relationship;
  respAddressLookup: boolean;
  respAddressLookupSuccessful: boolean;
  respKnownEmailAndPhone: boolean;
  yesNoOtherPersonDetails: boolean;
  c100OtherPeopleGender: ApplicantGender;
  c100OtherPeopleChangedName: yesNoDontKnow;
  c100OtherPeopleDoBKnown: boolean;
  c100OtherPersonRelationship: Relationship;
  c100OtherPersonLivesInRefuge: boolean;
  c100ChildMainlyLivesWith: typeOfPerson;
  C100YesNoConfidentiality: boolean;
}

export class C100CasePartyDetails {
  public static async C100CasePartyDetails({
    page,
    accessibilityTest,
    errorMessaging,
    applicantChangedName,
    applicantGender,
    applicantRelationship,
    applicantLivesInRefuge,
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
    respondentRelationship,
    respAddressLookup,
    respAddressLookupSuccessful,
    respKnownEmailAndPhone,
    yesNoOtherPersonDetails,
    c100OtherPeopleGender,
    c100OtherPeopleChangedName,
    c100OtherPeopleDoBKnown,
    c100OtherPersonRelationship,
    c100OtherPersonLivesInRefuge,
    c100ChildMainlyLivesWith,
    C100YesNoConfidentiality,
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
    await ApplicantStayingInRefugePage.applicantStayingInRefugePage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      applicantLivesInRefuge: applicantLivesInRefuge,
    });
    if (applicantLivesInRefuge) {
      await ApplicantKeepingDetailsSafePage.applicantKeepingDetailsSafePage({
        page: page,
        accessibilityTest: accessibilityTest,
      });
      await ApplicantUploadC8FormPage.applicantUploadC8FormPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
      });
    }
    await ApplicantAddressLookupPage.applicantAddressLookupPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      addressLookup: applicantAddressLookup,
    });
    if (applicantAddressLookup) {
      await ApplicantAddressSelectPage.applicantAddressSelectPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        addressLookupSuccessful: appAddressLookupSuccessful,
      });
    }
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
    await RespondentRelationshipToChildPage.respondentRelationshipToChildPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      respondentRelationship: respondentRelationship,
    });
    await RespondentDetailsAddressLookupPage.respondentDetailsAddressLookupPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        addressLookup: respAddressLookup,
      },
    );
    if (respAddressLookup) {
      await RespondentDetailsAddressSelectPage.respondentDetailsAddressSelectPage(
        {
          page: page,
          accessibilityTest: accessibilityTest,
          addressLookupSuccessful: respAddressLookupSuccessful,
        },
      );
    }
    await RespondentDetailsAddressManualPage.respondentDetailsAddressManualPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        respAddress5Years: respAddress5Years,
        respAddressLookup: respAddressLookup,
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
      await PersonalDetailsPage.personalDetailsPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        c100OtherPeopleGender: c100OtherPeopleGender,
        c100OtherPeopleChangedName: c100OtherPeopleChangedName,
        c100OtherPeopleDoBKnown: c100OtherPeopleDoBKnown,
      });
      await OtherPersonRelationshipPage.otherPersonRelationshipPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        c100OtherPersonRelationship: c100OtherPersonRelationship,
      });
      await OtherPersonStayingInRefugePage.otherPersonStayingInRefugePage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        otherPersonLivesInRefuge: c100OtherPersonLivesInRefuge,
      });
      if (c100OtherPersonLivesInRefuge) {
        await OtherPersonKeepingDetailsSafePage.otherPersonKeepingDetailsSafePage(
          {
            page: page,
            accessibilityTest: accessibilityTest,
          },
        );
        await OtherPersonUploadC8FormPage.otherPersonUploadC8FormPage({
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
        });
      }
      await OtherPersonAddressLookupPage.otherPersonAddressLookupPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
      });
      await OtherPersonSelectPage.otherPersonSelectPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
      });
      await OtherPersonManualPage.otherPersonManualPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
      });
    } else {
      if (c100ChildMainlyLivesWith === "otherPerson") {
        throw new Error(
          `c100ChildMainlyLivesWith cannot be 'otherPerson' if yesNoOtherPersonDetails is set to false`,
        );
      }
    }
    await MainlyLiveWithPage.mainlyLiveWithPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ChildMainlyLivesWith: c100ChildMainlyLivesWith,
    });
    await LivingArrangementsPage.livingArrangementsPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoOtherPersonDetails: yesNoOtherPersonDetails,
      c100ChildMainlyLivesWith: c100ChildMainlyLivesWith,
    });
    if (c100ChildMainlyLivesWith === "otherPerson") {
      await OtherPersonDetailsConfidentiality.otherPersonDetailsConfidentiality(
        {
          page: page,
          accessibilityTest: accessibilityTest,
          C100YesNoConfidentiality: C100YesNoConfidentiality,
        },
      );
    }
  }
}
