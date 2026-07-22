import { Browser, expect } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { ExuiCaseTaskComponent } from "../../../../pageObjects/components/exui/exuiCaseTask.component.ts";
import { ReviewDocuments1Page } from "../../../../pages/manageCases/caseProgression/reviewDocuments/reviewDocuments1Page.ts";
import { ManageDocumentsNew1Page } from "../../../../pages/manageCases/caseProgression/manageDocuments/manageDocumentsNew1Page.ts";
import { ManageDocumentsNewSubmitPage } from "../../../../pages/manageCases/caseProgression/manageDocuments/manageDocumentsNewSubmit.ts";
import { ManageDocumentsNewConfirmPage } from "../../../../pages/manageCases/caseProgression/manageDocuments/manageDocumentsNewConfirmPage.ts";
import Config from "../../../../utils/config.utils.ts";

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
  { documentCategory: "Child Impact Report 1", confidentialDocument: true, restrictDocument: false, filePath: Config.testPdfFileCR1 },
  { documentCategory: "Child Impact Report 2", confidentialDocument: false, restrictDocument: true, filePath: Config.testPdfFileCR2 },
  { documentCategory: "CIR extension request", confidentialDocument: false, restrictDocument: false, filePath: Config.testPdfFileExtention },
  { documentCategory: "CIR transfer request", confidentialDocument: false, restrictDocument: false, filePath: Config.testPdfFileRequest },
  { documentCategory: "Section 7 report", confidentialDocument: false, restrictDocument: false, filePath: Config.testPdfFileSection7 },
];

interface ManageDocumentsParams {
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
}

/**
 * Continuation of the "Add local authority" journey (see adminAddLocalAuthority.ts).
 * Requires that AdminAddLocalAuthority.adminAddLocalAuthority already ran in
 * this test run: the case must be shared with the LA user (API call) and the
 * LA user must have a cached Manage Cases session at
 * `${sessionStoragePath}localAuthorityManageCases.json`.
 */
export class LocalAuthorityManageDocuments {
  public static async manageDocuments({
    browser,
    caseRef,
    accessibilityTest,
  }: ManageDocumentsParams): Promise<void> {
    await this.uploadDocumentsAsLocalAuthority(browser, caseRef, accessibilityTest);
    await this.openCaseAsCourtAdminAndViewTasks(browser, caseRef, accessibilityTest);
  }

  private static async uploadDocumentsAsLocalAuthority(
    browser: Browser,
    caseRef: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    const newBrowser = await browser.browserType().launch();
    const laContext = await newBrowser.newContext({
      storageState: Config.sessionStoragePath + "localAuthorityManageCases.json",
    });
    const laPage = await laContext.newPage();

    await Helpers.goToCase(laPage, Config.manageCasesBaseURLCase, caseRef, "Summary");
    await expect(laPage.locator("ccd-case-header")).toBeVisible();

    await Helpers.chooseEventFromDropdown(laPage, "Manage documents");

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

    await Helpers.goToCase(adminPage, Config.manageCasesBaseURLCase, caseRef, "tasks");

    await expect(
      adminPage.locator(Selectors.h2, { hasText: "Active tasks" }),
    ).toBeVisible({ timeout: 30_000 });

    await Helpers.waitForTask(adminPage, "Review CIR Extension Request");
    const caseTask = new ExuiCaseTaskComponent(adminPage);
    await caseTask.assertTaskSummary("Review CIR Extension Request", "urgent", ["Assign to me"], "Unassigned");
    await caseTask.assertTaskSummary("Review CIR Transfer Request", "urgent", ["Assign to me"], "Unassigned");
    await caseTask.assertTaskSummary("Review Documents", "low", ["Assign to me"], "Unassigned");

    await Helpers.assignTaskToMe(adminPage, "Review Documents");
    await caseTask.triggerNextSteps("Review Documents", "Review Documents");

    const baseName = (filePath: string): string => filePath.split(/[\\/]/).pop() ?? filePath;
    const section7FileName = baseName(Config.testPdfFileSection7);
    const reviewableFileNames = LA_DOCUMENTS.map((doc) => baseName(doc.filePath))
      .filter((fileName) => fileName !== section7FileName);

    await ReviewDocuments1Page.reviewDocuments1Page({
      page: adminPage,
      accessibilityTest,
      expectedDocuments: reviewableFileNames,
      absentDocuments: [section7FileName],
    });

    await adminPage.close();
  }
}