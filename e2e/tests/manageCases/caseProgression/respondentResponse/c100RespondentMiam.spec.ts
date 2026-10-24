import { test } from "../../../fixtures.ts";
import { TaskStatus } from "../../../../common/types.ts";
import { RespondentTask } from "../../../../pageObjects/pages/exui/caseView/solicitor/respondentTasks.po.ts";
import config from "../../../../utils/config.utils.ts";
import {
  NocClientName,
  NoticeOfChangeJourney,
} from "../../../../journeys/manageCases/caseProgression/noticeOfChange/noticeOfChangeJourney.ts";
import { MiamParams } from "../../../../pageObjects/pages/exui/respondentResponse/miam/miamSubmit.po.ts";

// Respondent 1 on the test-support C100 case (C100_Dummy_Draft_CaseDetails)
const respondent1: NocClientName = { firstname: "Mary", surname: "Richards" };
const respondent1Name = `${respondent1.firstname} ${respondent1.surname}`;

const snapshotPath: string[] = [
  "caseProgression",
  "respondentResponse",
  "miam",
];

const MIAM: MiamParams = {
  hasAttendedMiam: false,
  willingToAttendMiam: false,
  reasonNotWilling:
    "The respondent has been the victim of domestic abuse by the applicant and does not feel safe attending a meeting with them.",
};

test.describe("C100 respondent response (C7) - MIAM as the respondent solicitor.", () => {
  let caseRef: string;

  test.beforeEach(async ({ manageCasesEventUtils, nocSolicitor }) => {
    // API: create the C100 case, issue it and send it to gatekeeping
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");

    // the solicitor cannot open the case until the Notice of Change is done
    await nocSolicitor.page.goto(config.manageCasesBaseURL);
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

  test("Respondent solicitor completes MIAM (not attended, not willing to attend) and the task is Finished. @nightly @accessibility @regression", async ({
    nocSolicitor,
  }): Promise<void> => {
    const { respondentTasksPage, summaryPage } = nocSolicitor;
    await respondentTasksPage.clickTask(RespondentTask.miam);

    const { miam1, miam2, miamSubmit } = nocSolicitor.respondentResponse;
    await miam1.assertPageContents(respondent1Name);
    await miam1.verifyAccessibility();
    await miam1.fillInFields(MIAM.hasAttendedMiam);
    await miam1.clickContinue();

    await miam2.assertPageContents(respondent1Name);
    await miam2.verifyAccessibility();
    await miam2.fillInFields(
      MIAM.willingToAttendMiam ?? false,
      MIAM.reasonNotWilling,
    );
    await miam2.clickContinue();

    await miamSubmit.assertAnswers(
      MIAM,
      snapshotPath,
      "c100-respondent-miam-not-attended-cya",
    );
    await miamSubmit.verifyAccessibility();
    await miamSubmit.clickSaveAndContinue();

    // ExUI returns to the Summary tab with the event banner
    await summaryPage.assertSummaryTabLoaded();
    await summaryPage.alertBanner.assertEventAlert(caseRef, "MIAM");
    await respondentTasksPage.goToPage();
    await respondentTasksPage.assertTabIsSelected();
    await respondentTasksPage.assertTaskStatus(
      RespondentTask.miam,
      TaskStatus.finished,
    );
  });
});
