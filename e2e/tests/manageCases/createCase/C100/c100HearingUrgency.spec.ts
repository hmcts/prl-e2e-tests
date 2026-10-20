import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

interface HearingUrgencyScenario {
  description: string;
  answerYesToAll: boolean;
  checkErrorMessages: boolean;
  snapshotName: string;
  nightly: boolean;
}

const snapshotPath = ["createCase", "C100", "hearingUrgency"];

const scenarios: HearingUrgencyScenario[] = [
  {
    description: "yes answers",
    answerYesToAll: true,
    checkErrorMessages: false,
    snapshotName: "c100-hearing-urgency-yes-answers",
    nightly: true,
  },
  {
    description: "no answers",
    answerYesToAll: false,
    checkErrorMessages: false,
    snapshotName: "c100-hearing-urgency-no-answers",
    nightly: false,
  },
  {
    description: "yes answers and error validation",
    answerYesToAll: true,
    checkErrorMessages: true,
    snapshotName: "c100-hearing-urgency-yes-answers",
    nightly: false,
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
      nightly,
    }) => {
      test(`Complete the C100 hearing urgency event with ${description}. @regression @accessibility${nightly ? " @nightly" : ""}${checkErrorMessages ? " @errorMessage" : ""}`, async ({
        solicitor,
      }): Promise<void> => {
        const { tasksPage, c100HearingUrgency, summaryPage } = solicitor;

        await tasksPage.chooseEventFromDropdown("Hearing urgency");

        await c100HearingUrgency.page1.assertPageContents();
        await c100HearingUrgency.page1.verifyAccessibility();
        await c100HearingUrgency.page1.checkErrorMessages(checkErrorMessages);
        await c100HearingUrgency.page1.fillInFields(answerYesToAll);
        await c100HearingUrgency.page1.clickContinue();

        await c100HearingUrgency.submitPage.assertHearingUrgencyAnswers(
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
      });
    },
  );
});
