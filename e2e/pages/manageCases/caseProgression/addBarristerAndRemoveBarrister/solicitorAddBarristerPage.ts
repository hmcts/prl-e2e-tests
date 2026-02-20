import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers";
import { AddBarristerContent } from "../../../../fixtures/manageCases/caseProgression/addBarristerAndRemoveBarrister/addBarristerContent";

export class SolicitorAddBarrister {
  public static async solicitorAddBarrister(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Add barrister");
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
        hasText: AddBarristerContent.govUkHeadingL,
      }),
    ).toBeVisible();
    await Promise.all([
      Helpers.checkGroup(
        page,
        4,
        AddBarristerContent,
        `span`,
        `${Selectors.Span}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${AddBarristerContent.govUkHint}")`,
        1,
      ),
    ]);
    await expect(
      page.locator(Selectors.GovukDetailsText, {
        hasText: AddBarristerContent.govukDetailsText,
      }),
    ).toBeHidden();
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.locator('[id^="allocatedBarrister_partyList_"]').first().check();
    await page
      .locator("#allocatedBarrister_barristerFirstName")
      .fill(AddBarristerContent.barristerFirstName);
    await page
      .locator("#allocatedBarrister_barristerLastName")
      .fill(AddBarristerContent.barristerLastName);
    await page
      .locator("#allocatedBarrister_barristerEmail")
      .fill(AddBarristerContent.barristerEmail);
    await page
      .locator("#search-org-text")
      .fill(AddBarristerContent.barristerOrgAAT);
    await page.getByTitle("Select the organisation PRL Barrister Org2").click();
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
