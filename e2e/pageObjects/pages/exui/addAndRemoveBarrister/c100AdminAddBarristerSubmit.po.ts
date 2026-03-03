import { Locator, Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";

export class C100AdminAddBarristerSubmit extends CheckYourAnswersPage {
  constructor(page: Page) {
    const partyNameCell: Locator = page
      .locator("table td")
      .getByRole("row")
      .first()
      .getByRole("cell")
      .locator(".text-16");
    super(page, "Add barrister", CommonStaticText.submit, [partyNameCell]);
  }
}
