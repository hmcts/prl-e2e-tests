import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";
import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

export class EditReturnedOrderSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Edit a returned order", CommonStaticText.submit);
  }
}