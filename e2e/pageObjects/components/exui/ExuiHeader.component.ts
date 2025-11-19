import { expect, Locator, Page } from "@playwright/test";

export class ExuiHeaderComponent {
  private readonly globalHeader: Locator = this.page.locator(
    "exui-hmcts-global-header",
  );
  private readonly hmctsHeader: Locator = this.page.locator(".hmcts-header");
  private readonly navigationHeader: Locator = this.page.locator(
    ".hmcts-primary-navigation",
  );
  private readonly signOutLink: Locator = this.globalHeader.locator(
    ".hmcts-header__navigation-link",
    {
      hasText: "Sign out",
    },
  );

  constructor(private page: Page) {}

  async checkIsVisible(): Promise<void> {
    await expect(this.globalHeader).toBeVisible();
  }

  async clickNoticeOfChange(): Promise<void> {
    await this.navigationHeader
      .getByRole("link", { name: "Notice of change" })
      .click();
  }
  
  async signOut(): Promise<void> {
    await this.signOutLink.click();
  }
}
