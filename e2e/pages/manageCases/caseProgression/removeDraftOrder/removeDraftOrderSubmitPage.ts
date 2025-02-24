import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { RemoveDraftOrderSubmitContent } from "../../../../fixtures/manageCases/caseProgression/removeDraftOrder/removeDraftOrder2Submit.ts";
import { Helpers } from "../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { RemoveDraftOrder2Content } from "../../../../fixtures/manageCases/caseProgression/removeDraftOrder/removeDraftOrder2Content.ts";

interface RemoveDraftOrderSubmitPageParams {
  caseWorkerPage: Page;
  accessibilityTest: boolean;
}

export class RemoveDraftOrderSubmitPage {
  public static async removeDraftOrderSubmitPage({
    caseWorkerPage,
    accessibilityTest,
  }: RemoveDraftOrderSubmitPageParams): Promise<void> {
    await this.checkPageLoads(caseWorkerPage, accessibilityTest);
    await this.submit(caseWorkerPage);
  }

  private static async checkPageLoads(page: Page, accessibilityTest: boolean) {
    const pageH2 = page.locator(
      `${Selectors.h2}:text-is("${RemoveDraftOrderSubmitContent.headingH2}")`,
    );
    await pageH2.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${RemoveDraftOrderSubmitContent.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${RemoveDraftOrderSubmitContent.text16}")`,
        1,
      ),
      page.getByRole("cell", {
        name: RemoveDraftOrderSubmitContent.cell1,
        exact: true,
      }),
      page.getByRole("cell", {
        name: RemoveDraftOrderSubmitContent.cell2,
        exact: true,
      }),
      page.getByRole("cell", {
        name: RemoveDraftOrder2Content.inputText,
        exact: true,
      }),
    ]);

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async submit(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
