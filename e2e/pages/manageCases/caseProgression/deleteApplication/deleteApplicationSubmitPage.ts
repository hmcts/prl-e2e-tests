import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import {
  DeleteApplicationSubmitContent
} from "../../../../fixtures/manageCases/caseProgression/deleteApplication/deleteApplicationSubmitContent.ts";


export class DeleteApplicationSubmitPage {
  public static async deleteApplicationSubmitPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.delete(page);
    await expect(
      page.locator(
        `${Selectors.alertMessage}:has-text("${DeleteApplicationSubmitContent.confirmationMessage}")`,
      ),
    ).toBeVisible();
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await expect(
      page.locator(Selectors.GovukHeadingL, { hasText: DeleteApplicationSubmitContent.pageTitle }),
    ).toBeVisible();
    await Promise.all([
      Helpers.checkGroupHasText(
        page,
        3,
        DeleteApplicationSubmitContent,
        "h2",
        `${Selectors.h2}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        DeleteApplicationSubmitContent,
        "text16",
        `${Selectors.Span}${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DeleteApplicationSubmitContent.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DeleteApplicationSubmitContent.delete}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async delete(page: Page): Promise<void>  {
    await page.click(
      `${Selectors.button}:text-is("${DeleteApplicationSubmitContent.delete}")`,
    );
  }
}