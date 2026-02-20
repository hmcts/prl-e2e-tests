import { StartPageContent } from "../../fixtures/edgeCases/startPageContent";
import { Page } from "@playwright/test";
import { Selectors } from "../../common/selectors";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../common/helpers";

interface StartPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class StartPage {
  public static async startPage({
    page,
    accessibilityTest,
  }: StartPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await page.click(`${Selectors.a}:text-is("${StartPageContent.button}")`);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: StartPageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${StartPageContent.h1}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukWarningText}:text-is("${StartPageContent.warning}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${StartPageContent.h2}")`,
        1,
      ),
      Helpers.checkGroup(page, 6, StartPageContent, "p", `${Selectors.p}`),
      Helpers.checkGroup(
        page,
        2,
        StartPageContent,
        "link",
        `${Selectors.GovukLink}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${StartPageContent.button}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
}
