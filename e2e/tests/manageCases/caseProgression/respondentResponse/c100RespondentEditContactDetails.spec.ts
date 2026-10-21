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
  EditContactDetailsParams,
  LivesInRefuge,
} from "../../../../pageObjects/pages/exui/respondentResponse/editContactDetails/editContactDetails1.po.ts";

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

  test("Respondent solicitor completes Edit contact details and the task is Finished. @nightly @accessibility @regression", async ({
    nocSolicitor,
  }): Promise<void> => {
    const { respondentTasksPage, summaryPage } = nocSolicitor;
    await respondentTasksPage.clickTask(RespondentTask.editContactDetails);

    const { editContactDetails1, editContactDetailsSubmit } =
      nocSolicitor.respondentResponse;
    await editContactDetails1.assertPageContents(C100_RESPONDENT_1_NAME);
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
      RespondentTaskStatus.finished,
    );
  });
});
