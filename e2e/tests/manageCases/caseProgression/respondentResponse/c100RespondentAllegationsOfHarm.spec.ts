import { test } from "../../../fixtures.ts";
import {
  AbuseType,
  RespondentTask,
  TaskStatus,
} from "../../../../common/types.ts";
import {
  NocClientName,
  NoticeOfChangeJourney,
} from "../../../../journeys/manageCases/caseProgression/noticeOfChange/noticeOfChangeJourney.ts";
import { PassportHolder } from "../../../../pageObjects/pages/exui/respondentResponse/allegationsOfHarm/childAbduction.po.ts";
import { AllegationsOfHarmParams } from "../../../../pageObjects/pages/exui/respondentResponse/allegationsOfHarm/allegationsOfHarm1.po.ts";

// Respondent 1 on the test-support C100 case (C100_Dummy_Draft_CaseDetails)
const respondent1: NocClientName = { firstname: "Mary", surname: "Richards" };
const respondent1Name = `${respondent1.firstname} ${respondent1.surname}`;

const snapshotPath: string[] = [
  "caseProgression",
  "respondentResponse",
  "allegationsOfHarm",
];

const COURT = "Birmingham Civil and Family Justice Centre";

const ALLEGATIONS_OF_HARM: AllegationsOfHarmParams = {
  allegations: {
    domesticAbuse: true,
    childAbuse: true,
    childAbduction: true,
    substanceAbuseDetails:
      "The applicant regularly drinks heavily at weekends, including when the children are in their care.",
    otherConcernsDetails:
      "The applicant has left the children unsupervised at home on several occasions.",
    orders: {
      nonMolestation: {
        dateIssued: { day: "15", month: "03", year: "2035" },
        endDate: { day: "15", month: "03", year: "2036" },
        isCurrent: true,
        courtName: COURT,
        caseNumber: "BM35F00123",
      },
      occupation: {
        dateIssued: { day: "10", month: "06", year: "2035" },
        endDate: { day: "10", month: "06", year: "2036" },
        isCurrent: false,
        courtName: COURT,
        caseNumber: "BM35F00456",
      },
    },
  },
  domesticAbuseBehaviours: [
    {
      typeOfAbuse: AbuseType.physical,
      description:
        "The applicant pushed the respondent against a wall during an argument in front of the children.",
      startAndDuration:
        "Started in January 2024 and happened about once a month until the couple separated in August 2024.",
      soughtHelp: true,
      whoFrom:
        "The respondent spoke to her GP, who referred her to a local domestic abuse support service.",
    },
  ],
  childAbuse: [
    {
      type: AbuseType.physical,
      description:
        "The applicant smacked Joe hard enough to leave a bruise when he would not go to bed.",
      startAndDuration: "Once in March 2024.",
      soughtHelp: true,
      whoFrom:
        "The respondent reported it to the children's school safeguarding lead.",
    },
    {
      type: AbuseType.psychological,
      childrenAtRisk: ["Joe Doe", "Lilly Anderson"],
      description:
        "The applicant repeatedly tells the children their mother does not love them.",
      startAndDuration: "Since the separation in August 2024 and ongoing.",
      soughtHelp: true,
      whoFrom:
        "The respondent arranged counselling for the children through their GP.",
    },
  ],
  childAbduction: {
    reasons:
      "The applicant has family in Poland and has said he will take the children there and not bring them back.",
    previousThreatsDetails:
      "In June 2024 the applicant booked one-way flights to Warsaw for himself and the children without telling the respondent.",
    childrenLocationNow:
      "With the respondent at the family home in Birmingham.",
    passportOfficeNotified: true,
    policeInvolvementDetails:
      "West Midlands Police were called to the airport in June 2024 and the children were returned to the respondent.",
    passports: {
      hasMoreThanOne: false,
      heldBy: [PassportHolder.mother, PassportHolder.other],
      otherHolder: "The children's maternal grandmother",
    },
  },
  otherConcerns: {
    courtActions:
      "A prohibited steps order preventing the applicant from removing the children from England and Wales, and a non-molestation order protecting the respondent.",
    agreeUnsupervisedTime: false,
    agreeSupervisedTime: true,
    agreeOtherContact: true,
  },
};

test.describe("C100 respondent response (C7) - Allegations of harm as the respondent solicitor.", () => {
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

  test("Respondent solicitor completes Make allegations of harm and the task is Finished. @nightly @accessibility @regression", async ({
    nocSolicitor,
  }): Promise<void> => {
    const { respondentTasksPage, summaryPage } = nocSolicitor;
    await respondentTasksPage.clickTask(RespondentTask.allegationsOfHarm);

    const {
      allegationsOfHarm1,
      allegationsOfHarm2,
      domesticAbuseBehaviours,
      childAbuseBehaviours,
      childAbuseType,
      childAbduction,
      otherConcerns,
      allegationsOfHarmSubmit,
    } = nocSolicitor.respondentResponse;

    await allegationsOfHarm1.assertPageContents(respondent1Name);
    await allegationsOfHarm1.verifyAccessibility();
    await allegationsOfHarm1.fillInFields(true);
    await allegationsOfHarm1.clickContinue();

    await allegationsOfHarm2.assertPageContents(respondent1Name);
    await allegationsOfHarm2.verifyAccessibility();
    await allegationsOfHarm2.fillInFields(ALLEGATIONS_OF_HARM.allegations);
    await allegationsOfHarm2.clickContinue();

    await domesticAbuseBehaviours.assertPageContents(respondent1Name);
    await domesticAbuseBehaviours.verifyAccessibility();
    await domesticAbuseBehaviours.fillInFields(
      ALLEGATIONS_OF_HARM.domesticAbuseBehaviours,
    );
    await domesticAbuseBehaviours.clickContinue();

    await childAbuseBehaviours.assertPageContents(respondent1Name);
    await childAbuseBehaviours.verifyAccessibility();
    await childAbuseBehaviours.fillInFields(
      ALLEGATIONS_OF_HARM.childAbuse.map((childAbuse) => childAbuse.type),
    );
    await childAbuseBehaviours.clickContinue();

    // one page per ticked type of abuse, in the order the service shows them
    for (const details of ALLEGATIONS_OF_HARM.childAbuse) {
      await childAbuseType.assertPageContents(details.type, respondent1Name);
      await childAbuseType.verifyAccessibility();
      await childAbuseType.fillInFields(details);
      await childAbuseType.clickContinue();
    }

    await childAbduction.assertPageContents(respondent1Name);
    await childAbduction.verifyAccessibility();
    await childAbduction.fillInFields(ALLEGATIONS_OF_HARM.childAbduction);
    await childAbduction.clickContinue();

    await otherConcerns.assertPageContents(respondent1Name);
    await otherConcerns.verifyAccessibility();
    await otherConcerns.fillInFields(ALLEGATIONS_OF_HARM.otherConcerns);
    await otherConcerns.clickContinue();

    await allegationsOfHarmSubmit.assertPageContents(
      snapshotPath,
      "c100-respondent-allegations-of-harm",
    );
    await allegationsOfHarmSubmit.verifyAccessibility();
    await allegationsOfHarmSubmit.clickSaveAndContinue();

    // ExUI returns to the Summary tab with the event banner
    await summaryPage.assertSummaryTabLoaded();
    await summaryPage.alertBanner.assertEventAlert(
      caseRef,
      "Allegations of harm",
    );
    await respondentTasksPage.goToPage();
    await respondentTasksPage.assertTabIsSelected();
    await respondentTasksPage.assertTaskStatus(
      RespondentTask.allegationsOfHarm,
      TaskStatus.finished,
    );
  });
});
