import { Page } from "@playwright/test";
import { Selectors } from "../../common/selectors";
import { Helpers } from "../../common/helpers";
import AccessibilityTestHelper from "../../common/accessibilityTestHelper";
import { AlternativeRoutesContent } from "../../fixtures/c100ScreeningSections/alternativeRoutesContent";

interface AlternativeRoutesPageOptions {
  page: Page;
  accessibilityTest: boolean
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean
}

export class AlternativeRoutesPage {
  public static async alternativeRoutesPage({
    page,
    accessibilityTest
  }: AlternativeRoutesPageOptions) {
    await this.checkPageLoads({
      page,
      accessibilityTest
    });
    await this.fillInFields(page)
  }

  private static async checkPageLoads({
    page,
    accessibilityTest
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${AlternativeRoutesContent.pageTitle}")`
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        6,
        AlternativeRoutesContent,
        'body',
        `${Selectors.GovukBody}`
      ),
      Helpers.checkGroup(
        page,
        6,
        AlternativeRoutesContent,
        'link',
        `${Selectors.GovukLink}`
      ),
      Helpers.checkGroup(
        page,
        7,
        AlternativeRoutesContent,
        'list',
        `${Selectors.li}`
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${AlternativeRoutesContent.headingM}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingS}:text-is("${AlternativeRoutesContent.headingS}")`,
        1
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
    page: Page
  ): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${AlternativeRoutesContent.continue}")`
    );
  }
}