import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper.ts";
import { SubmitCAContent } from "../../../../../../fixtures/manageCases/caseProgression/manageOrders/createAnOrder/orderCA/submitCAContent.ts";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";

interface submitPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class SubmitPage {
  public static async submitPage({
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
      `${Selectors.GovukHeadingL}:text-is("${SubmitCAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH2}:text-is("${SubmitCAContent.headingh2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${SubmitCAContent.headingh3}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitCAContent.change}")`,
        13,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Helpers.todayDate()}")`,
        1,
      ),
      Helpers.checkGroup(page, 3, SubmitCAContent, "h2_", `${Selectors.h2}`),
      Helpers.checkGroup(page, 2, SubmitCAContent, "p", `${Selectors.p}`),
      Helpers.checkGroup(
        page,
        2,
        SubmitCAContent,
        "strong",
        `${Selectors.strong}`,
      ),
      Helpers.checkGroup(page, 2, SubmitCAContent, "a", `${Selectors.a}`),
      Helpers.checkGroup(
        page,
        29,
        SubmitCAContent,
        "text16_",
        `${Selectors.GovukText16}`,
      ),
    ]);

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
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
