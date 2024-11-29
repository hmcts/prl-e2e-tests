import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { SendAndReplyToMessagesConfirmContent } from "../../../../fixtures/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessagesConfirmContent";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";

export class SendAndReplyToMessagesConfirmPage {
  public static async sendAndReplyToMessagesConfirmPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.closeAndReturnToCaseDetails(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.h3, {
        hasText: SendAndReplyToMessagesConfirmContent.h3,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h1}:text-is("${SendAndReplyToMessagesConfirmContent.h1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${SendAndReplyToMessagesConfirmContent.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${SendAndReplyToMessagesConfirmContent.CloseAndReturnToCaseDetailsButton}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async closeAndReturnToCaseDetails(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SendAndReplyToMessagesConfirmContent.CloseAndReturnToCaseDetailsButton}")`,
    );
  }
}
