import { Browser, Page, expect } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { AdminAddLocalAuthority1Page } from "../../../../pageObjects/pages/exui/addLocalAuthority/adminAddLocalAuthority1.po.ts";
import { AdminAddLocalAuthoritySubmitPage } from "../../../../pageObjects/pages/exui/addLocalAuthority/adminAddLocalAuthoritySubmit.po.ts";
import { AdminAddLocalAuthorityConfirmPage } from "../../../../pageObjects/pages/exui/addLocalAuthority/adminAddLocalAuthorityConfirm.po.ts";
import { SummaryPage } from "../../../../pageObjects/pages/exui/caseView/summary.po.ts";
import Config from "../../../../utils/config.utils.ts";
import { IdamLoginHelper } from "../../../../utils/idamLoginHelper.utils.ts";
import { ManageDocumentsNew1Page } from "../../../../pages/manageCases/caseProgression/manageDocuments/manageDocumentsNew1Page.ts";
import { ManageDocumentsNewSubmitPage } from "../../../../pages/manageCases/caseProgression/manageDocuments/manageDocumentsNewSubmit.ts";
import { ManageDocumentsNewConfirmPage } from "../../../../pages/manageCases/caseProgression/manageDocuments/manageDocumentsNewConfirmPage.ts";

// Documents to upload on behalf of Local authority:
// - 2 confidential + restricted (Position statements, Guardian report)
// - 2 non-confidential + non-restricted (CIR extension request, CIR transfer request)
const LA_DOCUMENTS: Array<{
  documentCategory: string;
  confidentialDocument: boolean;
  restrictDocument: boolean;
}> = [
  { documentCategory: "Position statements",    confidentialDocument: true,  restrictDocument: true  },
  { documentCategory: "Guardian report",         confidentialDocument: true,  restrictDocument: true  },
  { documentCategory: "CIR extension request",  confidentialDocument: false, restrictDocument: false },
  { documentCategory: "CIR transfer request",   confidentialDocument: false, restrictDocument: false },
];

interface AdminAddLocalAuthorityParams {
  page: Page;
  browser: Browser;
  accessibilityTest: boolean;
  organisationName: string;
  caseRef: string;
  localAuthorityUserEmail: string;
}

export class AdminAddLocalAuthority {
  public static async adminAddLocalAuthority({
    page,
    browser,
    accessibilityTest,
    organisationName,
    caseRef,
    localAuthorityUserEmail,
  }: AdminAddLocalAuthorityParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Add Local Authority");

    const page1 = new AdminAddLocalAuthority1Page(page);
    await page1.assertPageContents();
    if (accessibilityTest) {
      await page1.verifyAccessibility();
    }
    
    await page1.searchSelectAndContinue(organisationName);

    const submitPage = new AdminAddLocalAuthoritySubmitPage(page);
    await submitPage.assertPageContents(["caseProgression", "addLocalAuthority"], "submit");
    await submitPage.assertOrganisationDetails(organisationName, "");
    if (accessibilityTest) {
      await submitPage.verifyAccessibility();
    }
    await submitPage.submitForm();

    const confirmPage = new AdminAddLocalAuthorityConfirmPage(page);
    await confirmPage.assertPageContents();
    if (accessibilityTest) {
      await confirmPage.verifyAccessibility();
    }
    await confirmPage.closeAndReturn();

    await Helpers.clickTab(page, "Summary");
    const summaryPage = new SummaryPage(page);
    await summaryPage.assertLocalAuthoritySection(organisationName);

    await this.verifyLocalAuthorityOrgCases(browser, organisationName, caseRef, localAuthorityUserEmail, accessibilityTest);
  }

