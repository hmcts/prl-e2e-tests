import { ActivateCase, CaseUser } from "../../activateCase/activateCase.ts";
import { Browser, expect, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { applicationSubmittedBy } from "../../../../common/types.ts";
import { Helpers } from "../../../../common/helpers.ts";
import Config from "../../../../utils/config.utils.ts";

interface confirmApplicantContactInstructionsParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  isApplicant: boolean;
  accessibilityTest: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
}
interface FL401CaseConfidentialParams {
  page: Page;
  browser: Browser;
  courtIsListed: boolean;
  accessibilityTest: boolean;
  caseRef: string;
}

enum UniqueSelectors {
  confirmOrEditYourContactDetailsSelector = "#editYouContactDetails",
  phoneNumberEditButtonSelector = "#citizenUserPhoneNumberText",
  phoneNumberFieldSelector = "#citizenUserPhoneNumber",
  safeToCallFieldSelector = "#citizenUserSafeToCall",
  applicantContactInstructionsSelector = "#case-viewer-field-read--daApplicantContactInstructions span",
}

export class ConfirmApplicantContactInstructions {
  public static async confirmApplicantContactInstructions({
    page,
    browser,
    caseRef,
    isApplicant,
    accessibilityTest,
    applicationSubmittedBy,
  }: confirmApplicantContactInstructionsParams): Promise<void> {
    const caseUser: CaseUser = isApplicant ? "applicant" : "respondent";    
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: caseUser,
      applicationSubmittedBy: applicationSubmittedBy,
      accessibilityTest: accessibilityTest,
      isManualSOA: false,
    });
    await page.click(UniqueSelectors.confirmOrEditYourContactDetailsSelector);
    await this.updateApplicantContactInstructions(page);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
    // Calling FL401 Case Tabs to navigate to Confidential details tab and click on confidential details tab
    await this.fl401CaseConfidentialTab ({
      page,
      browser,
      courtIsListed: true,
      accessibilityTest: true,
      caseRef: caseRef,
    }    
    )
  }

  private static async updateApplicantContactInstructions(
    page: Page,
  ): Promise<void> {
    // go to your contact details page
    await page.click(UniqueSelectors.phoneNumberEditButtonSelector);
    // get value from phone number text field
    const phoneNumberValue = page.locator(
      UniqueSelectors.phoneNumberFieldSelector,
    );
     expect(phoneNumberValue).not.toBeNull();

    // check that value is not empty
     expect(phoneNumberValue).not.toBe("");

    // Enter a value into the "When it is safe to call you?" field and continue
    const safeToCallField = page.locator(
      UniqueSelectors.safeToCallFieldSelector,
    );
    await safeToCallField.clear();
    await safeToCallField.fill(
      `${CommonStaticText.applicantContactInstructions}`,
    );
    await page.click(Selectors.edgeCaseContinue);
  }

  public static async fl401CaseConfidentialTab({
    browser,
    caseRef,
  }: FL401CaseConfidentialParams): Promise<void> {
    const courtAdminPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "courtAdminStoke",
    );

    await Helpers.goToCase(
      courtAdminPage,
      Config.manageCasesBaseURLCase,
      caseRef,
      "Confidential details",
    );
    
    // Verify updated contact instructions are displayed on the Confidential details tab as expected
    await Helpers.checkVisibleAndPresent(
      courtAdminPage,
      `${UniqueSelectors.applicantContactInstructionsSelector}:text-is("${CommonStaticText.applicantContactInstructions}")`,
      1,
    );
  }
}

