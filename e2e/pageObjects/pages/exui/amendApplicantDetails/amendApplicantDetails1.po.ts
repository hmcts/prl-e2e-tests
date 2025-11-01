import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { EventPage } from "../eventPage.po.ts";

// more details and page asserts to be added as needed in the future
export class AmendApplicantDetails1 extends EventPage {
  constructor(page: Page) {
    super(page, "Amend applicant details");
  }

  async loginAsCaseworkerAndGoToEvent(caseworkerPage, caseNumber) {
    await Helpers.goToCase(
      caseworkerPage,
      config.manageCasesBaseURLCase,
      caseNumber,
      "tasks",
    );
    await Helpers.chooseEventFromDropdown(
      caseworkerPage,
      "Amend applicant details",
    );
  }

  async clickContinue(caseworkerPage): Promise<void> {
    await caseworkerPage.getByRole("button", { name: "Continue" }).click();
  }
}
