import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/welshLanguageRequirements/submitContent";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { WelshLanguageRequirementsContent } from "../../../../../fixtures/manageCases/createCase/FL401/welshLanguageRequirements/welshLanguageRequirementsContent";

export class WelshLanguageRequirementsSubmitPage {
  public static async welshLanguageRequirementsSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    welshLanguageRequirementsAllOptionsYes: boolean,
    welshLanguageRequirementsSelectWelsh?: boolean,
  ): Promise<void> {
    await this.checkPageContent(
      page,
      accessibilityTest,
      welshLanguageRequirementsAllOptionsYes,
      welshLanguageRequirementsSelectWelsh,
    );
    await this.fillInFields(page);
  }

  private static async checkPageContent(
    page: Page,
    accessibilityTest: boolean,
    welshLanguageRequirementsAllOptionsYes: boolean,
    welshLanguageRequirementsSelectWelsh?: boolean,
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page, welshLanguageRequirementsAllOptionsYes),
      this.checkFilledInData(
        page,
        welshLanguageRequirementsAllOptionsYes,
        welshLanguageRequirementsSelectWelsh,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkPageLoads(
    page: Page,
    welshLanguageRequirementsAllOptionsYes: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${SubmitContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${SubmitContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitContent.checkInfoLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitContent.change}")`,
        welshLanguageRequirementsAllOptionsYes ? 3 : 1,
      ),
    ]);
  }

  private static async checkFilledInData(
    page: Page,
    welshLanguageRequirementsAllOptionsYes: boolean,
    welshLanguageRequirementsSelectWelsh?: boolean,
  ): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukText16}:text-is("${SubmitContent.formLabel1}")`,
      1,
    );
    if (welshLanguageRequirementsAllOptionsYes) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsContent.yes}")`,
        2,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitContent.formLabel2}")`,
        1,
      );
      if (welshLanguageRequirementsSelectWelsh) {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsContent.welsh}")`,
          1,
        );
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${SubmitContent.formLabel3}")`,
          1,
        );
      } else {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsContent.english}")`,
          1,
        );
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${SubmitContent.formLabel4}")`,
          1,
        );
      }
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsContent.no}")`,
        1,
      );
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SubmitContent.saveAndContinue}")`,
    );
  }
}
