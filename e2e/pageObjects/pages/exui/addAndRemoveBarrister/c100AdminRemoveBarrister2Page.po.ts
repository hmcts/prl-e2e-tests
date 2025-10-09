import { EventPage } from "../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

export class C100AdminRemoveBarrister2Page extends EventPage {
  private readonly submitButton: Locator = this.page.locator(Selectors.button, {
    hasText: CommonStaticText.submit,
  });

  constructor(page: Page) {
    super(page, "Remove barrister");
  }

  async assertPageContents(change2: string, checkYA2: string): Promise<void> {
    await this.assertPageHeadings();
    await expect(
      this.page.locator(Selectors.h2, { hasText: checkYA2 }),
    ).toBeVisible();
    await expect(
      this.page.locator(Selectors.Span, { hasText: change2 }),
    ).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }
}
