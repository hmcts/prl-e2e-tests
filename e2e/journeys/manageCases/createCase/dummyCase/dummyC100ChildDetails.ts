import { Helpers } from "../../../../common/helpers.ts";
import { Page } from "@playwright/test";
import { DummyChildDetailsRevised1Page } from "../../../../pages/manageCases/createCase/C100/dummyCase/dummyChildDetailsRevised1Page.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { ChildDetailsRevised2Content } from "../../../../fixtures/manageCases/createCase/C100/childDetails/childDetailsRevised2Content.ts";
import { ChildDetailsSubmitPageContent } from "../../../../fixtures/manageCases/createCase/C100/childDetails/childDetailsSubmitPageContent.ts";

export class DummyC100ChildDetails {
  public static async dummyC100ChildDetails(page: Page): Promise<void> {
    await Helpers.selectSolicitorEvent(page, "Child details");
    await DummyChildDetailsRevised1Page.dummyChildDetailsRevised1Page(page);
    await page.click(
      `${Selectors.button}:text-is("${ChildDetailsRevised2Content.continue}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${ChildDetailsSubmitPageContent.continue}")`,
    );
  }
}
