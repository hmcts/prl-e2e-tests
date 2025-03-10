import { test } from "@playwright/test";
import { C100ChildDetails } from "../../../../journeys/manageCases/createCase/C100ChildDetails/c100ChildDetails";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";
import { C100ApplicantDetails } from "../../../../journeys/manageCases/createCase/C100ApplicantDetails/c100ApplicantDetails.ts";

test.describe("C100 Create case child details tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "C100",
    });
    await C100ApplicantDetails.C100ApplicantDetails({
      page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoApplicantDetails: true,
      applicantGender: "male",
    });
  });
  test(`Complete the C100 child details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Answering yes to all additional questions,
  Setting the child Gender to male. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100ChildDetails.c100ChildDetails({
      page: page,
      accessibilityTest: false,
      c100ChildGender: "male",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "yes",
    });
  });

  test(`Complete the C100 child details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Answering no to all additional questions,
  Setting the child Gender to female. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100ChildDetails.c100ChildDetails({
      page: page,
      accessibilityTest: false,
      c100ChildGender: "female",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "no",
    });
  });

  test(`Complete the C100 child details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Answering don't know to all additional questions,
  Setting the child Gender to other. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100ChildDetails.c100ChildDetails({
      page: page,
      accessibilityTest: false,
      c100ChildGender: "other",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "dontKnow",
    });
  });
});

test(`C100 child details event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Answering no to all additional questions,
  Setting the child Gender to female. @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await C100ChildDetails.c100ChildDetails({
    page: page,
    accessibilityTest: true,
    c100ChildGender: "female",
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "no",
  });
});
