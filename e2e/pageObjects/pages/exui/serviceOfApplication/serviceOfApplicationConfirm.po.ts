import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../utils/page.utils.ts";
import { EventPage } from "../eventPage.po.ts";

export class ServiceOfApplicationConfirmPage extends EventPage {
  private readonly pageUtils = new PageUtils(this.page);
  private readonly confidentialityHeading: Locator = this.page.getByRole(
    "heading",
    {
      name: "The application will be reviewed for confidential details",
      exact: true,
    },
  );
  private readonly whatHappensNextHeading: Locator = this.page.getByRole(
    "heading",
    { name: "What happens next", exact: true },
  );
  private readonly serviceOfApplicationLink: Locator = this.page.getByRole(
    "link",
    { name: "service of application", exact: true },
  );

  constructor(page: Page) {
    super(page, "Service of application");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.confidentialityHeading).toBeVisible();
    await expect(this.whatHappensNextHeading).toBeVisible();
    await this.pageUtils.assertStrings([
      "The service pack needs to be reviewed for confidential details before it can be served.",
    ]);
    await expect(
      this.page.locator('p:text-is("You can view the service packs in the")'),
    ).toBeVisible();
    await expect(this.page.locator('p:text-is("tab.")')).toBeVisible();
    await expect(this.serviceOfApplicationLink).toBeVisible();
    await expect(this.closeAndReturnToCaseDetailsButton).toBeVisible();
  }
}
