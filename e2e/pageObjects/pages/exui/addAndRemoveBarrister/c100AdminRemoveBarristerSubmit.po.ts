import { Locator, Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";

export class C100AdminRemoveBarristerSubmit extends CheckYourAnswersPage {
  constructor(page: Page) {
    const partyNameCell: Locator = page
      .locator("table td")
      .getByRole("row")
      .first()
      .getByRole("cell")
      .locator("span");
    super(page, "Remove barrister", CommonStaticText.submit, [partyNameCell]);
  }
}
