import { ApplicantGender } from "../../../../common/types.ts";
import { C100ApplicantDetailsData } from "../../../../pageObjects/pages/exui/createCase/applicantDetails/c100ApplicantDetails1.po.ts";
import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

type TestTag =
  | "@accessibility"
  | "@errorMessage"
  | "@nightly"
  | "@regression";

interface ApplicantDetailsScenario {
  description: string;
  applicantGender: ApplicantGender;
  answerYesToAll: boolean;
  checkErrorMessages: boolean;
  snapshotName: string;
  tags: TestTag[];
}

const snapshotPath = ["createCase", "C100", "applicantDetails"];

const applicantDetails: C100ApplicantDetailsData = {
  firstName: "AutomatedApplicant",
  lastName: "TestApplicantLastName",
  previousName: "CaseApplicantPrevName",
  dateOfBirth: {
    day: "1",
    month: "1",
    year: "2020",
    displayValue: "1 Jan 2020",
  },
  otherGender: "Other",
  placeOfBirth: "London",
  address: {
    postcode: "SW1A 1AA",
    selection: "Buckingham Palace, London",
    buildingAndStreet: "Buckingham Palace",
    townOrCity: "London",
    country: "United Kingdom",
  },
  previousAddresses: "Lorem ipsum last 5 years",
  email: "appautomated@test.com",
  phoneNumber: "0123456789",
  representative: {
    firstName: "Automated representative",
    lastName: "TestrepresentativeLastName",
    email: "repautomated@test.com",
    reference: "A reference",
    organisationSearch: "Test",
    dxNumber: "1234",
  },
};

const scenarios: ApplicantDetailsScenario[] = [
  {
    description: "no answers and other gender",
    applicantGender: "other",
    answerYesToAll: false,
    checkErrorMessages: false,
    snapshotName: "c100-applicant-details-no-answers-other-gender",
    tags: ["@regression"],
  },
  {
    description: "yes answers, male gender and error validation",
    applicantGender: "male",
    answerYesToAll: true,
    checkErrorMessages: true,
    snapshotName: "c100-applicant-details-yes-answers-male-gender",
    tags: ["@regression", "@errorMessage"],
  },
  {
    description: "yes answers and female gender",
    applicantGender: "female",
    answerYesToAll: true,
    checkErrorMessages: false,
    snapshotName: "c100-applicant-details-yes-answers-female-gender",
    tags: ["@accessibility", "@nightly"],
  },
];

test.describe("C100 Create case - Applicant Details tests", () => {
  let caseRef: string;

  test.beforeEach(
    async ({ solicitor, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (
        await manageCasesEventUtils.createBlankSolicitorCase("C100")
      ).caseRef;
      await navigationUtils.goToCase(
        solicitor.page,
        config.manageCasesBaseURLCase,
        caseRef,
        "tasks",
      );
    },
  );

  scenarios.forEach(
    ({
      description,
      applicantGender,
      answerYesToAll,
      checkErrorMessages,
      snapshotName,
      tags,
    }) => {
      test(
        `Complete the C100 applicant details event with ${description}.`,
        { tag: [...tags] },
        async ({ solicitor }): Promise<void> => {
          const { tasksPage, c100ApplicantDetails, summaryPage } = solicitor;

          await tasksPage.chooseEventFromDropdown("Applicant details");

          await c100ApplicantDetails.page1.assertPageContents();
          await c100ApplicantDetails.page1.verifyAccessibility();
          await c100ApplicantDetails.page1.checkErrorMessages(
            checkErrorMessages,
          );
          await c100ApplicantDetails.page1.fillInFields({
            applicantDetails,
            applicantGender,
            answerYesToAll,
          });
          await c100ApplicantDetails.page1.clickContinue();

          await c100ApplicantDetails.submitPage.assertApplicantDetails(
            applicantDetails,
            applicantGender,
            answerYesToAll,
            snapshotPath,
            snapshotName,
          );
          // Accessibility is disabled on this EXUI check-your-answers page until FPET-1135 is fixed.
          await c100ApplicantDetails.submitPage.clickSaveAndContinue();

          await summaryPage.alertBanner.assertEventAlert(
            caseRef,
            "Applicant details",
          );
        },
      );
    },
  );
});