  private static async verifyLocalAuthorityOrgCases(
    browser: Browser,
    organisationName: string,
    caseRef: string,
    localAuthorityUserEmail: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    const laPage = await Helpers.openNewBrowserWindow(browser, "localAuthority");

    // Log in as the local authority user to Manage Cases
    const idamLoginHelper = new IdamLoginHelper();
    await idamLoginHelper.signInLongLivedUser(
      laPage,
      "localAuthority",
      Config.manageCasesBaseURL,
    );

    // --- Manage Cases: verify case is visible to the LA user via CCD number filter ---
    await laPage.goto(`${Config.manageCasesBaseURL}/cases`);
    await laPage.waitForLoadState("domcontentloaded");

    // Enter the case reference in the CCD number field and apply
    // The field id contains brackets so we use CSS attribute selector
    await laPage.locator('input[id="[CASE_REFERENCE]"]').fill(caseRef);
    await laPage
      .locator("button.workbasket-filters-apply", { hasText: "Apply" })
      .click();
    await laPage.waitForLoadState("domcontentloaded");

    // Assert the case appears in the results table then click it
    const dashedRef = caseRef.replace(/(.{4})/g, "$1-").slice(0, -1);
    const caseLink = laPage.locator(
      `a.govuk-link[aria-label*="${dashedRef}"]`,
    );
    await expect(caseLink).toBeVisible();
    await caseLink.click();
    await laPage.waitForLoadState("domcontentloaded");

    // Assert we landed on the case details page
    await expect(
      laPage.locator("ccd-case-header"),
    ).toBeVisible();

    // Select "Manage documents" via the standard event dropdown and click Go
    await Helpers.chooseEventFromDropdown(laPage, "Manage documents");

    // --- Manage Documents: upload 4 documents (2 conf+restricted, 2 non-conf+non-restricted) ---
    // The form starts with one empty slot; each additional doc needs "Add new" first.
    for (let i = 0; i < LA_DOCUMENTS.length; i++) {
      const doc = LA_DOCUMENTS[i];
      if (i > 0) {
        // Click "Add new" to open a fresh document slot
        await laPage
          .locator("button.button.write-collection-add-item__top", { hasText: "Add new" })
          .last()
          .click();
      }
      await ManageDocumentsNew1Page.fillDocumentSlot({
        page: laPage,
        index: i,
        documentParty: "Local authority",
        documentCategory: doc.documentCategory,
        confidentialDocument: doc.confidentialDocument,
        restrictDocument: doc.restrictDocument,
      });
    }

    // Submit the form and proceed through confirm
    await ManageDocumentsNew1Page.clickContinue(laPage);
    await ManageDocumentsNewSubmitPage.manageDocumentsNewSubmitPage({
      page: laPage,
      accessibilityTest,
      documentParty: "Local authority",
      documentCategory: LA_DOCUMENTS[0].documentCategory,
      restrictDocument: LA_DOCUMENTS[0].restrictDocument,
      confidentialDocument: LA_DOCUMENTS[0].confidentialDocument,
    });
    await ManageDocumentsNewConfirmPage.manageDocumentsNewConfirmPage({
      page: laPage,
      accessibilityTest,
    });

    if (accessibilityTest) {
      const { AxeUtils } = await import("@hmcts/playwright-common");
      await new AxeUtils(laPage).audit();
    }

    // --- Navigate to the Manage Organisation cases list ---
    await laPage.goto(`${Config.manageOrgBaseURL}/cases`);
    await laPage.waitForLoadState("domcontentloaded");

    // Assert page caption and heading
    await expect(
      laPage.locator("span.govuk-caption-xl", { hasText: organisationName }),
    ).toBeVisible();
    await expect(
      laPage.getByRole("heading", { name: "Cases", level: 1 }),
    ).toBeVisible();
    await expect(laPage.getByRole("link", { name: "Cases" })).toBeVisible();

    // Open the filter panel
    await laPage
      .getByRole("button", { name: /show cases filter/i })
      .click();

    // Select "Find case by reference number" radio
    await laPage.locator("#findCaseByReferenceNumber").check();

    // Enter the 16-digit case reference number
    await laPage.locator("#case-reference-number").fill(caseRef);

    // Apply the filter
    await laPage
      .getByRole("button", { name: /apply filter/i })
      .click();

    // Wait for filtered results to load
    await laPage.waitForLoadState("domcontentloaded");

    // Assert filtered results — exactly 1 case matching the reference
    await expect(
      laPage.locator("p.govuk-body", { hasText: "1 PRLAPPS" }),
    ).toBeVisible();
    await expect(laPage.locator("table.govuk-table")).toBeVisible();

    // Select the first case row checkbox
    await laPage.locator("#select-0").check();

    // Accept cases button is enabled only after a case is selected
    const acceptCasesButton = laPage.locator("#btn-share-unassigned-case-button");
    await expect(acceptCasesButton).toBeEnabled();
    await acceptCasesButton.click();

    // --- Add recipient page ---
    // Wait for the "Add recipient" heading to confirm navigation
    await expect(
      laPage.getByRole("heading", { name: "Add recipient" }),
    ).toBeVisible();

    // Assert the selected case reference is shown under "Selected cases"
    await expect(
      laPage.locator(`#case-title-${caseRef}`),
    ).toBeVisible();

    // Type the local authority user email into the autocomplete input
    const emailInput = laPage.locator("xuilib-user-select input");
    await emailInput.fill(localAuthorityUserEmail);

    // Wait for the autocomplete suggestion to appear and click the matching option
    const suggestion = laPage.locator("mat-option", {
      hasText: localAuthorityUserEmail,
    });
    await suggestion.waitFor({ state: "visible" });
    await suggestion.click();

    // Add button becomes active after a valid user is selected
    const addButton = laPage.locator("#btn-add-user");
    await expect(addButton).toBeEnabled();
    await addButton.click();

    if (accessibilityTest) {
      const { AxeUtils } = await import("@hmcts/playwright-common");
      await new AxeUtils(laPage).audit();
    }

    // Continue to the confirmation page
    await laPage.locator("#btn-continue").click();

    // --- Check and confirm your selection page ---
    await expect(
      laPage.getByRole("heading", { name: "Check and confirm your selection" }),
    ).toBeVisible();

    // Assert the case reference is shown
    await expect(
      laPage.locator(`#user-access-block-${caseRef}`),
    ).toBeVisible();

    // Assert the user email row is present with "To be added" badge
    await expect(
      laPage.locator("td.govuk-table__cell", { hasText: localAuthorityUserEmail }),
    ).toBeVisible();
    await expect(
      laPage.locator("span.hmcts-badge", { hasText: "To be added" }),
    ).toBeVisible();

    if (accessibilityTest) {
      const { AxeUtils } = await import("@hmcts/playwright-common");
      await new AxeUtils(laPage).audit();
    }

    // Confirm the case sharing
    await laPage.getByRole("button", { name: "Confirm" }).click();

    // --- Case share complete page ---
    // Assert the green success panel
    await expect(
      laPage.locator(".govuk-panel", {
        hasText: "Your selected cases have been updated",
      }),
    ).toBeVisible();

    // Assert "What happens next" body text
    await expect(
      laPage.getByRole("heading", { name: "What happens next" }),
    ).toBeVisible();
    await expect(
      laPage.locator(".govuk-body", {
        hasText: "your colleagues will now be able to access them from their case list",
      }),
    ).toBeVisible();

    // Assert "Go to Cases" link is present
    await expect(
      laPage.getByRole("link", { name: "Go to Cases" }),
    ).toBeVisible();

    if (accessibilityTest) {
      const { AxeUtils } = await import("@hmcts/playwright-common");
      await new AxeUtils(laPage).audit();
    }

    await laPage.close();
  }
}

