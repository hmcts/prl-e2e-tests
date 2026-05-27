import { expect, Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../../common/commonStaticText.js";

interface OtherPersonKeepingAddressPrivateFeedbackPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  keepingAddressPrivate: boolean;
}

export class OtherPersonKeepingAddressPrivateFeedbackPage {
  public static async otherPersonKeepingAddressPrivateFeedbackPage({
    page,
    accessibilityTest,
    keepingAddressPrivate,
  }: OtherPersonKeepingAddressPrivateFeedbackPageOptions): Promise<void> {
    await this.checkPageLoads(page, keepingAddressPrivate, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    keepingAddressPrivate: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    if (keepingAddressPrivate) {
      await expect(
        page.getByRole("heading", {
          name: /The court will keep .* address private/,
        }),
      ).toBeVisible();
      await expect(
        page.getByText(/You have told us you want to keep .* address private/),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "What the court will do" }),
      ).toBeVisible();
      await expect(
        page.getByText(
          "The court will hold this information securely and will not share it with anyone except the Children and Family Court Advisory and Support Service (Cafcass), Cafcass Cymru, or the local authority, if they are involved in your case, unless it is by order of the court.",
        ),
      ).toBeVisible();
    } else {
      await expect(
        page.getByRole("heading", {
          name: /The court will not keep .* address private/,
        }),
      ).toBeVisible();
      await expect(
        page.getByText(
          /You have told us you do not want to keep .* address private from the other people in this application./,
        ),
      ).toBeVisible();
    }
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

  private static async fillInFields(page: Page): Promise<void> {
    await page.getByRole("button", { name: CommonStaticText.continue }).click();
  }
}
