import { expect, Locator, Page } from "@playwright/test";
import { EventPage } from "../eventPage.po.js";
import { Selectors } from "../../../../common/selectors.js";

export class AdminAddLocalAuthority1Page extends EventPage {
  private readonly searchOrgInput: Locator =
    this.page.locator("#search-org-text");

  private readonly searchOrgHeading: Locator = this.page.locator(
    Selectors.headingH2,
    { hasText: "Search for an organisation" },
  );

  private readonly orgHint: Locator = this.page.locator(Selectors.GovukHint, {
    hasText:
      "You can only search for organisations already registered with MyHMCTS. For example, you can search by organisation name or address.",
  });

  private readonly orgNameAndAddressHeading: Locator = this.page.locator(
    Selectors.headingH2,
    { hasText: "Organisation name and address" },
  );

  private readonly cantFindOrgDetails: Locator = this.page.locator(
    Selectors.GovukDetailsText,
    {
      hasText:
        "If you know that the solicitor is already registered with MyHMCTS, check that you have entered their details correctly.",
    },
  );

  constructor(page: Page) {
    super(page, "Add local authority");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.searchOrgHeading).toBeVisible();
    await expect(this.orgHint).toBeVisible();
    await expect(this.orgNameAndAddressHeading).toBeVisible();
    await expect(this.cantFindOrgDetails).toBeHidden();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async searchAndSelectOrganisation(orgName: string): Promise<void> {
    await this.searchOrgInput.fill(orgName);
    await this.searchOrgInput.press("Enter");
    // Wait for the results table to appear before clicking Select
    await this.page
      .locator("#organisation-table")
      .waitFor({ state: "visible" });
    await this.page.getByTitle(`Select the organisation ${orgName}`).click();
  }

  async searchSelectAndContinue(orgName: string): Promise<void> {
    await this.searchAndSelectOrganisation(orgName);
    await this.clickContinue();
  }

  async clearOrganisation(orgName: string): Promise<void> {
    await this.page
      .getByTitle(`Clear organisation selection for ${orgName}`)
      .click();
  }

  async assertSelectedOrganisation(orgName: string): Promise<void> {
    await expect(
      this.page.locator(".name-header", { hasText: orgName }),
    ).toBeVisible();
  }
}
