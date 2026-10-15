import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";
import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

export class AddACaseNoteSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Add a case note", CommonStaticText.saveAndContinue);
  }
}
