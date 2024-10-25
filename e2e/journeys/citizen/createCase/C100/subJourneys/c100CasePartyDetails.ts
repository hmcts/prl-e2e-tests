import { Page } from "@playwright/test";
import { ApplicantGender, Relationship } from "../../../../../common/types";
import { ApplicantAddressLookupPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantAddressLookupPage";
import { ApplicantAddressSelectPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantAddressSelectPage";
import { ApplicantPersonalDetailsPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantPersonalDetailsPage";
import { ApplicantRelationshipToChildPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantRelationshipToChildPage";

import {
  ApplicantAddressManualPage
} from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantAddressManualPage";
import {ApplicantContactDetailPage} from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantContactDetailPage";
import {
  ApplicantContactPreferencePage
} from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantContactPreferencePage";
import {RespondentDetailsAddRespondentsPage} from "../../../../../pages/citizen/createCase/C100/casePartyDetails/respondentDetailsAddRespondentsPage";

interface c100CasePartyDetailsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  changeName: boolean;
  gender: ApplicantGender;
  under18: boolean;
  placeOfBirth: string;
  relationship: Relationship;
  addressLookup: boolean;
  addressLookupSuccessful: boolean;
  prevAddress5Years: boolean
  provideEmailTelephoneVoicemail: boolean;
  digitalPreference: boolean;
}

export class C100CasePartyDetails {
  public static async C100CasePartyDetails({
    page,
    accessibilityTest,
    errorMessaging,
    changeName,
    gender,
    under18,
    placeOfBirth,
    relationship,
    addressLookup,
    addressLookupSuccessful,
    prevAddress5Years,
    provideEmailTelephoneVoicemail,
    digitalPreference,

  }: c100CasePartyDetailsOptions): Promise<void> {
    await ApplicantPersonalDetailsPage.applicantPersonalDetailsPage({
      page,
      accessibilityTest,
      errorMessaging,
      changeName,
      gender,
      under18,
      placeOfBirth,
    });

    await ApplicantRelationshipToChildPage.applicantRelationshipToChildPage({
      page,
      accessibilityTest,
      errorMessaging,
      relationship,
    });

    await ApplicantAddressLookupPage.applicantAddressLookupPage({
      page,
      accessibilityTest,
      errorMessaging,
      addressLookup,
    });

    await ApplicantAddressSelectPage.applicantAddressSelectPage({
      page,
      accessibilityTest,
      errorMessaging,
      addressLookupSuccessful,
    });

    await ApplicantAddressManualPage.applicantAddressManualPage({
      page,
      accessibilityTest,
      errorMessaging,
      prevAddress5Years,
    });

    await ApplicantContactDetailPage.applicantContactDetailPage({
      page,
      accessibilityTest,
      errorMessaging,
      provideEmailTelephoneVoicemail,
    });

    await ApplicantContactPreferencePage.applicantContactPreferencePage({
      page,
      accessibilityTest,
      errorMessaging,
      digitalPreference,
    });

    await RespondentDetailsAddRespondentsPage.respondentDetailsAddRespondentsPage({
      page,
      accessibilityTest,
      errorMessaging,
    });
  }
}
