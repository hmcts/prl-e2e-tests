import { Base } from "../../base.po.js";
import { Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CreateBundle1Content } from "../../../../fixtures/manageCases/caseProgression/createBundle/createBundle1Content.js";
import { CreateBundleSubmitContent } from "../../../../fixtures/manageCases/caseProgression/createBundle/createBundleSubmitContent.js";

export class CreateBundleSubmitPage extends Base {
  private readonly pageTitle: Locator = this.page.locator(
    `${Selectors.GovukHeadingL}:text-is("${CreateBundle1Content.pageTitle}")`,
  );
  private readonly createBundleButton: Locator = this.page.locator(
    `${Selectors.button}:text-is("${CreateBundleSubmitContent.creatBundle}")`,
  );

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await this.pageTitle.waitFor();
  }

  async clickCreateBundle(): Promise<void> {
    await this.createBundleButton.click();
  }
}
