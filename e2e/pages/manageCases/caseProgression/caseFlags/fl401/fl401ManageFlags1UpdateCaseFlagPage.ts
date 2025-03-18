import { Page } from "@playwright/test";
import { SupportType } from "../../../../../common/types.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Fl401ManageFlags1UpdateCaseFlagContent } from "../../../../../fixtures/manageCases/caseProgression/caseFlags/fl401/fl401ManageFlags1UpdateCaseFlagContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";

enum UniqueSelectors {
  activeRadio = "#status_ACTIVE",
  notApprovedRadio = "#status_NOT_APPROVED",
  statusChangeTextbox = "#flagStatusReasonChange",
  addTranslationCheckbox = "#flagIsWelshTranslationNeeded",
}

export class Fl401ManageFlags1UpdateCaseFlagPage {
  public static async fl401ManageFlags1UpdateCaseFlagPage(
    page: Page,
    supportType: SupportType,
    isApproved: boolean,
    withTranslation: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, supportType, accessibilityTest);
    await this.fillInFields(page, isApproved, withTranslation);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    supportType: SupportType,
    accessibilityTest: boolean,
  ): Promise<void> {
    if (supportType === "reasonableAdjustment") {
      await page
        .locator(Selectors.GovukLabelM, {
          hasText:
            Fl401ManageFlags1UpdateCaseFlagContent.govUkLabelMReasonableAdjustment,
        })
        .waitFor();
    } else {
      await page
        .locator(Selectors.GovukLabelM, {
          hasText:
            Fl401ManageFlags1UpdateCaseFlagContent.govUkLabelMLanguageInterpreter,
        })
        .waitFor();
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${Fl401ManageFlags1UpdateCaseFlagContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukWarningText}:text-is("${Fl401ManageFlags1UpdateCaseFlagContent.govUkWarningText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${Fl401ManageFlags1UpdateCaseFlagContent.govUkHint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${Fl401ManageFlags1UpdateCaseFlagContent.govUkHint2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${Fl401ManageFlags1UpdateCaseFlagContent.govUkHint3}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        Fl401ManageFlags1UpdateCaseFlagContent,
        `govUkLabel`,
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
    ]);
    if (supportType === "reasonableAdjustment") {
      await Promise.all([
        page
          .locator(Selectors.GovukLabelS, {
            hasText:
              Fl401ManageFlags1UpdateCaseFlagContent.govUkLabelSReasonableAdjustment,
          })
          .waitFor(),
        page
          .locator(Selectors.GovukFieldsetHeading, {
            hasText:
              Fl401ManageFlags1UpdateCaseFlagContent.govUkFieldSetHeadingReasonableAdjustment,
          })
          .waitFor(),
      ]);
    } else {
      await Promise.all([
        page
          .locator(Selectors.GovukLabelS, {
            hasText:
              Fl401ManageFlags1UpdateCaseFlagContent.govUkLabelSLanguageInterpreter,
          })
          .waitFor(),
        page
          .locator(Selectors.GovukFieldsetHeading, {
            hasText:
              Fl401ManageFlags1UpdateCaseFlagContent.govUkFieldSetHeadingLanguageInterpreter,
          })
          .waitFor(),
      ]);
    }
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page);   TODO: add jira ticket
    }
  }

  private static async fillInFields(
    page: Page,
    isApproved: boolean,
    withTranslation: boolean,
  ): Promise<void> {
    if (isApproved) {
      await page.check(UniqueSelectors.activeRadio);
    } else {
      await page.check(UniqueSelectors.notApprovedRadio);
    }
    await page.fill(
      UniqueSelectors.statusChangeTextbox,
      Fl401ManageFlags1UpdateCaseFlagContent.statusChangeText,
    );
    if (withTranslation) {
      await page.check(UniqueSelectors.addTranslationCheckbox);
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
