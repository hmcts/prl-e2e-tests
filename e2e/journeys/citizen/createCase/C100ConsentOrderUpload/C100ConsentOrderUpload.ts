import { Page } from "@playwright/test";
import { UserRole } from "../../../../common/types";
import { ConsentOrderUploadPage } from "../../../../pages/citizen/createCase/C100/consentOrderUpload/consentOrderUploadPage";
import { SuccessPage } from "../../../../pages/citizen/createCase/C100/consentOrderUpload/successPage";

interface C100ConsentOrderUploadOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  subJourney: boolean;
}

export class C100ConsentOrderUpload {
  public static async c100ConsentOrderUpload({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    subJourney,
  }: C100ConsentOrderUploadOptions): Promise<void> {
    if (subJourney) {
    }
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
