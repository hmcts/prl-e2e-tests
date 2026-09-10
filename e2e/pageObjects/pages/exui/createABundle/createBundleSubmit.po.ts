import { EventPage } from "../eventPage.po.js";
import { Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class CreateBundleSubmitPage extends EventPage {
  private readonly createBundleButton: Locator = this.page.locator(
    `${Selectors.button}:text-is("Create Bundle")`,
  );

  constructor(page: Page) {
    super(page, "Create a bundle");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
  }

  async clickCreateBundle(): Promise<void> {
    await this.createBundleButton.click();
  }
}
