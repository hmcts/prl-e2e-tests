import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers.ts";
import { AddBarristerContent } from "../../../../fixtures/manageCases/caseProgression/addBarristerAndRemoveBarrister/addBarristerContent.ts";

export class AddBarrister {
  public static async addBarrister(
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
          page.locator(Selectors.GovukHeadingL, { hasText: AddBarristerContent.govUkHeadingL }),
      ).toBeVisible();
    await Promise.all([
      Helpers.checkGroup(page, 4, AddBarristerContent, `span`, `${Selectors.Span}`),
      Helpers.checkVisibleAndPresent(
        page,
          `${Selectors.GovukHint}:text-is("${AddBarristerContent.govUkHint}")`,
        1,
        ),
        Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukDetailsText}:text-is("${AddBarristerContent.govukDetailsText}")`,
            1,
        ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    caseRef: string,
  ): Promise<void> {
    await page.locator('[id^="allocatedBarrister_partyList_"]').first().check();
    await page.getByRole('textbox', { name: 'allocatedBarrister_barristerFirstName' }).fill(AddBarristerContent.barristerFirstName);
    await page.getByRole('textbox', { name: 'allocatedBarrister_barristerLastName' }).fill(AddBarristerContent.barristerLastName);
    await page.getByRole('textbox', { name: 'allocatedBarrister_barristerEmail' }).fill(AddBarristerContent.barristerEmail);
    await page.getByRole('textbox', { name: 'search-org-text' }).fill(AddBarristerContent.barristerOrgAAT);
    await page.getByText(' Select ').click();
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}