import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { PageUtils } from "../../../../utils/page.utils.js";

export class BundlesPage extends CaseAccessViewPage {
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  private readonly warningBanner: Locator = this.page.locator(
    Selectors.GovukWarningText,
    {
      hasText:
        "Please check all areas of the digital case management system, as documents may be stored in different sections and not be available in the created bundle",
    },
  );

  private readonly bundleContents: string[] = [
    "Bundle Details",
    "Bundle Creation Date and Time",
    "Case Bundles",
    "Case Bundles 1",
    "Stitch status",
    "DONE",
    "Stitched document",
    "Bundle ID",
  ];

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Bundles" }).click();
  }

  /**
   * Bundle stitching happens asynchronously after "Create a bundle" is
   * submitted. Polls the Bundles tab, reloading the page each retry, until
   * the "DONE" stitch status appears.
   */
  async waitForBundleStitched(): Promise<void> {
    await expect
      .poll(
        async () => {
          const bundleGenerated = await this.page.getByText("DONE").isVisible();
          if (!bundleGenerated) {
            await this.page.reload();
          }
          return bundleGenerated;
        },
        {
          // Allow 5s delay before retrying
          intervals: [5_000],
          // Allow up to a minute
          timeout: 60_000,
        },
      )
      .toBeTruthy();
  }

  async assertBundleContents(): Promise<void> {
    await expect(this.warningBanner).toBeVisible();
    await this.pageUtils.assertStrings(this.bundleContents);
  }
}
