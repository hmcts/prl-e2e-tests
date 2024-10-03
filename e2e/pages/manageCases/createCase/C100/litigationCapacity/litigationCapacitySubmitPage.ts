import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { LitigationCapacitySubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/litigationCapacity/litigationCapacitySubmitContent";
import { Helpers } from "../../../../../common/helpers";

interface LitigationCapacityOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoLitigationCapacity: boolean;
}

interface checkFieldsOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoLitigationCapacity: boolean;
}

interface checkFilledDataOptions {
  page: Page;
  yesNoLitigationCapacity: boolean;
}

export class LitigationCapacitySubmitPage {
  public static async litigationCapacitySubmitPage({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoLitigationCapacity: yesNoLitigationCapacity,
  }: LitigationCapacityOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
      yesNoLitigationCapacity: yesNoLitigationCapacity,
    });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoLitigationCapacity: yesNoLitigationCapacity,
  }: LitigationCapacityOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${LitigationCapacitySubmitContent.h2}")`,
    );
    await Promise.all([
      this.checkPageFields({
        page: page,
        accessibilityTest: accessibilityTest,
        yesNoLitigationCapacity: yesNoLitigationCapacity,
      }),
      this.checkPageData({
        page: page,
        yesNoLitigationCapacity: yesNoLitigationCapacity,
      }),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkPageFields({
    page: page,
    yesNoLitigationCapacity: yesNoLitigationCapacity,
  }: checkFieldsOptions): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${LitigationCapacitySubmitContent.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        LitigationCapacitySubmitContent,
        "text16",
        `${Selectors.GovukText16}`,
      ),
    ]);
    if (yesNoLitigationCapacity) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${LitigationCapacitySubmitContent.additionalText16}")`,
        1,
      );
    }
  }

  private static async checkPageData({
    page: page,
    yesNoLitigationCapacity: yesNoLitigationCapacity,
  }: checkFilledDataOptions): Promise<void> {
    if (yesNoLitigationCapacity) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${LitigationCapacitySubmitContent.text16Yes}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${LitigationCapacitySubmitContent.loremIpsum}")`,
          3,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${LitigationCapacitySubmitContent.text16Change}")`,
          4,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${LitigationCapacitySubmitContent.text16No}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${LitigationCapacitySubmitContent.loremIpsum}")`,
          2,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${LitigationCapacitySubmitContent.text16Change}")`,
          3,
        ),
      ]);
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${LitigationCapacitySubmitContent.continue}")`,
    );
  }
}
