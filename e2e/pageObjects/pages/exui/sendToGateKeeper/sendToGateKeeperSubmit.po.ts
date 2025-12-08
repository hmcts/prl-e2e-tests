import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class SendToGateKeeperSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Send to gatekeeper", CommonStaticText.submit);
  }
}
