import { expect, Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../../common/commonStaticText.js";

interface RespondentKeepingDetailsSafePageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class RespondentKeepingDetailsSafePage {
  public static async respondentKeepingDetailsSafePage({
    page,
    accessibilityTest,
  }: RespondentKeepingDetailsSafePageOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await expect(
      page.getByRole("heading", { name: /Keeping .* details safe/ }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "We understand how important it is to feel safe, and know that test test's details will be kept private.",
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        "The court will hold this information securely and will not share it with anyone else except the Children and Family Court Advisory and Support Service (Cafcass), Cafcass Cymru, or the local authority, if they are involved in your case, unless it is by order of the court.",
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        "To help us to keep test test's details safe, do not include their details in any other communications during the case.",
      ),
    ).toBeVisible();
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
