import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { DeleteApplication1Content } from "../../../../fixtures/manageCases/caseProgression/deleteApplication/deleteApplication1Content.ts";

export class DeleteApplication1Page {
  public static async deleteApplication1Page(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: DeleteApplication1Content.pageTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkGroupHasText(
        page,
        2,
        DeleteApplication1Content,
        "h2",
        `${Selectors.h2}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${DeleteApplication1Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${DeleteApplication1Content.formLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DeleteApplication1Content.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DeleteApplication1Content.continue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DeleteApplication1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${DeleteApplication1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${DeleteApplication1Content.errorText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${DeleteApplication1Content.errorText}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(Selectors.formControl);
    await page.click(
      `${Selectors.button}:text-is("${DeleteApplication1Content.continue}")`,
    );
  }
}
