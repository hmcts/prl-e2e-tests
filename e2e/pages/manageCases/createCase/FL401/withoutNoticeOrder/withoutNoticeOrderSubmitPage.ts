import { Page } from "@playwright/test";
import accessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { WithoutNoticeOrderSubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/withoutNoticeOrder/withoutNoticeOrderSubmitContent";

import { bailConditionRadios } from "./withoutNoticeOrder3Page";

export class WithoutNoticeOrderSubmitPage {
  public static async withoutNoticeOrderSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    isWithoutNoticeDetailsYes: boolean,
    isWithoutNoticeDetailsBailConditions: bailConditionRadios,
  ): Promise<void> {
    await this.checkPageLoads(
      page,
      accessibilityTest,
      isWithoutNoticeDetailsYes,
      isWithoutNoticeDetailsBailConditions,
    );
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    isWithoutNotice: boolean,
    bailConditions: bailConditionRadios,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${WithoutNoticeOrderSubmitContent.pageHeading}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${WithoutNoticeOrderSubmitContent.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${WithoutNoticeOrderSubmitContent.checkInfo}")`,
        1,
      ),
    ]);
    if (isWithoutNotice) {
      await this.checkPageLoadsYes(page, bailConditions);
    } else {
      await this.checkPageLoadsNo(page);
    }
    if (accessibilityTest) {
      await accessibilityTestHelper.run(page);
    }
  }
  private static async checkPageLoadsYes(
    page: Page,
    bailConditions: bailConditionRadios,
  ): Promise<void> {
    const yesCount: number = bailConditions === "Yes" ? 2 : 1;
    await Promise.all([
      Helpers.checkGroup(
        page,
        8,
        WithoutNoticeOrderSubmitContent,
        "text16Yes",
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        WithoutNoticeOrderSubmitContent,
        "span",
        `${Selectors.Span}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${WithoutNoticeOrderSubmitContent.textChange}")`,
        4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${WithoutNoticeOrderSubmitContent.yesText}")`,
        yesCount,
      ),
    ]);
    if (bailConditions === "Yes") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${WithoutNoticeOrderSubmitContent.bailEndDate}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${bailConditions}")`,
        1,
      );
    }
  }

  private static async checkPageLoadsNo(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        WithoutNoticeOrderSubmitContent,
        "text16No",
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${WithoutNoticeOrderSubmitContent.textChange}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${WithoutNoticeOrderSubmitContent.continue}")`,
    );
  }
}
