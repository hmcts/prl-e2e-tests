import { C100AttendingTheHearingData } from "../../../../pageObjects/pages/exui/createCase/attendingTheHearing/c100AttendingTheHearing1.po.ts";
import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

type TestTag = "@accessibility" | "@errorMessage" | "@nightly" | "@regression";

interface AttendingTheHearingScenario {
  answerYesToAll: boolean;
  checkErrorMessages: boolean;
  description: string;
  snapshotName: string;
  tags: TestTag[];
}

const snapshotPath = ["createCase", "C100", "attendingTheHearing"];

const attendingTheHearingData: C100AttendingTheHearingData = {
  whoNeedsWelsh: "Automated Tester",
  interpreter: {
    relationship: "Automated Interpreter",
    language: "Automated Language",
    assistance: "Automated Assistance",
  },
  adjustments: "Automated Adjustments",
  specialArrangements: "Automated Arrangements",
  intermediaryReasons: "Intermediary Reasons",
};

const scenarios: AttendingTheHearingScenario[] = [
  {
    answerYesToAll: false,
    checkErrorMessages: false,
    description: "no answers",
    snapshotName: "c100-attending-the-hearing-no-answers",
    tags: ["@regression"],
  },
  {
    answerYesToAll: true,
    checkErrorMessages: false,
    description: "yes answers",
    snapshotName: "c100-attending-the-hearing-yes-answers",
    tags: ["@regression", "@accessibility", "@nightly"],
  },
  {
    answerYesToAll: true,
    checkErrorMessages: true,
    description: "yes answers and error validation",
    snapshotName: "c100-attending-the-hearing-yes-answers",
    tags: ["@regression", "@errorMessage"],
  },
];

test.describe("C100 Create case - Attending the hearing tests", () => {
  let caseRef: string;

  test.beforeEach(
    async ({ solicitor, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.createBlankSolicitorCase("C100"))
        .caseRef;
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
      answerYesToAll,
      checkErrorMessages,
      description,
      snapshotName,
      tags,
    }) => {
      test(
        `Complete Attending the hearing with ${description}.`,
        { tag: [...tags] },
        async ({ solicitor }): Promise<void> => {
          const { c100AttendingTheHearing, summaryPage, tasksPage } = solicitor;

          await tasksPage.chooseEventFromDropdown("Attending the hearing");

          await c100AttendingTheHearing.page1.assertPageContents();
          await c100AttendingTheHearing.page1.verifyAccessibility();
          await c100AttendingTheHearing.page1.checkErrorMessages(
            checkErrorMessages,
          );
          await c100AttendingTheHearing.page1.fillInFields({
            answerYesToAll,
            attendingTheHearingData,
          });
          await c100AttendingTheHearing.page1.clickContinue();

          await c100AttendingTheHearing.submitPage.assertAttendingTheHearingAnswers(
            attendingTheHearingData,
            answerYesToAll,
            snapshotPath,
            snapshotName,
          );
          await c100AttendingTheHearing.submitPage.verifyAccessibility();
          await c100AttendingTheHearing.submitPage.clickSaveAndContinue();

          await summaryPage.alertBanner.assertEventAlert(
            caseRef,
            "Attending the hearing",
          );
        },
      );
    },
  );
});
