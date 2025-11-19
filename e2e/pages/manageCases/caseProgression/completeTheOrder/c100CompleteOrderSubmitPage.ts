import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../common/selectors.js";
import { Helpers } from "../../../../common/helpers.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { c100CompleteOrderSubmitCAContent } from "../../../../fixtures/manageCases/caseProgression/completeTheOrder/c100CompleteOrderSubmitCAContent.js";

interface submitPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class c100CompleteOrderSubmitPage {
  public static async c100CompleteOrdersubmitPage({
    page,
    accessibilityTest,
  }: submitPageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<submitPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${c100CompleteOrderSubmitCAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH2}:text-is("${c100CompleteOrderSubmitCAContent.headingh2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${c100CompleteOrderSubmitCAContent.headingh3}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${c100CompleteOrderSubmitCAContent.change}"):visible`,
        21,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Helpers.todayDate()}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        c100CompleteOrderSubmitCAContent,
        "h2_",
        `${Selectors.h2}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        c100CompleteOrderSubmitCAContent,
        "p",
        `${Selectors.p}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        c100CompleteOrderSubmitCAContent,
        "strong",
        `${Selectors.strong}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        c100CompleteOrderSubmitCAContent,
        "link",
        `${Selectors.GovLink}`,
      ),
      Helpers.checkGroup(
        page,
        28,
        c100CompleteOrderSubmitCAContent,
        "text16_",
        `${Selectors.GovukText16}`,
      ),
    ]);

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
  }: Partial<submitPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
