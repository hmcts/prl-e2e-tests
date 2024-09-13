import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import {
  WithoutNoticeOrderDetails4Content
} from "../../../../../fixtures/manageCases/createCase/FL401/withoutNoticeOrder/withoutNoticeOrderDetails4Content";
import { Helpers } from "../../../../../common/helpers";
import accessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import {
  WithoutNoticeOrderDetails3Content
} from "../../../../../fixtures/manageCases/createCase/FL401/withoutNoticeOrder/withoutNoticeOrderDetails3Content";

export enum anyOtherDetails {
  anyOtherDetailsID = 'anyOtherDtailsForWithoutNoticeOrder_otherDetails',
  anyOtherDetailsContent = 'Some Other Details'
}

export class WithoutNoticeOrder4Page{
  public static async withoutNoticeOrder4Page(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(
      page,
      accessibilityTest
    );
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${WithoutNoticeOrderDetails4Content.pageTitle}")`
    );
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${WithoutNoticeOrderDetails4Content.p1}")`,
          1
        ),
        Helpers.checkGroup(
          page,
          4,
          WithoutNoticeOrderDetails4Content,
          'formLabel',
          `${Selectors.GovukFormLabel}`
        ),
      ]
    );
    if (accessibilityTest) {
      await accessibilityTestHelper.run(page)
    }
  }

  private static async fillInFields(
    page: Page
  ): Promise<void> {
    await page.fill(
      anyOtherDetails.anyOtherDetailsID,
      anyOtherDetails.anyOtherDetailsContent
    )
    await page.click(
      `${Selectors.button}:text-is("${WithoutNoticeOrderDetails4Content.continue}")`
    );
  }
}