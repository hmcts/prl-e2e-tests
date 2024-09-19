import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { WithoutNoticeOrderDetails4Content } from "../../../../../fixtures/manageCases/createCase/FL401/withoutNoticeOrder/withoutNoticeOrderDetails4Content";
import { Helpers } from "../../../../../common/helpers";
import accessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

export enum anyOtherDetails {
  anyOtherDetailsID = "#anyOtherDtailsForWithoutNoticeOrder_otherDetails",
}

export class WithoutNoticeOrder4Page {
  public static async withoutNoticeOrder4Page(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukFormLabel}:text-is("${WithoutNoticeOrderDetails4Content.pageLoadText}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${WithoutNoticeOrderDetails4Content.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${WithoutNoticeOrderDetails4Content.pageTitle}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await accessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.fill(
      anyOtherDetails.anyOtherDetailsID,
      WithoutNoticeOrderDetails4Content.anyOtherDetailsContent,
    );
    await page.click(
      `${Selectors.button}:text-is("${WithoutNoticeOrderDetails4Content.continue}")`,
    );
  }
}
