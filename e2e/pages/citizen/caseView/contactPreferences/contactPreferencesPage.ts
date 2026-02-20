import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { AxeUtils } from "@hmcts/playwright-common";
import { ContactPreferencesContent } from "../../../../fixtures/citizen/caseView/contactPreferences/contactPreferencesContent";
import { Helpers } from "../../../../common/helpers";
import { contactOption } from "../../../../common/types";

enum UniqueSelectors {
  digital = "#partyContactPreference",
  byPost = "#partyContactPreference-2",
}

export class ContactPreferencesPage {
  public static async contactPreferencesPage(
    page: Page,
    accessibilityTest: boolean,
    contactOption: contactOption,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, contactOption);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingXL, {
        hasText: ContactPreferencesContent.GovukHeadingXL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${ContactPreferencesContent.GovukFieldsetLegend}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        ContactPreferencesContent,
        `GovukBody`,
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        ContactPreferencesContent,
        `li`,
        `${Selectors.li}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ContactPreferencesContent.govukHint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ContactPreferencesContent.govukHint2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ContactPreferencesContent.govukHint3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ContactPreferencesContent.digital}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ContactPreferencesContent.byPost}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    contactOption: contactOption,
  ): Promise<void> {
    if (contactOption === "Digital") {
      await page.click(UniqueSelectors.digital);
    } else if (contactOption === "Post") {
      await page.click(UniqueSelectors.byPost);
    } else {
      throw new Error("Invalid value for contactOption");
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
