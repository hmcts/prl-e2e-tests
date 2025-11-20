import { Page } from "@playwright/test";
import { EventPage } from "../eventPage.po.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

// more details and page asserts to be added as needed in the future
export class AmendApplicantDetailsSubmit extends EventPage {
  constructor(page: Page) {
    super(page, "Amend applicant details");
  }

  async saveAndContinue(caseworkerPage) {
    await caseworkerPage.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
