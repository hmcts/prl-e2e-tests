import { CheckYourAnswersPage } from "../../checkYourAnswers.po.ts";
import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";

export class DraftAnOrderSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Draft an order", CommonStaticText.submit);
  }
}
