import { expect, Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { SubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/viewPDFApplication/submitContent.ts";

export class ViewPDFApplicationSubmitPage {
  public static async viewPDFApplicationSubmitPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageContent(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageContent(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([this.checkPageLoads(page)]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkPageLoads(page: Page): Promise<void> {
    await expect(
      page.getByRole("heading", { name: SubmitContent.pageTitle }),
    ).toBeVisible();
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page
      .getByRole("button", { name: SubmitContent.saveAndContinue })
      .click();
  }
}
