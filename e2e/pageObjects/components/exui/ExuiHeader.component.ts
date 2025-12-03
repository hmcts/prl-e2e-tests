import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.js";
import { WaitUtils } from "@hmcts/playwright-common";

export class ExuiHeaderComponent {
  private waitUtils = new WaitUtils();

  private readonly globalHeader: Locator = this.page.locator(
    "exui-hmcts-global-header",
  );

  private readonly results = this.page.locator("ccd-search-result");

  private readonly navigationHeader: Locator = this.page.locator(
    ".hmcts-primary-navigation",
  );
  private readonly signOutLink: Locator = this.page.locator(
    Selectors.GovukHeaderNavigationLink,
    {
      hasText: "Sign out",
    },
  );

  constructor(private page: Page) {}

  //this method is specific for case list page
  public async checkIsVisible(): Promise<void> {
    await expect(this.globalHeader).toBeVisible();
    await this.waitUtils.waitForLocatorVisibility(this.results, {
      visibility: true,
    });
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
