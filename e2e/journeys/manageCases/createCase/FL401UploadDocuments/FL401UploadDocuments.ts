import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "../solicitorCreateInitial.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { UploadDocuments1Page } from "../../../../pages/manageCases/createCase/FL401/uploadDocuments/uploadDocuments1Page.ts";
import { UploadDocumentsSubmitPage } from "../../../../pages/manageCases/createCase/FL401/uploadDocuments/uploadDocumentsSubmitPage.ts";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage.ts";

interface FL401UploadDocumentsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  subJourney: boolean;
}

export class FL401UploadDocuments {
  public static async fl401UploadDocuments({
    page,
    accessibilityTest,
    errorMessaging,
    subJourney,
  }: FL401UploadDocumentsOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: "solicitor",
        accessibilityTest: false,
        solicitorCaseType: "FL401",
        errorMessaging: false,
      });
    }
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
