import { CommonPage } from "../commonPage";
import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import { Helpers } from "../../../common/helpers";
import { DummyPaymentAwp1Content } from "../../../fixtures/manageCases/caseWorker/dummyPaymentAwp1Content";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper";

enum UniqueSelectors {
  paymentServiceRefInput = "#tsPaymentServiceRequestReferenceNumber",
  paymentStatusInput = "#tsPaymentStatus",
}

export class DummyPaymentAwp1Page extends CommonPage {
  public static async dummyPaymentAwp1Page(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    paymentStatusPaid: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page, paymentStatusPaid);
    await this.submit(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${DummyPaymentAwp1Content.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        DummyPaymentAwp1Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        DummyPaymentAwp1Content,
        `formHint`,
        `${Selectors.GovukFormHint}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DummyPaymentAwp1Content.submit}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DummyPaymentAwp1Content.prev}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DummyPaymentAwp1Content.submit}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${DummyPaymentAwp1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${DummyPaymentAwp1Content.errorMessagePaymentService}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${DummyPaymentAwp1Content.errorMessagePaymentStatus}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${DummyPaymentAwp1Content.errorMessagePaymentService}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${DummyPaymentAwp1Content.errorMessagePaymentStatus}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    paymentStatusPaid: boolean,
  ): Promise<void> {
    await page.fill(
      `${UniqueSelectors.paymentServiceRefInput}`,
      `${DummyPaymentAwp1Content.paymentServiceRef}`,
    );
    if (paymentStatusPaid) {
      await page.fill(
        `${UniqueSelectors.paymentStatusInput}`,
        `${DummyPaymentAwp1Content.paymentStatusPaid}`,
      );
    } else {
      await page.fill(
        `${UniqueSelectors.paymentStatusInput}`,
        `${DummyPaymentAwp1Content.paymentStatusFail}`,
      );
    }
  }

  private static async submit(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DummyPaymentAwp1Content.submit}")`,
    );
  }
}
