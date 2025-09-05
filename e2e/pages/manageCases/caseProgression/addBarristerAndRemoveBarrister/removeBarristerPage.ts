import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers.ts";
import { RemoveBarristerContent } from "../../../../fixtures/manageCases/caseProgression/addBarristerAndRemoveBarrister/removeBarristerContent.ts";

export class RemoveBarrister {
  public static async removeBarrister(
    page: Page,
    caseRef: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, caseRef);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await expect(
        page.locator(Selectors.GovukHeadingL, { hasText: RemoveBarristerContent.govUkHeadingL }),
      ).toBeVisible();
    await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${RemoveBarristerContent.span}")`,
          1,
    );
    await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${RemoveBarristerContent.change}")`,
        1,
    );
    const radioButton = page.locator(`${Selectors.formControl} input[type="radio"]`);
    await expect(radioButton).toBeVisible();
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    caseRef: string,
  ): Promise<void> {
    await page.locator('[id^="allocatedBarrister_partyList_"]').first().check();
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}