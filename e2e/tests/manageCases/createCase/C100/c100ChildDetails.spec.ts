import { test } from "@playwright/test";
import { C100ChildDetails } from "../../../../journeys/manageCases/createCase/C100ChildDetails/c100ChildDetails";
import Config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case child details tests @manageCases", (): void => {
  test(`Complete the C100 child details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Answering yes to all additional questions,
  Setting the child Gender to male. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100ChildDetails.c100ChildDetails({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      c100ChildGender: "male",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "yes",
      subJourney: true,
    });
  });

  test(`Complete the C100 child details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Answering no to all additional questions,
  Setting the child Gender to female.`, async ({ page }): Promise<void> => {
    await C100ChildDetails.c100ChildDetails({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      c100ChildGender: "female",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "no",
      subJourney: true,
    });
  });

  test(`Complete the C100 child details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Answering don't know to all additional questions,
  Setting the child Gender to other.`, async ({ page }): Promise<void> => {
    await C100ChildDetails.c100ChildDetails({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      c100ChildGender: "other",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "dontKnow",
      subJourney: true,
    });
  });
});

test(`Accessibility test the C100 child details event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Answering no to all additional questions,
  Setting the child Gender to female. @accessibilityManageCases`, async ({
  page,
}): Promise<void> => {
  await C100ChildDetails.c100ChildDetails({
    page: page,
    user: "solicitor",
    accessibilityTest: true,
    c100ChildGender: "female",
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "no",
    subJourney: true,
  });
});
