import { expect, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.js";
import { IssueAndSendToLocalCourtCallback1Page } from "../../../../pages/manageCases/caseWorker/draftAnOrder/issueAndSendToLocalCourt/issueAndSendToLocalCourtCallback1Page.js";
import { IssueAndSendToLocalCourtCallbackSubmitPage } from "../../../../pages/manageCases/caseWorker/draftAnOrder/issueAndSendToLocalCourt/issueAndSendToLocalCourtCallbackSubmitPage.js";

interface IssueAndSendToLocalCourtParams {
  page: Page;
  accessibilityTest: boolean;
}

export class IssueAndSendToLocalCourt {
  public static async issueAndSendToLocalCourt({
    page,
    accessibilityTest,
  }: IssueAndSendToLocalCourtParams): Promise<void> {
    await this.assignCaseAndIssueToLocalCourt(page, accessibilityTest);
    expect(await Helpers.getCourtNameFromSummaryTab(page)).toBe(
      "Swansea Civil And Family Justice Centre",
    );
    expect(await Helpers.getCaseStatusFromSummaryTab(page)).toBe("Case Issued");
    await Helpers.clickTab(page, "Tasks");
    await Helpers.waitForTaskToDisappear(page, "Check Application");
  }

  private static async assignCaseAndIssueToLocalCourt(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      page,
      "Check Application",
      "Issue and send to local Court",
    );
    await IssueAndSendToLocalCourtCallback1Page.issueAndSendToLocalCourtCallback1Page(
      page,
    );
    await IssueAndSendToLocalCourtCallbackSubmitPage.issueAndSendToLocalCourtCallbackSubmitPage(
      page,
      accessibilityTest,
    );
  }
}
