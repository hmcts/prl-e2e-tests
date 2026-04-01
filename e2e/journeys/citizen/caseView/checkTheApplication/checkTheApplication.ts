import { Page } from "@playwright/test";
import { applicationSubmittedBy } from "../../../../common/types.js";

interface checkTheApplicationParams {
  page: Page;
  isApplicant: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
}

enum UniqueSelectors {
  yourApplicationApplicant = "#yourApplicationPDF",
  checkTheApplicationRespondent = "#checkTheApplication",
}

export class CheckTheApplication {
  public static async checkTheApplication({
    page,
    isApplicant,
    applicationSubmittedBy,
  }: checkTheApplicationParams): Promise<void> {
    if (isApplicant) {
      if (applicationSubmittedBy === "Citizen") {
        // view the application
        await page.locator(UniqueSelectors.yourApplicationApplicant).click();
      } else {
        // view the order
        await page.getByRole("link", { name: "View the order (PDF)" }).click();
      }
    } else {
      if (applicationSubmittedBy === "Citizen") {
        // view the application
        await page
          .locator(UniqueSelectors.checkTheApplicationRespondent)
          .click();
      } else {
        // view the order
        await page.getByRole("link", { name: "View the court documents" }).click();
      }
    }
    // TODO: update to actually check the screen
    await page.waitForTimeout(2000);
  }
}
