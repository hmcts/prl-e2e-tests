import config from "../../../../utils/config.utils.js";
import { ManageCaseEventUtils } from "../../../../utils/manageCaseEvent.utils.js";
import { DateHelperUtils } from "../../../../utils/dateHelpers.utils.js";
import { NocSolicitorPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/nocSolicitorPages.js";
import {
  NocClientName,
  NoticeOfChangeJourney,
} from "../noticeOfChange/noticeOfChangeJourney.js";

/** Respondent 1 on the test-support C100 case (C100_Dummy_Draft_CaseDetails). */
export const C100_RESPONDENT_1: NocClientName = {
  firstname: "Mary",
  surname: "Richards",
};
export const C100_RESPONDENT_1_NAME = `${C100_RESPONDENT_1.firstname} ${C100_RESPONDENT_1.surname}`;

export interface RespondentSolicitorCase {
  caseRef: string;
  /** The day the case was created, as [day, month, year] date-input values. */
  createdDate: { day: string; month: string; year: string };
}

/**
 * Creates a new C100 case, issues it and sends it to gatekeeping (API), then does the Notice of
 * Change for respondent 1 as the NoC solicitor and ends on the Respondent 1 tasks tab.
 */
export class RespondentSolicitorCaseJourney {
  async createCaseAsRespondentSolicitor(
    manageCasesEventUtils: ManageCaseEventUtils,
    dateHelperUtils: DateHelperUtils,
    nocSolicitor: NocSolicitorPagesGroup,
    accessibilityTest: boolean = false,
  ): Promise<RespondentSolicitorCase> {
    const caseRef: string = (
      await manageCasesEventUtils.submitTSSolicitorCase("C100")
    ).caseRef;
    const [day, month, year] = dateHelperUtils.todayDate(
      false,
      true,
    ) as string[];
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");

    // straight to Manage Cases: the solicitor cannot open the case until the Notice of Change
    await nocSolicitor.page.goto(config.manageCasesBaseURL);
    await new NoticeOfChangeJourney().performNoticeOfChange(
      nocSolicitor,
      caseRef,
      C100_RESPONDENT_1,
      accessibilityTest,
    );

    // ExUI opens the case on Summary once it has loaded; only then switch tabs
    await nocSolicitor.summaryPage.assertSummaryTabLoaded();
    await nocSolicitor.respondentTasksPage.goToPage();
    await nocSolicitor.respondentTasksPage.assertTabIsSelected();

    return { caseRef, createdDate: { day, month, year } };
  }
}
