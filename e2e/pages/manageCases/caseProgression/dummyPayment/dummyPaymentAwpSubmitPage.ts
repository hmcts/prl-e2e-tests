import { CommonPage } from "../../commonPage.ts";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { DummyPaymentAwpSubmitContent } from "../../../../fixtures/manageCases/caseProgression/dummyPayment/dummyPaymentAwpSubmitContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";

export class DummyPaymentAwpSubmitPage extends CommonPage {
  public static async dummyPaymentAwpSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    paymentStatusPaid: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.checkFilledFields(page, paymentStatusPaid);
    await this.submit(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${DummyPaymentAwpSubmitContent.pageTitle}")`,
    );
    await page.waitForSelector(
      `${Selectors.headingH2}:text-is("${DummyPaymentAwpSubmitContent.h2}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        4,
        DummyPaymentAwpSubmitContent,
        `text16`,
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DummyPaymentAwpSubmitContent.submit}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DummyPaymentAwpSubmitContent.prev}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkFilledFields(
    page: Page,
    paymentStatusPaid: boolean,
  ): Promise<void> {
    if (paymentStatusPaid) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${DummyPaymentAwpSubmitContent.text16paymentStatusPaid}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${DummyPaymentAwpSubmitContent.text16paymentStatusFail}")`,
        1,
      );
    }
  }

  private static async submit(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DummyPaymentAwpSubmitContent.submit}")`,
    );
  }
}
