import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";
import { Selectors } from "../../../../common/selectors.ts";

export class ManageDocumentsNewSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Manage documents", CommonStaticText.saveAndContinue);
  }
}