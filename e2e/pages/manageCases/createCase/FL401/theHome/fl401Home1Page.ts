import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { Fl401Home1Content } from "../../../../../fixtures/manageCases/createCase/FL401/theHome/fl401Home1Content";
import { Helpers } from "../../../../../common/helpers";

interface FL401HomePageOptions {
  page: Page,
  accessibilityTest: boolean,
  errorMessaging: boolean,
  fl401HomeYesNo: boolean
}

interface CheckPageLoadsOptions {
  page: Page,
  accessibilityTest: boolean,
  fl401HomeYesNo: boolean
}

export class Fl401Home1Page {
  public static async fl401Home1Page({
     page,
     accessibilityTest,
     errorMessaging,
     fl401HomeYesNo
   }: FL401HomePageOptions): Promise<void> {
    page
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    fl401HomeYesNo
  }: CheckPageLoadsOptions): Promise<void> {
    await this.checkTopLevelPageLoads(page)

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkTopLevelPageLoads(
    page: Page
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${Fl401Home1Content.pageTitle}")`
    );
    await Promise.all(
      [
        Helpers.checkGroup(
          page,
          2,
          Fl401Home1Content,
          'p',
          `${Selectors.p}`
        ),
        Helpers.checkGroup(
          page,
          26,
          Fl401Home1Content,
          'topFormLabel',
          `${Selectors.GovukFormLabel}`
        ),
        Helpers.checkGroup(
          page,
          5,
          Fl401Home1Content,
          'labelYes',
          `${Selectors.GovukFormLabel}`
        ),
        Helpers.checkGroup(
          page,
          6,
          Fl401Home1Content,
          'labelNo',
          `${Selectors.GovukFormLabel}`
        ),
      ]
    )
  }
}