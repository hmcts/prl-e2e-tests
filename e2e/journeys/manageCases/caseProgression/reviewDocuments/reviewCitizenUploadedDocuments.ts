import { Browser, Page } from "@playwright/test";
import { UploadDocumentsPositionStatement } from "../../../citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/uploadDocumentsPositionStatement.ts";
import { yesNoDontKnow, documentCategory } from "../../../../common/types";
import { ReviewDocuments} from "./reviewDocuments.ts";
import { Helpers } from "../../../../common/helpers";
import Config from "../../../../config";

interface reviewCitizenUploadedDocumentsParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  isApplicant: boolean;
  yesNoNotSureRestrictDocs: yesNoDontKnow;
  documentType: documentCategory;
}

export class ReviewCitizenUploadedDocuments {
  public static async reviewCitizenUploadedDocuments({
    page,
    browser,
    caseRef,
    accessibilityTest,
    isApplicant,
    yesNoNotSureRestrictDocs,
    documentType,
  }: reviewCitizenUploadedDocumentsParams): Promise<void> {
    await UploadDocumentsPositionStatement.uploadDocumentsPositionStatement(
      {
        page: page,
        browser: browser,
        caseRef: caseRef,
        accessibilityTest: accessibilityTest,
        isApplicant: isApplicant,
        yesNoNA: "Yes",
      },
    );
    // open new browser and sign in as court admin user
    const courtAdminPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await Helpers.goToCase(
      courtAdminPage,
      Config.manageCasesBaseURL,
      caseRef,
      "tasks",
    );
    await ReviewDocuments.reviewDocuments({
      page: courtAdminPage,
      accessibilityTest: accessibilityTest,
      yesNoNotSureRestrictDocs: yesNoNotSureRestrictDocs,
      partyUploadedDocument: "Citizen",
      documentType: documentType,
    });
  }
}
