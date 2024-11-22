import { test } from "@playwright/test";
import { C100ChildrenAndApplicants } from "../../../../journeys/manageCases/createCase/C100ChildrenAndApplicants/C100ChildrenAndApplicants";
import Config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case children and applicants tests @manageCases", (): void => {
  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the relationship to Father,
  Setting the child to live with the applicant. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantChildRelationship: "Father",
      childLiveWithApplicant: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the relationship to Mother,
  Setting the child to live with the applicant.`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantChildRelationship: "Mother",
      childLiveWithApplicant: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the relationship to Step-father,
  Setting the child to live with the applicant.`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantChildRelationship: "Step-father",
      childLiveWithApplicant: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the relationship to Step-mother,
  Setting the child to live with the applicant.`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantChildRelationship: "Step-mother",
      childLiveWithApplicant: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the relationship to Grandparent,
  Setting the child to live with the applicant.`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantChildRelationship: "Grandparent",
      childLiveWithApplicant: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the relationship to Guardian,
  Setting the child to live with the applicant.`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantChildRelationship: "Guardian",
      childLiveWithApplicant: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the relationship to Special Guardian,
  Setting the child to live with the applicant.`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantChildRelationship: "Special Guardian",
      childLiveWithApplicant: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the relationship to Other,
  Setting the child to live with the applicant.`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantChildRelationship: "Other",
      childLiveWithApplicant: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 children and applicants event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Setting the relationship to Other,
  Setting the child to live with the applicant.`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantChildRelationship: "Other",
      childLiveWithApplicant: true,
      subJourney: true,
    });
  });
});

test(`Accessibility test the C100 children and applicants event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Setting the relationship to Other,
  Setting the child to live with the applicant. @accessibilityManageCases`, async ({
  page,
}): Promise<void> => {
  await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    applicantChildRelationship: "Other",
    childLiveWithApplicant: true,
    subJourney: true,
  });
});
