import { Page } from "@playwright/test";
import { SupportType, solicitorCaseCreateType } from "../../../../common/types";
import { Selectors } from "../../../../common/selectors";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { ManageFlagsUpdateCaseFlagContent } from "../../../../fixtures/manageCases/caseProgression/caseFlags/manageFlagsUpdateCaseFlagContent";
import { Helpers } from "../../../../common/helpers";

enum UniqueSelectors {
  activeRadio = "#status_ACTIVE",
  notApprovedRadio = "#status_NOT_APPROVED",
  statusChangeTextbox = "#flagStatusReasonChange",
  addTranslationCheckbox = "#flagIsWelshTranslationNeeded",
}

export class ManageFlagsUpdateCaseFlagPage {
  public static async manageFlagsUpdateCaseFlagPage(
    page: Page,
    supportType: SupportType,
    isApproved: boolean,
    withTranslation: boolean,
    accessibilityTest: boolean,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    await this.checkPageLoads(page, supportType, accessibilityTest);
    await this.fillInFields(page, isApproved, withTranslation);
    await this.continue(page, caseType);
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
            ManageFlagsUpdateCaseFlagContent.govUkLabelMReasonableAdjustment,
        })
        .waitFor();
    } else {
      await page
        .locator(Selectors.GovukLabelM, {
          hasText:
            ManageFlagsUpdateCaseFlagContent.govUkLabelMLanguageInterpreter,
        })
        .waitFor();
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ManageFlagsUpdateCaseFlagContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukWarningText}:text-is("${ManageFlagsUpdateCaseFlagContent.govUkWarningText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ManageFlagsUpdateCaseFlagContent.govUkHint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ManageFlagsUpdateCaseFlagContent.govUkHint2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ManageFlagsUpdateCaseFlagContent.govUkHint3}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        ManageFlagsUpdateCaseFlagContent,
        `govUkLabel`,
        `${Selectors.GovukLabel}`,
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
              ManageFlagsUpdateCaseFlagContent.govUkLabelSReasonableAdjustment,
          })
          .waitFor(),
        page
          .locator(Selectors.GovukFieldsetHeading, {
            hasText:
              ManageFlagsUpdateCaseFlagContent.govUkFieldSetHeadingReasonableAdjustment,
          })
          .waitFor(),
      ]);
    } else {
      await Promise.all([
        page
          .locator(Selectors.GovukLabelS, {
            hasText:
              ManageFlagsUpdateCaseFlagContent.govUkLabelSLanguageInterpreter,
          })
          .waitFor(),
        page
          .locator(Selectors.GovukFieldsetHeading, {
            hasText:
              ManageFlagsUpdateCaseFlagContent.govUkFieldSetHeadingLanguageInterpreter,
          })
          .waitFor(),
      ]);
    }
    if (accessibilityTest) {
      // await new AxeUtils(page).audit();   TODO: Awaiting for accessibility ticket FPVTL-174 to be resolved
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
      ManageFlagsUpdateCaseFlagContent.statusChangeText,
    );
    if (withTranslation) {
      await page.check(UniqueSelectors.addTranslationCheckbox);
    }
  }

  private static async continue(
    page: Page,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    if (caseType === "C100") {
      await page.click(
        `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
      );
    } else {
      await page.click(
        `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
      );
    }
  }
}
