import { Page } from "@playwright/test";
import { ManageDocumentsNew1Page } from "../../../../pages/manageCases/caseProgression/manageDocuments/manageDocumentsNew1Page.ts";
import { ManageDocumentsNewSubmitPage } from "../../../../pages/manageCases/caseProgression/manageDocuments/manageDocumentsNewSubmit.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { ManageDocumentsNewConfirmPage } from "../../../../pages/manageCases/caseProgression/manageDocuments/manageDocumentsNewConfirmPage.ts";
import { FL401ConfidentialDetailsTabPage } from "../../../../pages/manageCases/caseTabs/FL401/fl401ConfidentialDetailsTabPage.ts";

interface ManageDocumentsParams {
  page: Page;
  accessibilityTest: boolean;
  documentParty: string;
  documentCategory: string;
  restrictDocument: boolean;
  confidentialDocument: boolean;
}

export class ManageDocuments {
  public static async manageDocuments({
    page,
    accessibilityTest,
    documentParty,
    documentCategory,
    restrictDocument,
    confidentialDocument,
  }: ManageDocumentsParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Manage documents");
    await ManageDocumentsNew1Page.manageDocumentsNew1Page({
      page,
      accessibilityTest,
      documentParty,
      documentCategory,
      restrictDocument,
      confidentialDocument,
    });
    await ManageDocumentsNewSubmitPage.manageDocumentsNewSubmitPage({
      page,
      accessibilityTest,
      documentParty,
      documentCategory,
      restrictDocument,
      confidentialDocument,
    });
    await ManageDocumentsNewConfirmPage.manageDocumentsNewConfirmPage({
      page,
      accessibilityTest,
    });
    if (restrictDocument || confidentialDocument) {
      await Helpers.clickTab(page, "Confidential details");
      await FL401ConfidentialDetailsTabPage.fl401ConfidentialDetailsTabPageManageDocuments(
        page,
        documentParty,
        documentCategory,
        restrictDocument,
        confidentialDocument,
      );
    }
  }
}
