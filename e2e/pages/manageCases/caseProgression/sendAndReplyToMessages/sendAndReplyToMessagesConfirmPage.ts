import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { SendAndReplyToMessagesConfirmContent } from "../../../../fixtures/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessagesConfirmContent.ts";

export class SendAndReplyToMessagesConfirmPage {
  public static async sendAndReplyToMessagesConfirmPage(
    page: Page,
  ): Promise<void> {
    await this.checkPageLoads(page);
    await this.closeAndReturnToCaseDetails(page);
  }

  private static async checkPageLoads(page: Page): Promise<void> {
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
    // TODO Disabled pending ticket FPET:1211
    // if (accessibilityTest) {
    //   await new AxeUtils(page).audit();
    // }
  }

  private static async closeAndReturnToCaseDetails(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SendAndReplyToMessagesConfirmContent.CloseAndReturnToCaseDetailsButton}")`,
    );
  }
}
