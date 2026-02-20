import { Page } from "@playwright/test";
import { ManageDocumentsNew1Page } from "../../../../pages/manageCases/caseProgression/manageDocuments/manageDocumentsNew1Page";
import { ManageDocumentsNewSubmitPage } from "../../../../pages/manageCases/caseProgression/manageDocuments/manageDocumentsNewSubmit";
import { Helpers } from "../../../../common/helpers";
import { ManageDocumentsNewConfirmPage } from "../../../../pages/manageCases/caseProgression/manageDocuments/manageDocumentsNewConfirmPage";
import { FL401ConfidentialDetailsTabPage } from "../../../../pages/manageCases/caseTabs/FL401/fl401ConfidentialDetailsTabPage";
import { solicitorCaseCreateType } from "../../../../common/types.js";
import { C100ConfidentialDetailsTabPage } from "../../../../pages/manageCases/caseTabs/C100/c100ConfidentialDetailsTabPage.js";
import { C100CaseDocumentsTabPage } from "../../../../pages/manageCases/caseTabs/C100/c100CaseDocumentsTabPage.js";
import { Fl401CaseDocumentsTabPage } from "../../../../pages/manageCases/caseTabs/FL401/fl401CaseDocumentsTabPage.js";

interface ManageDocumentsParams {
  page: Page;
  accessibilityTest: boolean;
  caseType: solicitorCaseCreateType;
  documentParty: string;
  documentCategory: string;
  restrictDocument: boolean;
  confidentialDocument: boolean;
}

export class ManageDocuments {
  public static async manageDocuments({
    page,
    accessibilityTest,
    caseType,
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
      if (caseType === "C100") {
        await C100ConfidentialDetailsTabPage.c100ConfidentialDetailsTabPageManageDocuments(
          page,
          documentParty,
          documentCategory,
          restrictDocument,
          confidentialDocument,
        );
      } else {
        await FL401ConfidentialDetailsTabPage.fl401ConfidentialDetailsTabPageManageDocuments(
          page,
          documentParty,
          documentCategory,
          restrictDocument,
          confidentialDocument,
        );
      }
    } else {
      await Helpers.clickTab(page, "Case documents");
      if (caseType === "C100") {
        await C100CaseDocumentsTabPage.c100CaseDocumentsTabPageManageDocuments(
          page,
          documentParty,
          documentCategory,
        );
      } else {
        await Fl401CaseDocumentsTabPage.fl401CaseDocumentsTabPageManageDocuments(
          page,
          documentParty,
          documentCategory,
        );
      }
    }
  }
}
