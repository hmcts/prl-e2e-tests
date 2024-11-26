import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";

interface ReviewDocumentsParams {
  page: Page;
  accessibilityTest: boolean;
}

export class ReviewDocuments {
  public static async reviewDocuments({
    page,
    accessibilityTest,
  }: ReviewDocumentsParams): Promise<void> {
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      page,
      "Review Documents",
      "Add Case Number",
    );
  }
}
