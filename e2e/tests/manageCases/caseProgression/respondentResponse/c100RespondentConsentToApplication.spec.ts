import { test } from "../../../fixtures.ts";
import { TaskStatus } from "../../../../common/types.ts";
import { RespondentTask } from "../../../../pageObjects/pages/exui/caseView/solicitor/respondentTasks.po.ts";
import config from "../../../../utils/config.utils.ts";
import {
  NocClientName,
  NoticeOfChangeJourney,
} from "../../../../journeys/manageCases/caseProgression/noticeOfChange/noticeOfChangeJourney.ts";
import { ConsentToApplicationParams } from "../../../../pageObjects/pages/exui/respondentResponse/consentToApplication/consentToApplication1.po.ts";

// Respondent 1 on the test-support C100 case (C100_Dummy_Draft_CaseDetails)
const respondent1: NocClientName = { firstname: "Mary", surname: "Richards" };
const respondent1Name = `${respondent1.firstname} ${respondent1.surname}`;

test.describe("C100 respondent response (C7) - Do you give your consent? as the respondent solicitor.", () => {
  let caseRef: string;
  let consentToApplication: ConsentToApplicationParams;

  test.beforeEach(
    async ({ manageCasesEventUtils, dateHelperUtils, nocSolicitor }) => {
      // API: create the C100 case, issue it and send it to gatekeeping
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
        .caseRef;
      const [day, month, year] = dateHelperUtils.todayDate(
        false,
        true,
      ) as string[];
      await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
      await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");

      // the solicitor cannot open the case until the Notice of Change is done
      await nocSolicitor.page.goto(config.manageCasesBaseURL);
      await new NoticeOfChangeJourney().performNoticeOfChange(
        nocSolicitor,
        caseRef,
        respondent1,
        true,
      );
      // ExUI opens the case on Summary once it has loaded; only then switch tabs
      await nocSolicitor.summaryPage.assertSummaryTabLoaded();
      await nocSolicitor.respondentTasksPage.goToPage();
      await nocSolicitor.respondentTasksPage.assertTabIsSelected();

      consentToApplication = {
        consentToApplication: true,
        // same date as the case was created
        applicationReceivedDate: { day, month, year },
        permissionFromCourtNeeded: true,
        courtOrderDetails: "This is a sample order text",
      };
    },
  );

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
    await consentToApplication1.fillInFields(consentToApplication);
    await consentToApplication1.clickContinue();

    await consentToApplicationSubmit.assertAnswers(consentToApplication);
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
