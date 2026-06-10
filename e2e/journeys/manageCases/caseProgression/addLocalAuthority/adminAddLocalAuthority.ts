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

// Documents to upload on behalf of Local authority (5 docs, requires 4x "Add new" clicks):
// - 2 confidential + restricted  (Child Impact Report 1 & 2)
// - 1 confidential, not restricted (Section 7 report)
// - 2 non-confidential + non-restricted (CIR extension request, CIR transfer request)
const LA_DOCUMENTS: Array<{
  documentCategory: string;
  confidentialDocument: boolean;
  restrictDocument: boolean;
  filePath: string;
}> = [
  {
    documentCategory: "Child Impact Report 1",
    confidentialDocument: true,
    restrictDocument: false,
    filePath: Config.testPdfFileCR1,
  },
  {
    documentCategory: "Child Impact Report 2",
    confidentialDocument: false,
    restrictDocument: true,
    filePath: Config.testPdfFileCR2,
  },
  {
    documentCategory: "CIR extension request",
    confidentialDocument: false,
    restrictDocument: false,
    filePath: Config.testPdfFileExtention,
  },
  {
    documentCategory: "CIR transfer request",
    confidentialDocument: false,
    restrictDocument: false,
    filePath: Config.testPdfFileRequest,
  },
  {
    documentCategory: "Section 7 report",
    confidentialDocument: false,
    restrictDocument: false,
    filePath: Config.testPdfFileSection7,
  },
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
    await Helpers.chooseEventFromDropdown(page, "Add local authority");

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
    const idamLoginHelper = new IdamLoginHelper();

    // ── STEP 1: Login to Manage Organisation ─────────────────────────────────
    console.log(`[STEP 1] Logging in to Manage Organisation as LA user`);
    await idamLoginHelper.signInLongLivedUser(
      laPage,
      "localAuthority",
      `${Config.manageOrgBaseURL}/organisation`,
      "localAuthorityManageOrg",
    );
    console.log(`[STEP 1] Login to Manage Organisation complete`);

    // ── STEP 2: Navigate to Manage Org cases list ─────────────────────────────
    console.log(`[STEP 2] Navigating to Manage Org cases list`);
    await laPage.goto(`${Config.manageOrgBaseURL}/cases`);
    await laPage.waitForLoadState("domcontentloaded");

    await expect(
      laPage.locator("span.govuk-caption-xl", { hasText: organisationName }),
    ).toBeVisible();
    await expect(
      laPage.getByRole("heading", { name: "Cases", level: 1 }),
    ).toBeVisible();
    await expect(laPage.getByRole("link", { name: "Cases" })).toBeVisible();
    console.log(`[STEP 2] Manage Org cases page loaded for org: ${organisationName}`);

    // ── STEP 3: Filter by case reference ─────────────────────────────────────
    console.log(`[STEP 3] Opening filter and entering case ref: ${caseRef}`);
    await laPage
      .getByRole("button", { name: /show cases filter/i })
      .click();

    await laPage.locator("#findCaseByReferenceNumber").check();
    await laPage.locator("#case-reference-number").fill(caseRef);

    await laPage
      .getByRole("button", { name: /apply filter/i })
      .click();

    await laPage.waitForLoadState("domcontentloaded");

    await expect(
      laPage.locator("p.govuk-body", { hasText: "1 PRLAPPS" }),
    ).toBeVisible();
    await expect(laPage.locator("table.govuk-table")).toBeVisible();
    console.log(`[STEP 3] Filter applied — 1 case found for ref: ${caseRef}`);

    // ── STEP 4: Select the case and click Accept ──────────────────────────────
    console.log(`[STEP 4] Selecting case checkbox and clicking Accept cases`);
    await laPage.locator("#select-0").check();

    const acceptCasesButton = laPage.locator("#btn-share-unassigned-case-button");
    await expect(acceptCasesButton).toBeEnabled();
    await acceptCasesButton.click();
    console.log(`[STEP 4] Accept cases clicked`);

    // ── STEP 5: Add recipient ─────────────────────────────────────────────────
    console.log(`[STEP 5] On Add recipient page — typing email: ${localAuthorityUserEmail}`);
    await expect(
      laPage.getByRole("heading", { name: "Add recipient" }),
    ).toBeVisible();

    await expect(
      laPage.locator(`#case-title-${caseRef}`),
    ).toBeVisible();

    const emailInput = laPage.locator("xuilib-user-select input");
    await emailInput.click();
    await emailInput.pressSequentially(localAuthorityUserEmail, { delay: 50 });

    const suggestion = laPage.locator("mat-option", {
      hasText: localAuthorityUserEmail,
    });
    await suggestion.waitFor({ state: "visible" });
    await suggestion.click();
    console.log(`[STEP 5] Email suggestion selected`);

    const addButton = laPage.locator("#btn-add-user");
    await expect(addButton).toBeEnabled();
    await addButton.click();
    console.log(`[STEP 5] Add user button clicked`);

    if (accessibilityTest) {
      const { AxeUtils } = await import("@hmcts/playwright-common");
      await new AxeUtils(laPage).audit();
    }

    // ── STEP 6: Continue to Check and confirm ────────────────────────────────
    console.log(`[STEP 6] Clicking Continue to Check and confirm page`);
    await laPage.locator("#btn-continue").click();

    await expect(
      laPage.getByRole("heading", { name: "Check and confirm your selection" }),
    ).toBeVisible();

    await expect(
      laPage.locator(`#user-access-block-${caseRef}`),
    ).toBeVisible();

    await expect(
      laPage.locator("td.govuk-table__cell", { hasText: localAuthorityUserEmail }),
    ).toBeVisible();
    await expect(
      laPage.locator("span.hmcts-badge", { hasText: "To be added" }),
    ).toBeVisible();
    console.log(`[STEP 6] Check and confirm page verified`);

    if (accessibilityTest) {
      const { AxeUtils } = await import("@hmcts/playwright-common");
      await new AxeUtils(laPage).audit();
    }

    // ── STEP 7: Confirm case sharing ─────────────────────────────────────────
    console.log(`[STEP 7] Clicking Confirm`);
    await laPage.getByRole("button", { name: "Confirm" }).click();

    await expect(
      laPage.locator(".govuk-panel", {
        hasText: "Your selected cases have been updated",
      }),
    ).toBeVisible();

    await expect(
      laPage.getByRole("link", { name: "Go to Cases" }),
    ).toBeVisible();
    console.log(`[STEP 7] Case sharing confirmed — success panel visible`);

    if (accessibilityTest) {
      const { AxeUtils } = await import("@hmcts/playwright-common");
      await new AxeUtils(laPage).audit();
    }


    // STEP 8: Navigate to Manage Cases
    // The LA user's IDAM session is already active from the Manage Org login above
    // (same browser context, same cookies). Navigating directly to the case list
    // works without a second sign-in. signInLongLivedUser is NOT called here —
    // it would hang waiting for the IDAM sign-in page that never appears.
    console.log(`[STEP 8] Navigating to Manage Cases case list`);
    await laPage.goto(`${Config.manageCasesBaseURL}/cases`);
    // await laPage.waitForLoadState("networkidle");
    console.log(`[STEP 8] Manage Cases case list loaded`);

    // ── STEP 9: Open the case from the case list ──────────────────────────────
    console.log(`[STEP 9] Waiting for case list and clicking case: ${caseRef}`);
    await expect(laPage.locator("ccd-search-result")).toBeVisible({ timeout: 30_000 });

    const dashedRef = caseRef.match(/.{1,4}/g)?.join("-") ?? caseRef;
    console.log(`[STEP 9] Clicking case link with aria-label ref: ${dashedRef}`);
    await laPage
      .locator(`a[aria-label="go to case with Case reference:${dashedRef}"]`)
      .click();

    await laPage.waitForLoadState("domcontentloaded");
    await expect(laPage.locator("ccd-case-header")).toBeVisible();
    await expect(laPage.locator("ccd-case-header")).toContainText(dashedRef);
    console.log(`[STEP 9] Case detail page loaded and verified: ${dashedRef}`);

    // ── STEP 10: Navigate to Summary tab ─────────────────────────────────────
    console.log(`[STEP 10] Clicking Summary tab`);
    await Helpers.clickTab(laPage, "Summary");

    // ── STEP 11: Launch Manage documents event ───────────────────────────────
    console.log(`[STEP 11] Selecting Manage documents from dropdown`);
    await Helpers.chooseEventFromDropdown(laPage, "Manage documents");
    console.log(`[STEP 11] Manage documents event launched`);

    // ── STEP 12: Upload 4 documents ──────────────────────────────────────────
    for (let i = 0; i < LA_DOCUMENTS.length; i++) {
      const doc = LA_DOCUMENTS[i];
      console.log(`[STEP 12] Filling document slot ${i + 1}/${LA_DOCUMENTS.length}: ${doc.documentCategory}`);
      if (i > 0) {
        const addNewBtn = laPage.locator(
          '#manageDocuments button.write-collection-add-item__bottom',
        );
        await addNewBtn.scrollIntoViewIfNeeded();
        await addNewBtn.click();
        // Wait for the new slot's checkbox to appear before filling
        await laPage
          .locator(`#manageDocuments_${i}_documentRelatedToCaseCheckbox-RELATED_TO_CASE`)
          .waitFor({ state: "visible", timeout: 10_000 });
        console.log(`[STEP 12] Slot ${i + 1} appeared after Add new click`);
      }
      await ManageDocumentsNew1Page.fillDocumentSlot({
        page: laPage,
        index: i,
        documentParty: "Local authority",
        documentCategory: doc.documentCategory,
        confidentialDocument: doc.confidentialDocument,
        restrictDocument: doc.restrictDocument,
        filePath: doc.filePath,
      });
    }
    console.log(`[STEP 12] All document slots filled`);

    // ── STEP 13: Submit and confirm ──────────────────────────────────────────
    console.log(`[STEP 13] Clicking Continue on Manage documents form`);
    await ManageDocumentsNew1Page.clickContinue(laPage);

    console.log(`[STEP 13] Verifying submit page`);
    await ManageDocumentsNewSubmitPage.manageDocumentsNewSubmitPage({
      page: laPage,
      accessibilityTest,
      documentParty: "Local authority",
      documentCategory: LA_DOCUMENTS[0].documentCategory,
      restrictDocument: LA_DOCUMENTS[0].restrictDocument,
      confidentialDocument: LA_DOCUMENTS[0].confidentialDocument,
      // Verify each "Add a document N" panel with its own expected values
      documents: LA_DOCUMENTS,
    });

    console.log(`[STEP 13] Verifying confirm page`);
    await ManageDocumentsNewConfirmPage.manageDocumentsNewConfirmPage({
      page: laPage,
      accessibilityTest,
    });
    console.log(`[STEP 13] Manage documents journey complete`);

    if (accessibilityTest) {
      const { AxeUtils } = await import("@hmcts/playwright-common");
      await new AxeUtils(laPage).audit();
    }

    await laPage.close();
  }
}
