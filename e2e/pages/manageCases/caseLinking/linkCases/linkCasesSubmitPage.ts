import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { LinkCaseSubmitContent } from "../../../../fixtures/manageCases/caseLinking/linkCases/linkCasesSubmitContent";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";

interface LinkCasesSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class LinkCasesSubmitPage {
  public static async linkCasesSubmitPage({
    page,
    accessibilityTest,
  }: LinkCasesSubmitPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await Helpers.clickButton(page, LinkCaseSubmitContent.createCaseLinkButton);
    await expect(
      page.locator(
        `${Selectors.alertMessage}:has-text("${LinkCaseSubmitContent.confirmationMessage}")`,
      ),
    ).toBeVisible();
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<LinkCasesSubmitPageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${LinkCaseSubmitContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${LinkCaseSubmitContent.h2}")`,
        1,
      ),

      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${LinkCaseSubmitContent.text16}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
