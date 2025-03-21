import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { UploadDocuments1Page } from "../../../../pages/manageCases/createCase/FL401/uploadDocuments/uploadDocuments1Page";
import { UploadDocumentsSubmitPage } from "../../../../pages/manageCases/createCase/FL401/uploadDocuments/uploadDocumentsSubmitPage";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";

interface FL401UploadDocumentsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

export class FL401UploadDocuments {
  public static async fl401UploadDocuments({
    page,
    accessibilityTest,
    errorMessaging,
  }: FL401UploadDocumentsOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "Upload documents");
    await UploadDocuments1Page.uploadDocuments1Page({
      page,
      accessibilityTest,
      errorMessaging,
    });
    await UploadDocumentsSubmitPage.uploadDocumentsSubmitPage({
      page,
      accessibilityTest,
    });
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
