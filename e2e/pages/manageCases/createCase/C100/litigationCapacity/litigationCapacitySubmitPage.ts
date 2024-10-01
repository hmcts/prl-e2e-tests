import { Page } from "@playwright/test";
import { C100ChildrenAndApplicantsRelationship } from "../childrenAndApplicants/childrenAndApplicants1Page";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { LitigationCapacitySubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/litigationCapacity/litigationCapacitySubmitContent";

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
    await Promise.all([]);
  }

  private static async checkPageData({
    page: page,
    yesNoLitigationCapacity: yesNoLitigationCapacity,
  }: checkFilledDataOptions): Promise<void> {}

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${LitigationCapacitySubmitContent.continue}")`,
    );
  }
}
