import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { AlternativeRoutesContent } from "../../../../../fixtures/citizen/createCase/C100/c100ScreeningSections/alternativeRoutesContent.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";

interface AlternativeRoutesPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class AlternativeRoutesPage {
  public static async alternativeRoutesPage({
    page,
    accessibilityTest,
  }: AlternativeRoutesPageOptions) {
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
      `${Selectors.GovukHeadingL}:text-is("${AlternativeRoutesContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        6,
        AlternativeRoutesContent,
        "body",
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkGroup(
        page,
        6,
        AlternativeRoutesContent,
        "link",
        `${Selectors.GovukLink}`,
      ),
      Helpers.checkGroup(
        page,
        7,
        AlternativeRoutesContent,
        "list",
        `${Selectors.li}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${AlternativeRoutesContent.headingM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingS}:text-is("${AlternativeRoutesContent.headingS}")`,
        1,
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
