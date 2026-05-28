import { expect, Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../../common/commonStaticText.js";

interface OtherPersonKeepingAddressPrivatePageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  keepingAddressPrivate: boolean;
}

export class OtherPersonKeepingAddressPrivatePage {
  public static async otherPersonKeepingAddressPrivatePage({
    page,
    accessibilityTest,
    keepingAddressPrivate,
  }: OtherPersonKeepingAddressPrivatePageOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, keepingAddressPrivate);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await expect(
      page.getByRole("heading", { name: "Keeping address private" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        /The information you give us will be shared with the other people named in this application. This includes .* address, unless you ask the court to keep this private./,
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        /You can request this if, for example, you believe that sharing this information may lead to unwanted contact or a risk of harm to .* or the children./,
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        /Do you want to request to keep .* address private from the other people named in this application\?/,
      ),
    ).toBeVisible();
    await expect(page.getByText("Yes")).toBeVisible();
    await expect(page.getByText("No")).toBeVisible();
    await expect(
      page.getByRole("button", { name: CommonStaticText.continue }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: CommonStaticText.saveAndComeBackLater }),
    ).toBeVisible();
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    keepingAddressPrivate: boolean,
  ): Promise<void> {
    await page
      .getByRole("radio", { name: keepingAddressPrivate ? "Yes" : "No" })
      .check();
    await page.getByRole("button", { name: CommonStaticText.continue }).click();
  }
}
