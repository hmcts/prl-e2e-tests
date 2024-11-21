import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { SubmitContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/SubmitContent";
import { CommonStaticText } from "../../../../../common/commonStaticText";

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
      `${Selectors.GovukHeadingL}:text-is("${SubmitContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH2}:text-is("${SubmitContent.headingh2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${SubmitContent.headingh3}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitContent.change}")`,
        13,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Helpers.todayDate()}")`,
        1,
      ),
      Helpers.checkGroup(page, 3, SubmitContent, "h2_", `${Selectors.h2}`),
      Helpers.checkGroup(page, 2, SubmitContent, "p", `${Selectors.p}`),
      Helpers.checkGroup(
        page,
        2,
        SubmitContent,
        "strong",
        `${Selectors.strong}`,
      ),
      Helpers.checkGroup(page, 2, SubmitContent, "a", `${Selectors.a}`),
      Helpers.checkGroup(
        page,
        29,
        SubmitContent,
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
