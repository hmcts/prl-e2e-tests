import { Page } from "@playwright/test";
import { ApplicantPersonalDetailsPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantPersonalDetailsPage";
import { ApplicantRelationshipToChildPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantRelationshipToChildPage";
import { ApplicantGender, Relationship } from "../../../../../common/types";
import { ApplicantAddressLookupPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantAddressLookupPage";
import { ApplicantAddressSelectPage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicantAddressSelectPage";

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
  }
}
