import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { ManageCaseLinksSubmitContent } from "../../../../fixtures/manageCases/caseLinking/manageCaseLinks/manageCaseLinksSubmitContent";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";

interface ManageCaseLinksSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class ManageCaseLinksSubmitPage {
  public static async manageCaseLinksSubmitPage({
    page,
    accessibilityTest,
  }: ManageCaseLinksSubmitPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await Helpers.clickButton(
      page,
      ManageCaseLinksSubmitContent.maintainCaseLinksButton,
    );
    await expect(
      page.locator(
        `${Selectors.alertMessage}:has-text("${ManageCaseLinksSubmitContent.confirmationMessage}")`,
      ),
    ).toBeVisible();
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ManageCaseLinksSubmitPageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageCaseLinksSubmitContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ManageCaseLinksSubmitContent.h2}")`,
        1,
      ),

      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ManageCaseLinksSubmitContent.text16}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
