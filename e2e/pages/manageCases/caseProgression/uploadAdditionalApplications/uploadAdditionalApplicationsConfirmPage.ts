import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

export class UploadAdditionalApplicationsConfirmPage {
  public static async uploadAdditionalApplicationsConfirmPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    // TODO
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {}

  private static async closeAndReturnToCaseDetails(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.closeAndReturnToCaseDetails}")`,
    );
  }
}
