import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";
import {
  RespondentTask,
  RespondentTaskStatus,
} from "../../../../pageObjects/pages/exui/caseView/solicitor/respondentTasks.po.ts";
import { ConsentToApplicationParams } from "../../../../pageObjects/pages/exui/respondentResponse/consentToApplication/consentToApplication1.po.ts";
import { NoticeOfChangeJourney } from "../../../../journeys/manageCases/caseProgression/noticeOfChange/noticeOfChangeJourney.ts";

const RESPONDENT_1 = { firstname: "Mary", surname: "Richards" } as const;
const RESPONDENT_1_NAME = `${RESPONDENT_1.firstname} ${RESPONDENT_1.surname}`;

test.describe("C100 respondent response (C7) - Do you give your consent? - as the respondent solicitor.", () => {
  let caseRef: string;
  let consentToApplication: ConsentToApplicationParams;

  test.beforeEach(
    async ({
      manageCasesEventUtils,
      nocSolicitor,
      navigationUtils,
      dateHelperUtils,
    }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
        .caseRef;
      const [day, month, year] = dateHelperUtils.todayDate(
        false,
        true,
      ) as string[];
      consentToApplication = {
        consentToApplication: true,
        applicationReceivedDate: { day, month, year },
        permissionFromCourtNeeded: true,
        courtOrderDetails: "This is a sample order text",
      };
      await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
      await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");

      await navigationUtils.goToCase(
        nocSolicitor.page,
        config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

  test("Respondent solicitor takes on respondent 1 by notice of change, completes Do you give your consent? and the task is Finished. @nightly @accessibility @regression", async ({
    nocSolicitor,
    navigationUtils,
  }): Promise<void> => {
    await new NoticeOfChangeJourney().performNoticeOfChange(
      nocSolicitor,
      caseRef,
      RESPONDENT_1,
      true, 
    );

    // wait for the case to finish loading on Summary before switching tab
    await nocSolicitor.summaryPage.assertSummaryTabLoaded();

    const { respondentTasksPage } = nocSolicitor;
    await respondentTasksPage.goToPage();
    await respondentTasksPage.assertTabIsSelected();
    await respondentTasksPage.assertPageContents(RESPONDENT_1_NAME);
    await respondentTasksPage.verifyAccessibility();

    await respondentTasksPage.clickTask(RespondentTask.consentToApplication);
    const { consentToApplication1, consentToApplicationSubmit } =
      nocSolicitor.respondentResponse;
    await consentToApplication1.assertPageContents(RESPONDENT_1_NAME);
    await consentToApplication1.verifyAccessibility();
    await consentToApplication1.fillInFields(consentToApplication);
    await consentToApplication1.clickContinue();

    await consentToApplicationSubmit.assertAnswers(consentToApplication);
    await consentToApplicationSubmit.verifyAccessibility();
    await consentToApplicationSubmit.clickSaveAndContinue();

    await navigationUtils.goToCase(
      nocSolicitor.page,
      config.manageCasesBaseURLCase,
      caseRef,
      respondentTasksPage.tabName,
    );
    await respondentTasksPage.assertTabIsSelected();
    await respondentTasksPage.assertTaskStatus(
      RespondentTask.consentToApplication,
      RespondentTaskStatus.finished,
    );
  });
});
