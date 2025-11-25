import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class IssueAndSendToLocalCourtCallbackSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Issue and send to local court", {
      snapshotPath: ["caseProgression", "issueAndSendToLocalCourt"],
      cyaSubmitButton: CommonStaticText.submit,
    });
  }
}
