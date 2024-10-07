import { CommonPage } from "../commonPage";
import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import { Helpers } from "../../../common/helpers";
import { CommonContent } from "../../../fixtures/manageCases/commonContent";
import { DummyPaymentAwpContent } from "../../../fixtures/manageCases/caseWorker/dummyPaymentContent1";

export class DummyPaymentAwpPage extends CommonPage {
  public static async DummyPaymentAwpPage({
    page: page,
    accessibilityTest: accessibilityTest,
  }): Promise<void> {
    await this.checkCommonContent({ page });
    await this.checkPageLoads({ page, accessibilityTest });
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${DummyPaymentAwpContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        DummyPaymentAwpContent,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),

      Helpers.checkGroup(
        page,
        2,
        DummyPaymentAwpContent,
        `formHint`,
        `${Selectors.GovukFormHint}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
