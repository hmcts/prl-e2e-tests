import { Page } from "@playwright/test";
import { JudgeOrderAction } from "../../../../common/types.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { EditAndApproveAnOrderConfirmContent } from "../../../../fixtures/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrderConfirmContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

export class EditAndApproveAnOrderConfirmPage {
  public static async editAndApproveOrderConfirmPage(
    page: Page,
    judgeOrderAction: JudgeOrderAction,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, judgeOrderAction, accessibilityTest);
    await this.closeAndReturnToCaseDetails(page);
  }

  private static async checkPageLoads(
    page: Page,
    judgeOrderAction: JudgeOrderAction,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(`${Selectors.h3}`, {
        hasText: `${EditAndApproveAnOrderConfirmContent.h3}`,
      })
      .waitFor();
    if (judgeOrderAction === "Ask the legal representative to make changes") {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h1}:text-is("${EditAndApproveAnOrderConfirmContent.h1MessageSentToLegalRepresentative}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${EditAndApproveAnOrderConfirmContent.pMessageSentToLegalRepresentative}")`,
          1,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h1}:text-is("${EditAndApproveAnOrderConfirmContent.h1OrderApproved}")`,
          1,
        ),
        Helpers.checkGroup(
          page,
          2,
          EditAndApproveAnOrderConfirmContent,
          `pOrderApproved`,
          `${Selectors.p}`,
        ),
      ]);
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async closeAndReturnToCaseDetails(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${EditAndApproveAnOrderConfirmContent.buttonCloseAndReturnToCaseDetails}")`,
    );
  }
}
