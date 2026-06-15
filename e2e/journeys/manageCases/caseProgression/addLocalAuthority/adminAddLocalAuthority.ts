import { Browser, Page, expect } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { ExuiCaseTaskComponent } from "../../../../pageObjects/components/exui/exuiCaseTask.component.ts";
import { ReviewDocuments1Page } from "../../../../pages/manageCases/caseProgression/reviewDocuments/reviewDocuments1Page.ts";
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
    await submitPage.assertPageContents(
      ["caseProgression", "addLocalAuthority"],
      "submit",
    );
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
    await this.verifyLocalAuthorityOrgCases(
      browser,
      organisationName,
      caseRef,
      localAuthorityUserEmail,
      accessibilityTest,
    );
    await this.openCaseAsCourtAdminAndViewTasks(
      browser,
      caseRef,
      accessibilityTest,
    );
  }

  private static async verifyLocalAuthorityOrgCases(
    browser: Browser,
    organisationName: string,
    caseRef: string,
    localAuthorityUserEmail: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    const laPage = await Helpers.openNewBrowserWindow(
      browser,
      "localAuthority",
    );
    const idamLoginHelper = new IdamLoginHelper();

    // ── STEP 1: Login to Manage Organisation ─────────────────────────────────
    await idamLoginHelper.signInLongLivedUser(
      laPage,
      "localAuthority",
      `${Config.manageOrgBaseURL}/organisation`,
      "localAuthorityManageOrg",
    );

    // ── STEP 2: Navigate to Manage Org cases list ─────────────────────────────
    await laPage.goto(`${Config.manageOrgBaseURL}/cases`);
    await laPage.waitForLoadState("domcontentloaded");

    await expect(
      laPage.locator("span.govuk-caption-xl", { hasText: organisationName }),
    ).toBeVisible();
    await expect(
      laPage.getByRole("heading", { name: "Cases", level: 1 }),
    ).toBeVisible();
    await expect(laPage.getByRole("link", { name: "Cases" })).toBeVisible();

    // ── STEP 3: Filter by case reference ─────────────────────────────────────
    await laPage.getByRole("button", { name: /show cases filter/i }).click();

    await laPage.locator("#findCaseByReferenceNumber").check();
    await laPage.locator("#case-reference-number").fill(caseRef);

    await laPage.getByRole("button", { name: /apply filter/i }).click();

    await laPage.waitForLoadState("domcontentloaded");

    await expect(
      laPage.locator("p.govuk-body", { hasText: "1 PRLAPPS" }),
    ).toBeVisible();
    await expect(laPage.locator("table.govuk-table")).toBeVisible();

    // ── STEP 4: Select the case and click Accept ──────────────────────────────
    await laPage.locator("#select-0").check();

    const acceptCasesButton = laPage.locator(
      "#btn-share-unassigned-case-button",
    );
    await expect(acceptCasesButton).toBeEnabled();
    await acceptCasesButton.click();

    // ── STEP 5: Add recipient ─────────────────────────────────────────────────
    await expect(
      laPage.getByRole("heading", { name: "Add recipient" }),
    ).toBeVisible();

    await expect(laPage.locator(`#case-title-${caseRef}`)).toBeVisible();

    const emailInput = laPage.locator("xuilib-user-select input");
    await emailInput.click();
    await emailInput.pressSequentially(localAuthorityUserEmail, { delay: 50 });

    const suggestion = laPage.locator("mat-option", {
      hasText: localAuthorityUserEmail,
    });
    await suggestion.waitFor({ state: "visible" });
    await suggestion.click();

    const addButton = laPage.locator("#btn-add-user");
    await expect(addButton).toBeEnabled();
    await addButton.click();

    if (accessibilityTest) {
      const { AxeUtils } = await import("@hmcts/playwright-common");
      await new AxeUtils(laPage).audit();
    }

    // ── STEP 6: Continue to Check and confirm ────────────────────────────────
    await laPage.locator("#btn-continue").click();

    await expect(
      laPage.getByRole("heading", { name: "Check and confirm your selection" }),
    ).toBeVisible();

    await expect(laPage.locator(`#user-access-block-${caseRef}`)).toBeVisible();

    await expect(
      laPage.locator("td.govuk-table__cell", {
        hasText: localAuthorityUserEmail,
      }),
    ).toBeVisible();
    await expect(
      laPage.locator("span.hmcts-badge", { hasText: "To be added" }),
    ).toBeVisible();

    if (accessibilityTest) {
      const { AxeUtils } = await import("@hmcts/playwright-common");
      await new AxeUtils(laPage).audit();
    }

    // ── STEP 7: Confirm case sharing ─────────────────────────────────────────
    await laPage.getByRole("button", { name: "Confirm" }).click();

    await expect(
      laPage.locator(".govuk-panel", {
        hasText: "Your selected cases have been updated",
      }),
    ).toBeVisible();

    await expect(
      laPage.getByRole("link", { name: "Go to Cases" }),
    ).toBeVisible();

    if (accessibilityTest) {
      const { AxeUtils } = await import("@hmcts/playwright-common");
      await new AxeUtils(laPage).audit();
    }

    // STEP 8: Navigate to Manage Cases
    // The LA user's IDAM session is already active from the Manage Org login above
    // (same browser context, same cookies). Navigating directly to the case list
    // works without a second sign-in.
    await laPage.goto(`${Config.manageCasesBaseURL}/cases`);
    // await laPage.waitForLoadState("networkidle");

    // ── STEP 9: Open the case from the case list ──────────────────────────────
    await expect(laPage.locator("ccd-search-result")).toBeVisible({
      timeout: 10_000,
    });

    const dashedRef = caseRef.match(/.{1,4}/g)?.join("-") ?? caseRef;
    await laPage
      .locator(`a[aria-label="go to case with Case reference:${dashedRef}"]`)
      .click();

    await laPage.waitForLoadState("domcontentloaded");
    await expect(laPage.locator("ccd-case-header")).toBeVisible();
    await expect(laPage.locator("ccd-case-header")).toContainText(dashedRef);

    // ── STEP 10: Navigate to Summary tab ─────────────────────────────────────
    await Helpers.clickTab(laPage, "Summary");

    // ── STEP 11: Launch Manage documents event ───────────────────────────────
    await Helpers.chooseEventFromDropdown(laPage, "Manage documents");

    // ── STEP 12: Upload 4 documents ──────────────────────────────────────────
    for (let i = 0; i < LA_DOCUMENTS.length; i++) {
      const doc = LA_DOCUMENTS[i];
      if (i > 0) {
        const addNewBtn = laPage.locator(
          "#manageDocuments button.write-collection-add-item__bottom",
        );
        await addNewBtn.scrollIntoViewIfNeeded();
        await addNewBtn.click();
        await laPage
          .locator(
            `#manageDocuments_${i}_documentRelatedToCaseCheckbox-RELATED_TO_CASE`,
          )
          .waitFor({ state: "visible", timeout: 10_000 });
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

    // ── STEP 13: Submit and confirm ──────────────────────────────────────────
    await ManageDocumentsNew1Page.clickContinue(laPage);

    await ManageDocumentsNewSubmitPage.manageDocumentsNewSubmitPage({
      page: laPage,
      accessibilityTest,
      documentParty: "Local authority",
      documentCategory: LA_DOCUMENTS[0].documentCategory,
      restrictDocument: LA_DOCUMENTS[0].restrictDocument,
      confidentialDocument: LA_DOCUMENTS[0].confidentialDocument,
      documents: LA_DOCUMENTS,
    });

    await ManageDocumentsNewConfirmPage.manageDocumentsNewConfirmPage({
      page: laPage,
      accessibilityTest,
    });

    if (accessibilityTest) {
      const { AxeUtils } = await import("@hmcts/playwright-common");
      await new AxeUtils(laPage).audit();
    }

    await laPage.close();
  }

  /**
   * Logs in to Manage Cases as a court admin user (pre-authenticated session
   * from global setup), opens the case by reference and navigates to the
   * Tasks tab.
   */
  private static async openCaseAsCourtAdminAndViewTasks(
    browser: Browser,
    caseRef: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    const adminPage = await Helpers.openNewBrowserWindow(browser, "caseWorker");
    await adminPage.goto(`${Config.manageCasesBaseURL}/work/my-work/list`);
    await adminPage.waitForLoadState("domcontentloaded");
    const searchBox = adminPage.locator("exui-case-reference-search-box");
    const refInput = adminPage.getByLabel("16-digit case reference:");
    await expect(refInput).toBeVisible({ timeout: 30_000 });

    // Key the case reference into the header search box and click Find
    await refInput.scrollIntoViewIfNeeded();
    await refInput.click();
    await refInput.clear();
    await refInput.pressSequentially(caseRef, { delay: 50 });
    await expect(refInput).toHaveValue(caseRef);
    await refInput.press("Enter");
    const findButton = searchBox.getByRole("button", { name: "Find" });
    if (await findButton.isEnabled().catch(() => false)) {
      await findButton.click().catch(() => {});
    }

    const dashedRef = Helpers.getHyphenatedCaseReference(caseRef);
    const caseHeader = adminPage.locator("ccd-case-header");
    await expect(caseHeader).toBeVisible({ timeout: 30_000 });
    await expect(caseHeader).toContainText(dashedRef);

    await Helpers.goToCase(
      adminPage,
      Config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    await expect(
      adminPage.locator(Selectors.h2, { hasText: "Active tasks" }),
    ).toBeVisible({ timeout: 30_000 });

    // ── STEP 15: Verify the document-review tasks ────────────────────────────
    await Helpers.waitForTask(adminPage, "Review CIR Extension Request");

    const caseTask = new ExuiCaseTaskComponent(adminPage);
    await caseTask.assertTaskSummary(
      "Review CIR Extension Request",
      "urgent",
      ["Assign to me"],
      "Unassigned",
    );
    await caseTask.assertTaskSummary(
      "Review CIR Transfer Request",
      "urgent",
      ["Assign to me"],
      "Unassigned",
    );
    await caseTask.assertTaskSummary(
      "Review Documents",
      "low",
      ["Assign to me"],
      "Unassigned",
    );

    // ── STEP 16: Assign the Review Documents task to self ────────────────────
    await Helpers.assignTaskToMe(adminPage, "Review Documents");

    // ── STEP 17: Launch the Review Documents event from Next steps ───────────
    await caseTask.triggerNextSteps("Review Documents", "Review Documents");

    // ── STEP 18: Verify reviewable documents and select one ──────────────────
    // The dynamic list must offer the 4 uploaded documents except the
    // Section 7 report, which is not reviewable.
    const baseName = (filePath: string): string =>
      filePath.split(/[\\/]/).pop() ?? filePath;
    const section7FileName = baseName(Config.testPdfFileSection7);
    const reviewableFileNames = LA_DOCUMENTS.map((doc) =>
      baseName(doc.filePath),
    ).filter((fileName) => fileName !== section7FileName);

    await ReviewDocuments1Page.reviewDocuments1Page({
      page: adminPage,
      accessibilityTest,
      expectedDocuments: reviewableFileNames,
      absentDocuments: [section7FileName],
    });

    await adminPage.close();
  }
}
