import { Browser, Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers.ts";
import { RemoveBarristerContent } from "../../../../fixtures/manageCases/caseProgression/addBarristerAndRemoveBarrister/removeBarristerContent.ts";
import config from "../../../../utils/config.utils.ts";

export class RemoveBarrister {
  public static async removeBarrister(
    accessibilityTest: boolean,
    ccdRef: string,
    browser: Browser,
  ): Promise<void> {
    const page: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    await page.reload();
    await Helpers.chooseEventFromDropdown(page, "Remove barrister");
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await expect(
      page.locator(Selectors.GovukHeadingL, {
        hasText: RemoveBarristerContent.govUkHeadingL,
      }),
    ).toBeVisible();
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.Span}:text-is("${RemoveBarristerContent.span}")`,
      1,
    );
    await expect(
      page.locator('[id^="allocatedBarrister_partyList_"]').first(),
    ).toBeVisible();
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.locator('[id^="allocatedBarrister_partyList_"]').first().check();
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
