import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ChildDetailsRevised1Content } from "../../../../../fixtures/manageCases/createCase/C100/childDetails/childDetailsRevised1Content";

export class DummyChildDetailsRevised1Page {
  public static async dummyChildDetailsRevised1Page(page: Page): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${ChildDetailsRevised1Content.pageTitle}")`,
    );
    for (let i = 0; i < 5; i++) {
      await page.selectOption(`#newChildDetails_${i}_whoDoesTheChildLiveWith`, {
        index: 1,
      });
    }
    await page.click(
      `${Selectors.button}:text-is("${ChildDetailsRevised1Content.continue}")`,
    );
  }
}
