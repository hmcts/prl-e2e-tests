import { Page } from "@playwright/test";
import { EventPage } from "../eventPage.po.ts";

// more details and page asserts to be added as needed in the future
export class AmendRespondentDetailsSubmit extends EventPage {
  constructor(page: Page) {
    super(page, "Amend respondent details");
  }
}
