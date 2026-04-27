import { Page } from "@playwright/test";
import { UploadPage } from "../../../../pages/citizen/caseView/uploadDocuments/uploadPage.ts";

interface uploadParams {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  uploadDocumentsPrivateSelector = "#uploadDocuments",
}

export class Upload {
  public static async upload({
    page,
    accessibilityTest,
  }: uploadParams): Promise<void> {
    await page.locator(UniqueSelectors.uploadDocumentsPrivateSelector).click();
    await UploadPage.uploadPage(page, accessibilityTest);
  }
}
