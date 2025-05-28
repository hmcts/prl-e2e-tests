import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { LinkCases1Content } from "../../../../fixtures/manageCases/caseLinking/linkCases/linkCases1Content";
import { Helpers } from "../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";

interface LinkCases1PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class LinkCases1Page {
  public static async linkCases1Page({
    page,
    accessibilityTest,
  }: LinkCases1PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<LinkCases1PageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${LinkCases1Content.pageTitle}")`,
    );
    await pageTitle.waitFor({ state: "visible" });
    await Helpers.checkGroup(page, 2, LinkCases1Content, "p", Selectors.p);
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
