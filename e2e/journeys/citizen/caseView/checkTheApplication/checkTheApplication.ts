import { Page } from "@playwright/test";

interface checkTheApplicationParams {
  page: Page;
  isApplicant: boolean;
}

enum UniqueSelectors {
  yourApplicationApplicant = "#yourApplicationPDF",
  checkTheApplicationRespondent = "#checkTheApplication",
}

export class CheckTheApplication {
  public static async checkTheApplication({
    page,
    isApplicant,
  }: checkTheApplicationParams): Promise<void> {
    if (isApplicant) {
      await page.click(UniqueSelectors.yourApplicationApplicant);
    } else {
      await page.click(UniqueSelectors.checkTheApplicationRespondent);
    }
    await page.waitForTimeout(2000);
  }
}
