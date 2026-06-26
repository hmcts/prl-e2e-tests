import { expect, Page } from "@playwright/test";
import { EventPage } from "../eventPage.po.ts";

export class C100AdminAddBarristerSubmit extends EventPage {
  constructor(page: Page) {
    super(page, "Add barrister");
  }

  async assertPageContents(): Promise<void> {
    await expect(this.submitButton).toBeVisible();
  }
}
