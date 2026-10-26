import { test } from "../../../fixtures.ts";
import { RespondentTask, TaskStatus } from "../../../../common/types.ts";
import {
  NocClientName,
  NoticeOfChangeJourney,
} from "../../../../journeys/manageCases/caseProgression/noticeOfChange/noticeOfChangeJourney.ts";
import {
  EditContactDetailsParams,
  LivesInRefuge,
} from "../../../../pageObjects/pages/exui/respondentResponse/editContactDetails/editContactDetails1.po.ts";

const respondent1: NocClientName = { firstname: "Mary", surname: "Richards" };
const respondent1Name = `${respondent1.firstname} ${respondent1.surname}`;

const snapshotPath: string[] = [
  "caseProgression",
  "respondentResponse",
  "editContactDetails",
];

const EDIT_CONTACT_DETAILS: EditContactDetailsParams = {
  firstName: "Mary",
  lastName: "Richards",
  previousName: "Mary Smith",
  dateOfBirth: { day: "15", month: "02", year: "1985" },
  placeOfBirth: "London",
  livesInRefuge: LivesInRefuge.no,
  address: {
    postcode: "SW1A 1AA",
    selection: "Buckingham Palace, London",
    buildingAndStreet: "Buckingham Palace",
    townOrCity: "London",
    country: "United Kingdom",
  },
  livedAtAddressMoreThan5Years: true,
  phoneNumber: "07700900123",
  email: "mary.richards@example.com",
};

test.describe("C100 respondent response (C7) - Edit contact details as the respondent solicitor.", () => {
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

  test("Respondent solicitor completes Edit contact details and the task is Finished. @nightly @accessibility @regression", async ({
    nocSolicitor,
  }): Promise<void> => {
    const { respondentTasksPage, summaryPage } = nocSolicitor;
    await respondentTasksPage.clickTask(RespondentTask.editContactDetails);

    const { editContactDetails1, editContactDetailsSubmit } =
      nocSolicitor.respondentResponse;
    await editContactDetails1.assertPageContents(respondent1Name);
    await editContactDetails1.verifyAccessibility();
    await editContactDetails1.fillInFields(EDIT_CONTACT_DETAILS);
    await editContactDetails1.clickContinue();

    await editContactDetailsSubmit.assertAnswers(
      EDIT_CONTACT_DETAILS,
      snapshotPath,
      "c100-respondent-edit-contact-details",
    );
    await editContactDetailsSubmit.verifyAccessibility();
    await editContactDetailsSubmit.clickSaveAndContinue();

    // ExUI returns to the Summary tab with the event banner
    await summaryPage.assertSummaryTabLoaded();
    await summaryPage.alertBanner.assertEventAlert(
      caseRef,
      "Edit contact details",
    );
    await respondentTasksPage.goToPage();
    await respondentTasksPage.assertTabIsSelected();
    await respondentTasksPage.assertTaskStatus(
      RespondentTask.editContactDetails,
      TaskStatus.finished,
    );
  });
});
