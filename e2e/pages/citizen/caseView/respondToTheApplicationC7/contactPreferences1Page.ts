import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers.ts";
import { ContactPreferencesC7Content } from "../../../../fixtures/citizen/caseView/respondToTheApplicationC7/contactPreferencesC7Content.ts";

enum UniqueSelectors {
  question = "#partyContactPreference-2",
}

export class ContactPreferences1Page {
  public static async contactPreferences1Page(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingXL, {
        hasText: ContactPreferencesC7Content.h1,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${ContactPreferencesC7Content.fieldSetLegend}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:has-text("${ContactPreferencesC7Content.span}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        ContactPreferencesC7Content,
        "p",
        Selectors.p,
      ),
      Helpers.checkGroup(
        page,
        3,
        ContactPreferencesC7Content,
        "li",
        Selectors.li,
      ),
      Helpers.checkGroup(
        page,
        3,
        ContactPreferencesC7Content,
        "hint",
        Selectors.GovukHint,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ContactPreferencesC7Content.label1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ContactPreferencesC7Content.label2}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(UniqueSelectors.question);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
