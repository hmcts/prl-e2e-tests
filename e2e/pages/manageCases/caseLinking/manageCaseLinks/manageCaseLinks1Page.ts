import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { ManageCaseLinks1Content } from "../../../../fixtures/manageCases/caseLinking/manageCaseLinks/manageCaseLinks1Content.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface ManageCaseLinks1PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class ManageCaseLinks1Page {
  public static async manageCaseLinks1Page({
    page,
    accessibilityTest,
  }: ManageCaseLinks1PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ManageCaseLinks1PageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageCaseLinks1Content.pageTitle}")`,
    );
    await pageTitle.waitFor({ state: "visible" });
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.p}:text-is("${ManageCaseLinks1Content.p}")`,
      1,
    );
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
