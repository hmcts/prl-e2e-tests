import { C100HearingUrgencyData } from "../../../../pageObjects/pages/exui/createCase/hearingUrgency/c100HearingUrgency1.po.ts";
import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

type TestTag = "@accessibility" | "@errorMessage" | "@nightly" | "@regression";

interface HearingUrgencyScenario {
  description: string;
  answerYesToAll: boolean;
  checkErrorMessages: boolean;
  snapshotName: string;
  tags: TestTag[];
}

const snapshotPath = ["createCase", "C100", "hearingUrgency"];

const hearingUrgency: C100HearingUrgencyData = {
  urgencyTimeAndReason: "Needs to be heard within 2 days due to risk of harm",
  effortsToNotifyRespondents: "Respondent notified by email and phone",
  withoutNoticeReasons: "Notifying the respondent would put the child at risk",
  reducedNoticeReasons: "The hearing is needed before the usual notice period",
};

const scenarios: HearingUrgencyScenario[] = [
  {
    description: "yes answers",
    answerYesToAll: true,
    checkErrorMessages: false,
    snapshotName: "c100-hearing-urgency-yes-answers",
    tags: ["@regression", "@accessibility", "@nightly"],
  },
  {
    description: "no answers",
    answerYesToAll: false,
    checkErrorMessages: false,
    snapshotName: "c100-hearing-urgency-no-answers",
    tags: ["@regression"],
  },
  {
    description: "yes answers and error validation",
    answerYesToAll: true,
    checkErrorMessages: true,
    snapshotName: "c100-hearing-urgency-yes-answers-error-validation",
    tags: ["@regression", "@errorMessage"],
  },
];

test.describe("C100 Create case - Hearing Urgency tests", () => {
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
      description,
      answerYesToAll,
      checkErrorMessages,
      snapshotName,
      tags,
    }) => {
      test(
        `Complete the C100 hearing urgency event with ${description}.`,
        { tag: [...tags] },
        async ({ solicitor }): Promise<void> => {
          const { tasksPage, c100HearingUrgency, summaryPage } = solicitor;

          await tasksPage.chooseEventFromDropdown("Hearing urgency");

          await c100HearingUrgency.page1.assertPageContents();
          await c100HearingUrgency.page1.verifyAccessibility();
          await c100HearingUrgency.page1.checkErrorMessages(checkErrorMessages);
          await c100HearingUrgency.page1.fillInFields(
            answerYesToAll,
            hearingUrgency,
          );
          await c100HearingUrgency.page1.clickContinue();

          await c100HearingUrgency.submitPage.assertHearingUrgencyAnswers(
            hearingUrgency,
            answerYesToAll,
            snapshotPath,
            snapshotName,
          );
          await c100HearingUrgency.submitPage.verifyAccessibility();
          await c100HearingUrgency.submitPage.clickSaveAndContinue();

          await summaryPage.alertBanner.assertEventAlert(
            caseRef,
            "Hearing urgency",
          );
        },
      );
    },
  );
});
