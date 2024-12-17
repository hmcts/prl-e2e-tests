import { Helpers } from "../../../../common/helpers";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { OtherPeopleInTheCase1Content } from "../../../../fixtures/manageCases/createCase/C100/otherPeopleInTheCaseRevised/otherPeopleInTheCaseRevised1Content.";
import { OtherPeopleInTheCaseSubmitContent } from "../../../../fixtures/manageCases/createCase/C100/otherPeopleInTheCaseRevised/otherPeopleInTheCaseSubmitContent";
import { DummyOtherPersonDetailsPage } from "../../../../pages/manageCases/createCase/C100/dummyCase/dummyOtherPersonDetailsPage";

export class DummyC100OtherPersonDetails {
  public static async dummyC100OtherPersonDetails(
    page: Page,
    otherPersonLivesInRefuge: boolean,
  ): Promise<void> {
    await Helpers.selectSolicitorEvent(page, "Other people in the case");
    await DummyOtherPersonDetailsPage.dummyOtherPersonDetailsPage(
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
