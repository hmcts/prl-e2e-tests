import config from "../../../../utils/config.utils.js";
import { ManageCaseEventUtils } from "../../../../utils/manageCaseEvent.utils.js";
import { DateHelperUtils } from "../../../../utils/dateHelpers.utils.js";
import { NocSolicitorPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/nocSolicitorPages.js";
import {
  NocClientName,
  NoticeOfChangeJourney,
} from "../noticeOfChange/noticeOfChangeJourney.js";

export const C100_RESPONDENT_1: NocClientName = {
  firstname: "Mary",
  surname: "Richards",
};
export const C100_RESPONDENT_1_NAME = `${C100_RESPONDENT_1.firstname} ${C100_RESPONDENT_1.surname}`;

export interface RespondentSolicitorCase {
  caseRef: string;
  createdDate: { day: string; month: string; year: string };
}

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

    await nocSolicitor.page.goto(config.manageCasesBaseURL);
    await new NoticeOfChangeJourney().performNoticeOfChange(
      nocSolicitor,
      caseRef,
      C100_RESPONDENT_1,
      accessibilityTest,
    );

    await nocSolicitor.summaryPage.assertSummaryTabLoaded();
    await nocSolicitor.respondentTasksPage.goToPage();
    await nocSolicitor.respondentTasksPage.assertTabIsSelected();

    return { caseRef, createdDate: { day, month, year } };
  }
}
