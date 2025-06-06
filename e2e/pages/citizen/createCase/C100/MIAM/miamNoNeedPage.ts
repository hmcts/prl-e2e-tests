import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { MiamNoNeedContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamNoNeedContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface NoNeedPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class MiamNoNeedPage {
  public static async noNeedPage({
    page: page,
    accessibilityTest: accessibilityTest,
  }: NoNeedPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({ page: page });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: NoNeedPageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${MiamNoNeedContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(page, 2, MiamNoNeedContent, `p`, Selectors.p),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page: page,
  }: Partial<NoNeedPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page cannot be null");
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
