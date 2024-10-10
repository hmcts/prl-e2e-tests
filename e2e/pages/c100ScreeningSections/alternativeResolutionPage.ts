import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../common/accessibilityTestHelper";
import { Selectors } from "../../common/selectors";
import { AlternativeResolutionContent } from "../../fixtures/c100ScreeningSections/alternativeResolutionContent";
import { Helpers } from "../../common/helpers";

interface AlternativeResolutionPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class AlternativeResolutionPage {
  public static async alternativeResolutionPage({
    page,
    accessibilityTest,
  }: AlternativeResolutionPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${AlternativeResolutionContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        AlternativeResolutionContent,
        "headingM",
        `${Selectors.GovukHeadingM}`,
      ),
      Helpers.checkGroup(
        page,
        8,
        AlternativeResolutionContent,
        "body",
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkGroup(
        page,
        5,
        AlternativeResolutionContent,
        "link",
        `${Selectors.GovukLink}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        AlternativeResolutionContent,
        "list",
        `${Selectors.li}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${AlternativeResolutionContent.continue}")`,
    );
  }
}
