import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { FL401ReviewDocuments1Page } from "../../../../pages/manageCases/caseProgression/reviewDocuments/fl401ReviewDocuments1Page";
import { FL401ReviewDocuments2Page } from "../../../../pages/manageCases/caseProgression/reviewDocuments/fl401ReviewDocuments2Page";
import { FL401ReviewDocumentsSubmitPage } from "../../../../pages/manageCases/caseProgression/reviewDocuments/fl401ReviewDocumentsSubmitPage";
import {
  yesNoDontKnow,
  documentSubmittedBy,
  documentCategory,
} from "../../../../common/types";

interface ReviewDocumentsParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoNotSureRestrictDocs: yesNoDontKnow;
  partyUploadedDocument: documentSubmittedBy;
  documentType: documentCategory;
}

export class ReviewDocuments {
  public static async reviewDocuments({
    page,
    accessibilityTest,
    yesNoNotSureRestrictDocs,
    partyUploadedDocument,
    documentType,
  }: ReviewDocumentsParams): Promise<void> {
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      page,
      "Review Documents",
      "Review Documents",
    );
    await FL401ReviewDocuments1Page.fl401ReviewDocuments1Page({
      page,
      accessibilityTest,
    });
    await FL401ReviewDocuments2Page.fl401ReviewDocuments2Page({
      page,
      accessibilityTest,
      yesNoNotSureRestrictDocs: yesNoNotSureRestrictDocs,
      documentSubmittedBy: partyUploadedDocument,
      documentCategory: documentType,
    });
    await FL401ReviewDocumentsSubmitPage.fl401ReviewDocumentsSubmitPage({
      page,
      accessibilityTest,
      yesNoNotSureRestrictDocs: yesNoNotSureRestrictDocs,
      documentSubmittedBy: partyUploadedDocument,
    });
  }
}
