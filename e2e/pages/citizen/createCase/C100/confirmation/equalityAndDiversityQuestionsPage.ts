import { Page } from "@playwright/test";
import { CommonReviewContent } from "../../../../../fixtures/citizen/createCase/C100/reviewPages/commonReviewContent.js";

interface EqualityAndDiversityPageOptions {
  page: Page;
  c100YesNoNeedHelpWithFees: boolean;
}

export class EqualityAndDiversityPage {
  public static async equalityAndDiversityPage({
    page,
    c100YesNoNeedHelpWithFees,
  }: EqualityAndDiversityPageOptions): Promise<void> {
    // this service seems to be flaky
    const serviceProblemVisible = await page
      .getByRole("heading", {
        name: "Sorry, there is a problem with the service",
      })
      .isVisible();

    if (serviceProblemVisible) {
      // if there is a problem with the service click back and try to resubmit
      await page.getByRole("link", { name: "Back", exact: true }).click();
      const submitButtonName: string = c100YesNoNeedHelpWithFees
        ? CommonReviewContent.submitButton
        : CommonReviewContent.submitButtonPay;
      await page.getByRole("button", { name: submitButtonName }).click();
    } else {
      await page
        .getByRole("button", { name: "I don't want to answer these questions" })
        .click();
    }
  }
}
