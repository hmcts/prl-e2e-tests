import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface otherPersonKeepingDetailsSafeOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class OtherPersonKeepingDetailsSafePage {
  public static async otherPersonKeepingDetailsSafePage({
    page: page,
    accessibilityTest: accessibilityTest,
  }: otherPersonKeepingDetailsSafeOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<otherPersonKeepingDetailsSafeOptions>): Promise<void> {
    if (!page) {
      throw new Error("Missing the page object.");
    }
    await expect(
      page.getByRole("heading", { name: /Keeping .* details safe/ }),
    ).toBeVisible();
    await expect(
      page.getByText(
        /We understand how important it is to feel safe, and know that .* details will be kept private./,
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        "The court will hold this information securely and will not share it with anyone else except the Children and Family Court Advisory and Support Service (Cafcass), Cafcass Cymru, or the local authority, if they are involved in your case, unless it is by order of the court.",
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        /To help us to keep .* details safe, do not include their details in any other communications during the case./,
      ),
    ).toBeVisible();
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page: page,
  }: Partial<otherPersonKeepingDetailsSafeOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page object not initialised.");
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
