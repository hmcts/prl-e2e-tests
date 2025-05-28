import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../common/selectors.ts";
import { AdminRemoveLegalRepresentativeContent } from "../../../../fixtures/manageCases/caseProgression/removeLegalRepresentative/adminRemoveLegalRepresentativeContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

export class AdminRemoveLegalRepresentativePage {
  public static async adminRemoveLegalRepresentativePage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(`${Selectors.GovukHeadingL}`, {
        hasText: `${AdminRemoveLegalRepresentativeContent.pageTitle}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AdminRemoveLegalRepresentativeContent.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AdminRemoveLegalRepresentativeContent.p2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AdminRemoveLegalRepresentativeContent.p3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.check(
      `${Selectors.GovukFormLabel}:has-text("Legal Solicitor (John Doe)")`,
    );
    await page.check(
      `${Selectors.GovukFormLabel}:has-text("Legal Solicitor Jr (Jeremy Anderson)")`,
    );
    await page.check(
      `${Selectors.GovukFormLabel}:has-text("Sr Legal Solicitor (Martina Graham)")`,
    );
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
