import { CommonPage } from "../commonPage";
import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import { DummyPaymentConfirmationContent } from "../../../fixtures/manageCases/caseWorker/dummyPaymentConfirmationContent";
import { Helpers } from "../../../common/helpers";

export class DummyPaymentConfirmationPage extends CommonPage {
  public static async dummyPaymentConfirmationPage(page: Page): Promise<void> {
    await this.checkPageLoads(page);
    await this.submit(page);
  }

  private static async checkPageLoads(page: Page): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${DummyPaymentConfirmationContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DummyPaymentConfirmationContent.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DummyPaymentConfirmationContent.makeThePayment}")`,
        1,
      ),
    ]);
  }

  private static async submit(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DummyPaymentConfirmationContent.makeThePayment}")`,
    );
  }
}
