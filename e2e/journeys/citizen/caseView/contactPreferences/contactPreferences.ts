import { Page } from "@playwright/test";
import { ContactPreferencesPage } from "../../../../pages/citizen/caseView/contactPreferences/contactPreferencesPage.ts";
import { ReviewPage } from "../../../../pages/citizen/caseView/contactPreferences/reviewPage.ts";
import { ConfirmationPage } from "../../../../pages/citizen/caseView/contactPreferences/confirmationPage.ts";
import { contactOption } from "../../../../common/types.ts";

interface contactPreferencesParams {
  page: Page;
  accessibilityTest: boolean;
  isApplicant: boolean;
  contactOption: contactOption;
}

enum UniqueSelectors {
  contactPreferencesPrivateSelector = "#contactPreferences",
}

export class ContactPreferences {
  public static async contactPreferences({
    page,
    accessibilityTest,
    isApplicant,
    contactOption,
  }: contactPreferencesParams): Promise<void> {
    await page
      .locator(UniqueSelectors.contactPreferencesPrivateSelector)
      .click();
    await ContactPreferencesPage.contactPreferencesPage(
      page,
      accessibilityTest,
      contactOption,
    );
    await ReviewPage.reviewPage(page, isApplicant, accessibilityTest);
    await ConfirmationPage.confirmationPage(page, accessibilityTest);
  }
}
