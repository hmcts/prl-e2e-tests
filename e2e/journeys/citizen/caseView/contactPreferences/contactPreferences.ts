import { ActivateCase, CaseUser } from "../../activateCase/activateCase.ts";
import { Browser, Page } from "@playwright/test";
import { ContactPreferencesPage } from "../../../../pages/citizen/caseView/contactPreferences/contactPreferencesPage.ts";
import { ReviewPage } from "../../../../pages/citizen/caseView/contactPreferences/reviewPage.ts";
import { ConfirmationPage } from "../../../../pages/citizen/caseView/contactPreferences/confirmationPage.ts";
import {
  applicationSubmittedBy,
  contactOption,
} from "../../../../common/types.ts";

interface contactPreferencesParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  contactOption: contactOption;
  isApplicant: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
}

enum UniqueSelectors {
  contactPreferencesPrivateSelector = "#contactPreferences",
}

export class ContactPreferences {
  public static async contactPreferences({
    page,
    browser,
    caseRef,
    accessibilityTest,
    contactOption,
    isApplicant,
    applicationSubmittedBy,
  }: contactPreferencesParams): Promise<void> {
    const caseUser: CaseUser = isApplicant ? "applicant" : "respondent";
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: caseUser,
      accessibilityTest: accessibilityTest,
      applicationSubmittedBy: applicationSubmittedBy,
    });
    await page.click(UniqueSelectors.contactPreferencesPrivateSelector);
    await ContactPreferencesPage.contactPreferencesPage(
      page,
      accessibilityTest,
      contactOption,
    );
    await ReviewPage.reviewPage(page, accessibilityTest);
    await ConfirmationPage.confirmationPage(page, accessibilityTest);
  }
}
