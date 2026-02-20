import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../../checkYourAnswers.po.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";

export class SubmitPageC21 extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Create/upload draft order", CommonStaticText.submit);
    }
  }
