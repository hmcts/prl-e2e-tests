import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { WithoutNoticeOrderDetails2Content } from "../../../../../fixtures/manageCases/createCase/FL401/withoutNoticeOrder/withoutNoticeOrderDetails2Content";
import { Helpers } from "../../../../../common/helpers";
import accessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

enum withoutNoticeOrder4IDs {
  harmToChild = "#reasonForOrderWithoutGivingNotice_reasonForOrderWithoutGivingNotice-harmToApplicantOrChild",
  deferringApplication = "#reasonForOrderWithoutGivingNotice_reasonForOrderWithoutGivingNotice-deferringApplicationIfNotImmediate",
  isPrejudiced = "#reasonForOrderWithoutGivingNotice_reasonForOrderWithoutGivingNotice-prejudiced",
  anyOtherReasoning = "#reasonForOrderWithoutGivingNotice_futherDetails",
}

export class WithoutOrderNotice2Page {
  public static async withoutOrderNotice2Page(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukFormLabel}:text-is("${WithoutNoticeOrderDetails2Content.pageLoadText}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${WithoutNoticeOrderDetails2Content.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${WithoutNoticeOrderDetails2Content.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        WithoutNoticeOrderDetails2Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await accessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${WithoutNoticeOrderDetails2Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${WithoutNoticeOrderDetails2Content.errorSummary}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${WithoutNoticeOrderDetails2Content.validationError}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${WithoutNoticeOrderDetails2Content.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    for (let [key, selector] of Object.entries(withoutNoticeOrder4IDs)) {
      if (key === "anyOtherReasoning") {
        await page.fill(
          withoutNoticeOrder4IDs.anyOtherReasoning,
          WithoutNoticeOrderDetails2Content.additionalReasoning,
        );
      } else {
        await page.check(selector);
      }
    }
    await page.click(
      `${Selectors.button}:text-is("${WithoutNoticeOrderDetails2Content.continue}")`,
    );
  }
}
