import { Page } from "@playwright/test";
import { PersonalDetailsPage } from "../../../../pages/citizen/createCase/C100/casePartyDetails/personalDetailsPage";
import { ApplicantPage } from "../../../../pages/citizen/createCase/C100/casePartyDetails/applicantPage";
import { ApplicantGender } from "../../../../common/types";
import { Relationship } from "../../../../common/types";

interface c100CasePartyDetailsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  changeName: boolean;
  gender: ApplicantGender;
  under18: boolean;
  placeOfBirth: string;
  relationship: Relationship;
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
  }: c100CasePartyDetailsOptions): Promise<void> {
    await PersonalDetailsPage.personalDetailsPage({
      page,
      accessibilityTest,
      errorMessaging,
      changeName,
      gender,
      under18,
      placeOfBirth,
    });

    await ApplicantPage.ApplicantPage({
      page,
      accessibilityTest,
      errorMessaging,
      relationship,
    });
  }
}
