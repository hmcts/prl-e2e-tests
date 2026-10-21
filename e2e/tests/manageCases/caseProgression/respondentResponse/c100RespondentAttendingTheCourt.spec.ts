import { test } from "../../../fixtures.ts";
import {
  RespondentTask,
  RespondentTaskStatus,
} from "../../../../pageObjects/pages/exui/caseView/solicitor/respondentTasks.po.ts";
import {
  C100_RESPONDENT_1_NAME,
  RespondentSolicitorCaseJourney,
} from "../../../../journeys/manageCases/caseProgression/respondentResponse/respondentSolicitorCaseJourney.ts";
import {
  AttendingTheCourtParams,
  InterpreterParty,
  WelshNeed,
} from "../../../../pageObjects/pages/exui/respondentResponse/attendingTheCourt/attendingTheCourt1.po.ts";

const snapshotPath: string[] = [
  "caseProgression",
  "respondentResponse",
  "attendingTheCourt",
];

const ATTENDING_THE_COURT: AttendingTheCourtParams = {
  welshNeeds: [WelshNeed.speak, WelshNeed.readAndWrite],
  interpreterNeed: {
    parties: [InterpreterParty.respondent],
    relationship: "Mother of the children",
    language: "Polish",
    otherAssistance: "British Sign Language interpreter",
  },
  disabilityAdjustments:
    "The respondent uses a wheelchair and needs step-free access to the courtroom.",
  specialArrangements:
    "A separate waiting room so the respondent does not have to wait with the applicant.",
  intermediaryReasons:
    "The respondent has a learning disability and needs help to understand questions and give evidence.",
};

test.describe("C100 respondent response (C7) - Attending the court as the respondent solicitor.", () => {
  let caseRef: string;

  test.beforeEach(
    async ({ manageCasesEventUtils, dateHelperUtils, nocSolicitor }) => {
      caseRef = (
        await new RespondentSolicitorCaseJourney().createCaseAsRespondentSolicitor(
          manageCasesEventUtils,
          dateHelperUtils,
          nocSolicitor,
        )
      ).caseRef;
    },
  );

  test("Respondent solicitor completes Attending the court and the task is Finished. @nightly @accessibility @regression", async ({
    nocSolicitor,
  }): Promise<void> => {
    const { respondentTasksPage, summaryPage } = nocSolicitor;
    await respondentTasksPage.clickTask(RespondentTask.attendingTheCourt);

    const { attendingTheCourt1, attendingTheCourt2, attendingTheCourtSubmit } =
      nocSolicitor.respondentResponse;
    await attendingTheCourt1.assertPageContents(C100_RESPONDENT_1_NAME);
    await attendingTheCourt1.verifyAccessibility();
    await attendingTheCourt1.fillInFields(ATTENDING_THE_COURT);
    await attendingTheCourt1.clickContinue();

    await attendingTheCourt2.assertPageContents(
      snapshotPath,
      "c100-respondent-attending-the-court-domestic-abuse-act",
    );
    await attendingTheCourt2.verifyAccessibility();
    await attendingTheCourt2.clickContinue();

    await attendingTheCourtSubmit.assertPageContents(
      snapshotPath,
      "c100-respondent-attending-the-court",
    );
    await attendingTheCourtSubmit.verifyAccessibility();
    await attendingTheCourtSubmit.clickSaveAndContinue();

    // ExUI returns to the Summary tab with the event banner
    await summaryPage.assertSummaryTabLoaded();
    await summaryPage.alertBanner.assertEventAlert(
      caseRef,
      "Attending the court",
    );
    await respondentTasksPage.goToPage();
    await respondentTasksPage.assertTabIsSelected();
    await respondentTasksPage.assertTaskStatus(
      RespondentTask.attendingTheCourt,
      RespondentTaskStatus.finished,
    );
  });
});
