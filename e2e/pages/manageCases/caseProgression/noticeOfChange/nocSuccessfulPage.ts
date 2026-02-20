import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { NocSuccessfulContent } from "../../../../fixtures/manageCases/caseProgression/noticeOfChange/nocSuccessfulContent";

export class NocSuccessfulPage {
  public static async nocSuccessfulPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.viewThisCase(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukPanelTitle, {
        hasText: NocSuccessfulContent.govUkPanelTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukPanelBody}:has-text("${NocSuccessfulContent.govUkPanelBody}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        NocSuccessfulContent,
        `govUkBody`,
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${NocSuccessfulContent.govUkHeadingM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukWarningText}:text-is("${NocSuccessfulContent.govUkWarningText}")`,
        1,
      ),
      Helpers.checkGroup(page, 2, NocSuccessfulContent, `a`, `${Selectors.a}`),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async viewThisCase(page: Page): Promise<void> {
    await page.locator(Selectors.a, { hasText: "View this case" }).click();
  }
}
