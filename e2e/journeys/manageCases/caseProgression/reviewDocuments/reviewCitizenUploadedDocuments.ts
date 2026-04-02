import { Browser, Page } from "@playwright/test";
import { UploadDocumentsPositionStatement } from "../../../citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/applicant/uploadDocumentsPositionStatement.ts";
import {
  applicationSubmittedBy,
  documentCategory,
  yesNoDontKnow,
} from "../../../../common/types.ts";
import { ReviewDocuments } from "./reviewDocuments.ts";
import { Helpers } from "../../../../common/helpers.ts";
import Config from "../../../../utils/config.utils.ts";
import { CitizenC100CaseUtils } from "../../../../utils/citizenC100CaseUtils.ts";

interface reviewCitizenUploadedDocumentsParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  isApplicant: boolean;
  yesNoNotSureRestrictDocs: yesNoDontKnow;
  documentType: documentCategory;
  applicationSubmittedBy: applicationSubmittedBy;
  citizenC100CaseUtils: CitizenC100CaseUtils;
}

export class ReviewCitizenUploadedDocuments {
  public static async reviewCitizenUploadedDocuments({
    page,
    browser,
    caseRef,
    accessibilityTest,
    yesNoNotSureRestrictDocs,
    documentType,
    citizenC100CaseUtils,
  }: reviewCitizenUploadedDocumentsParams): Promise<void> {
    await UploadDocumentsPositionStatement.uploadDocumentsPositionStatement({
      page: page,
      accessibilityTest: accessibilityTest,
      yesNoNA: "Yes",
      citizenC100CaseUtils: citizenC100CaseUtils,
      caseRef: caseRef,
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
