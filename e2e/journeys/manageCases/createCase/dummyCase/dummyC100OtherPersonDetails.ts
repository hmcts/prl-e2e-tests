import { Helpers } from "../../../../common/helpers.ts";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { OtherPeopleInTheCase1Content } from "../../../../fixtures/manageCases/createCase/C100/otherPeopleInTheCaseRevised/otherPeopleInTheCaseRevised1Content.js";
import { OtherPeopleInTheCaseSubmitContent } from "../../../../fixtures/manageCases/createCase/C100/otherPeopleInTheCaseRevised/otherPeopleInTheCaseSubmitContent.ts";
import { DummyC100OtherPersonDetailsPage } from "../../../../pages/manageCases/createCase/C100/dummyCase/dummyC100OtherPersonDetailsPage.ts";

export class DummyC100OtherPersonDetails {
  public static async dummyC100OtherPersonDetails(
    page: Page,
    otherPersonLivesInRefuge: boolean,
  ): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(
      page,
      "Other people in the case",
    );
    await DummyC100OtherPersonDetailsPage.dummyOtherPersonDetailsPage(
      page,
      otherPersonLivesInRefuge,
    );
    await page.click(
      `${Selectors.button}:text-is("${OtherPeopleInTheCase1Content.continue}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${OtherPeopleInTheCaseSubmitContent.continue}")`,
    );
  }
}
