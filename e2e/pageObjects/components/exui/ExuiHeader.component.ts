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

  private readonly logo: Locator = this.page.locator(Selectors.GovukLogo, {
    hasText: "MyHMCTS",
  });

  private readonly manageCasesLink: Locator = this.page.locator(
    Selectors.GovukHeaderLink,
    {
      hasText: "Manage Cases",
    },
  );
  private readonly signOutLink: Locator = this.page.locator(
    Selectors.GovukHeaderNavigationLink,
    {
      hasText: "Sign out",
    },
  );
  private readonly caseListNavigation: Locator = this.page.locator(
    Selectors.GovukNavigationLink,
    {
      hasText: "Case list",
    },
  );
  private readonly createCaseNavigation: Locator = this.page.locator(
    Selectors.GovukNavigationLink,
    {
      hasText: "Create case",
    },
  );
  private readonly noticeOfChangeNavigation: Locator = this.page.locator(
    Selectors.GovukNavigationLink,
    {
      hasText: "Notice of change",
    },
  );
  private readonly findCaseNavigation: Locator = this.page.locator(
    Selectors.GovukNavigationLink,
    {
      hasText: "Find case",
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

  //this method validates if the Exui header loads correctly, its common component present all across other Exui pages
  async checkEuiHeaderIsVisible(): Promise<void> {
    await expect(this.logo).toBeVisible();
    await expect(this.manageCasesLink).toBeVisible();
    await expect(this.signOutLink).toBeVisible();
    await expect(this.caseListNavigation).toBeVisible();
    await expect(this.createCaseNavigation).toBeVisible();
    await expect(this.noticeOfChangeNavigation).toBeVisible();
    await expect(this.findCaseNavigation).toBeVisible();
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
