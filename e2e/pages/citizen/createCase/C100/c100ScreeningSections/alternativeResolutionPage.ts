import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../../common/selectors.ts";
import { AlternativeResolutionContent } from "../../../../../fixtures/citizen/createCase/C100/c100ScreeningSections/alternativeResolutionContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";

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
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
