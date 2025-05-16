import { Browser, Page } from "@playwright/test";
import { UploadDocumentsPositionStatement } from "../../../citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/applicant/uploadDocumentsPositionStatement.ts";
import {
  applicationSubmittedBy,
  documentCategory,
  yesNoDontKnow,
} from "../../../../common/types";
import { ReviewDocuments } from "./reviewDocuments.ts";
import { Helpers } from "../../../../common/helpers";
import Config from "../../../../utils/config.ts";

interface reviewCitizenUploadedDocumentsParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  isApplicant: boolean;
  yesNoNotSureRestrictDocs: yesNoDontKnow;
  documentType: documentCategory;
  applicationSubmittedBy: applicationSubmittedBy;
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
    applicationSubmittedBy,
  }: reviewCitizenUploadedDocumentsParams): Promise<void> {
    await UploadDocumentsPositionStatement.uploadDocumentsPositionStatement({
      page: page,
      browser: browser,
      caseRef: caseRef,
      accessibilityTest: accessibilityTest,
      isApplicant: isApplicant,
      yesNoNA: "Yes",
      applicationSubmittedBy: applicationSubmittedBy,
    });
    // open new browser and sign in as court admin user
    const courtAdminPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await Helpers.goToCase(
      courtAdminPage,
      Config.manageCasesBaseURLCase,
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
