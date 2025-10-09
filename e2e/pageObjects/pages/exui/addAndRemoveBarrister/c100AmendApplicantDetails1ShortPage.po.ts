import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";

export class C100AmendApplicantDetails1ShortPage {
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

  async clickSaveAndContinue(caseworkerPage): Promise<void> {
    await caseworkerPage
      .getByRole("button", { name: "Save and continue" })
      .click();
  }
}
