import { test } from "../../../fixtures.ts";
import { RespondentTask, TaskStatus } from "../../../../common/types.ts";
import {
  NocClientName,
  NoticeOfChangeJourney,
} from "../../../../journeys/manageCases/caseProgression/noticeOfChange/noticeOfChangeJourney.ts";
import { ConsentToApplicationParams } from "../../../../pageObjects/pages/exui/respondentResponse/consentToApplication/consentToApplication1.po.ts";

// Respondent 1 on the test-support C100 case (C100_Dummy_Draft_CaseDetails)
const respondent1: NocClientName = { firstname: "Mary", surname: "Richards" };
const respondent1Name = `${respondent1.firstname} ${respondent1.surname}`;

const snapshotPath: string[] = [
  "caseProgression",
  "respondentResponse",
  "consentToApplication",
];

const CONSENT_TO_APPLICATION: ConsentToApplicationParams = {
  consentToApplication: true,
  applicationReceivedDate: { day: "20", month: "10", year: "2026" },
  permissionFromCourtNeeded: true,
  courtOrderDetails: "This is a sample order text",
};

test.describe("C100 respondent response (C7) - Do you give your consent? as the respondent solicitor.", () => {
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
      true,
    );
    await nocSolicitor.summaryPage.assertSummaryTabLoaded();
    await nocSolicitor.respondentTasksPage.goToPage();
    await nocSolicitor.respondentTasksPage.assertTabIsSelected();
  });

  test("Respondent solicitor completes Do you give your consent? and the task is Finished. @nightly @accessibility @regression", async ({
    nocSolicitor,
  }): Promise<void> => {
    const { respondentTasksPage, summaryPage } = nocSolicitor;
    await respondentTasksPage.assertPageContents(respondent1Name);
    await respondentTasksPage.verifyAccessibility();

    await respondentTasksPage.clickTask(RespondentTask.consentToApplication);
    const { consentToApplication1, consentToApplicationSubmit } =
      nocSolicitor.respondentResponse;
    await consentToApplication1.assertPageContents(respondent1Name);
    await consentToApplication1.verifyAccessibility();
    await consentToApplication1.fillInFields(CONSENT_TO_APPLICATION);
    await consentToApplication1.clickContinue();

    await consentToApplicationSubmit.assertPageContents(
      snapshotPath,
      "c100-respondent-consent-to-application",
    );
    await consentToApplicationSubmit.verifyAccessibility();
    await consentToApplicationSubmit.clickSaveAndContinue();

    // ExUI returns to the Summary tab with the event banner
    await summaryPage.assertSummaryTabLoaded();
    await summaryPage.alertBanner.assertEventAlert(
      caseRef,
      "Do you give your consent?",
    );
    await respondentTasksPage.goToPage();
    await respondentTasksPage.assertTabIsSelected();
    await respondentTasksPage.assertTaskStatus(
      RespondentTask.consentToApplication,
      TaskStatus.finished,
    );
    // saving the consent also starts Edit contact details
    await respondentTasksPage.assertTaskStatus(
      RespondentTask.editContactDetails,
      TaskStatus.inProgress,
    );
  });
});
