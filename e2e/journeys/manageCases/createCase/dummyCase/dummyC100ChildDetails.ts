import { Helpers } from "../../../../common/helpers";
import { Page } from "@playwright/test";
import { DummyChildDetailsRevised1Page } from "../../../../pages/manageCases/createCase/C100/dummyCase/dummyChildDetailsRevised1Page";
import { Selectors } from "../../../../common/selectors";
import { ChildDetailsRevised2Content } from "../../../../fixtures/manageCases/createCase/C100/childDetails/childDetailsRevised2Content";
import { ChildDetailsSubmitPageContent } from "../../../../fixtures/manageCases/createCase/C100/childDetails/childDetailsSubmitPageContent";

export class DummyC100ChildDetails {
  // currently need to complete child details event as it is the only event not pre-completed for a dummy case
  public static async dummyC100ChildDetails(page: Page): Promise<void> {
    await Helpers.selectSolicitorEvent(page, "Child details");
    await DummyChildDetailsRevised1Page.dummyChildDetailsRevised1Page(page);
    // no need to check page for dummy journey just continue as data is already filled in
    await page.click(
      `${Selectors.button}:text-is("${ChildDetailsRevised2Content.continue}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${ChildDetailsSubmitPageContent.continue}")`,
    );
  }
}
