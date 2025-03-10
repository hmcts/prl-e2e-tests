import { test } from "@playwright/test";
import { C100ChildrenAndApplicants } from "../../../../journeys/manageCases/createCase/C100ChildrenAndApplicants/C100ChildrenAndApplicants";
import { C100ChildDetails } from "../../../../journeys/manageCases/createCase/C100ChildDetails/c100ChildDetails.ts";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";
import { C100ApplicantDetails } from "../../../../journeys/manageCases/createCase/C100ApplicantDetails/c100ApplicantDetails.ts";

test.describe("C100 Create case children and applicants tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "C100",
    });
    //must complete applicant and child details before children and applicants event
    await C100ApplicantDetails.C100ApplicantDetails({
      page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoApplicantDetails: true,
      applicantGender: "male",
    });
    await C100ChildDetails.c100ChildDetails({
      page: page,
      accessibilityTest: true,
      c100ChildGender: "female",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "no",
    });
  });
  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the relationship to Father,
  Setting the child to live with the applicant. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantChildRelationship: "Father",
      childLiveWithApplicant: true,
    });
  });

  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the relationship to Mother,
  Setting the child to live with the applicant. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantChildRelationship: "Mother",
      childLiveWithApplicant: true,
    });
  });

  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the relationship to Step-father,
  Setting the child to live with the applicant. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantChildRelationship: "Step-father",
      childLiveWithApplicant: true,
    });
  });

  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the relationship to Step-mother,
  Setting the child to live with the applicant. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantChildRelationship: "Step-mother",
      childLiveWithApplicant: true,
    });
  });

  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the relationship to Grandparent,
  Setting the child to live with the applicant. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantChildRelationship: "Grandparent",
      childLiveWithApplicant: true,
    });
  });

  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the relationship to Guardian,
  Setting the child to live with the applicant. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantChildRelationship: "Guardian",
      childLiveWithApplicant: true,
    });
  });

  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the relationship to Special Guardian,
  Setting the child to live with the applicant. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantChildRelationship: "Special Guardian",
      childLiveWithApplicant: true,
    });
  });

  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the relationship to Other,
  Setting the child to live with the applicant. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantChildRelationship: "Other",
      childLiveWithApplicant: true,
    });
  });

  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Setting the relationship to Other,
  Setting the child to live with the applicant. @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      applicantChildRelationship: "Other",
      childLiveWithApplicant: true,
    });
  });
});

test(`C100 children and applicants event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Setting the relationship to Other,
  Setting the child to live with the applicant. @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    applicantChildRelationship: "Other",
    childLiveWithApplicant: true,
  });
});
