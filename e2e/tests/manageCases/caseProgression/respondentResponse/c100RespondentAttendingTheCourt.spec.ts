import { test } from "../../../fixtures.ts";
import { RespondentTask, TaskStatus } from "../../../../common/types.ts";
import {
  NocClientName,
  NoticeOfChangeJourney,
} from "../../../../journeys/manageCases/caseProgression/noticeOfChange/noticeOfChangeJourney.ts";
import {
  AttendingTheCourtParams,
  InterpreterParty,
  WelshNeed,
} from "../../../../pageObjects/pages/exui/respondentResponse/attendingTheCourt/attendingTheCourt1.po.ts";

// Respondent 1 on the test-support C100 case (C100_Dummy_Draft_CaseDetails)
const respondent1: NocClientName = { firstname: "Mary", surname: "Richards" };
const respondent1Name = `${respondent1.firstname} ${respondent1.surname}`;

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

  test.beforeEach(async ({ manageCasesEventUtils, nocSolicitor }) => {
    // API: create the C100 case, issue it and send it to gatekeeping
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");

    await new NoticeOfChangeJourney().performNoticeOfChange(
      nocSolicitor,
      caseRef,
      respondent1,
    );
    // ExUI opens the case on Summary once it has loaded; only then switch tabs
    await nocSolicitor.summaryPage.assertSummaryTabLoaded();
    await nocSolicitor.respondentTasksPage.goToPage();
    await nocSolicitor.respondentTasksPage.assertTabIsSelected();
  });

  test("Respondent solicitor completes Attending the court and the task is Finished. @nightly @accessibility @regression", async ({
    nocSolicitor,
  }): Promise<void> => {
    const { respondentTasksPage, summaryPage } = nocSolicitor;
    await respondentTasksPage.clickTask(RespondentTask.attendingTheCourt);

    const { attendingTheCourt1, attendingTheCourt2, attendingTheCourtSubmit } =
      nocSolicitor.respondentResponse;
    await attendingTheCourt1.assertPageContents(respondent1Name);
    await attendingTheCourt1.verifyAccessibility();
    await attendingTheCourt1.fillInFields(ATTENDING_THE_COURT);
    await attendingTheCourt1.clickContinue();

    await attendingTheCourt2.assertPageContents();
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
      TaskStatus.finished,
    );
  });
});
