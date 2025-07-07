import { Page } from "@playwright/test";
import { ConsentOrderUploadPage } from "../../../../../pages/citizen/createCase/C100/consentOrderUpload/consentOrderUploadPage.ts";
import { SuccessPage } from "../../../../../pages/citizen/createCase/C100/consentOrderUpload/successPage.ts";

interface C100ConsentOrderUploadOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

export class C100ConsentOrderUpload {
  public static async c100ConsentOrderUpload({
    page,
    accessibilityTest,
    errorMessaging,
  }: C100ConsentOrderUploadOptions): Promise<void> {
    await ConsentOrderUploadPage.consentOrderUploadPage({
      page,
      accessibilityTest,
      errorMessaging,
    });
    await SuccessPage.successPage({
      page,
      accessibilityTest,
    });
  }
}
