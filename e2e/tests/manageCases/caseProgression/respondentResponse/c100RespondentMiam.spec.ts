import { test } from "../../../fixtures.ts";
import {
  RespondentTask,
  RespondentTaskStatus,
} from "../../../../pageObjects/pages/exui/caseView/solicitor/respondentTasks.po.ts";
import {
  C100_RESPONDENT_1_NAME,
  RespondentSolicitorCaseJourney,
} from "../../../../journeys/manageCases/caseProgression/respondentResponse/respondentSolicitorCaseJourney.ts";
import { MiamParams } from "../../../../pageObjects/pages/exui/respondentResponse/miam/miamSubmit.po.ts";

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

  test("Respondent solicitor completes MIAM (not attended, not willing to attend) and the task is Finished. @nightly @accessibility @regression", async ({
    nocSolicitor,
  }): Promise<void> => {
    const { respondentTasksPage, summaryPage } = nocSolicitor;
    await respondentTasksPage.clickTask(RespondentTask.miam);

    const { miam1, miam2, miamSubmit } = nocSolicitor.respondentResponse;
    await miam1.assertPageContents(C100_RESPONDENT_1_NAME);
    await miam1.verifyAccessibility();
    await miam1.fillInFields(MIAM.hasAttendedMiam);
    await miam1.clickContinue();

    await miam2.assertPageContents(C100_RESPONDENT_1_NAME);
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
      RespondentTaskStatus.finished,
    );
  });
});
