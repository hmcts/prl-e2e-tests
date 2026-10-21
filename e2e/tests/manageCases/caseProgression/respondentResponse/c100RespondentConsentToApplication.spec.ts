import { test } from "../../../fixtures.ts";
import {
  RespondentTask,
  RespondentTaskStatus,
} from "../../../../pageObjects/pages/exui/caseView/solicitor/respondentTasks.po.ts";
import {
  C100_RESPONDENT_1_NAME,
  RespondentSolicitorCaseJourney,
} from "../../../../journeys/manageCases/caseProgression/respondentResponse/respondentSolicitorCaseJourney.ts";
import { ConsentToApplicationParams } from "../../../../pageObjects/pages/exui/respondentResponse/consentToApplication/consentToApplication1.po.ts";

test.describe("C100 respondent response (C7) - Do you give your consent? as the respondent solicitor.", () => {
  let caseRef: string;
  let consentToApplication: ConsentToApplicationParams;

  test.beforeEach(
    async ({ manageCasesEventUtils, dateHelperUtils, nocSolicitor }) => {
      const respondentCase =
        await new RespondentSolicitorCaseJourney().createCaseAsRespondentSolicitor(
          manageCasesEventUtils,
          dateHelperUtils,
          nocSolicitor,
          true,
        );
      caseRef = respondentCase.caseRef;
      consentToApplication = {
        consentToApplication: true,
        // same date as the case was created
        applicationReceivedDate: respondentCase.createdDate,
        permissionFromCourtNeeded: true,
        courtOrderDetails: "This is a sample order text",
      };
    },
  );

  test("Respondent solicitor completes Do you give your consent? and the task is Finished. @nightly @accessibility @regression", async ({
    nocSolicitor,
  }): Promise<void> => {
    const { respondentTasksPage, summaryPage } = nocSolicitor;
    await respondentTasksPage.assertPageContents(C100_RESPONDENT_1_NAME);
    await respondentTasksPage.verifyAccessibility();

    await respondentTasksPage.clickTask(RespondentTask.consentToApplication);
    const { consentToApplication1, consentToApplicationSubmit } =
      nocSolicitor.respondentResponse;
    await consentToApplication1.assertPageContents(C100_RESPONDENT_1_NAME);
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
      RespondentTaskStatus.finished,
    );
    // saving the consent also starts Edit contact details
    await respondentTasksPage.assertTaskStatus(
      RespondentTask.editContactDetails,
      RespondentTaskStatus.inProgress,
    );
  });
});
