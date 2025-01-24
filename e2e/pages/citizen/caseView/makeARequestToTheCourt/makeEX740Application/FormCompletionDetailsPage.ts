import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { FormCompletionDetailsContent } from "../../../../../fixtures/citizen/caseView/makeARequestToTheCourt/makeEX740Application/formCompletionDetailsContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";

enum UniqueSelectors {
  completedFormYes = "#awp_completedForm",
  completedFormNo = "#awp_completedForm-2",
}

export class FormCompletionDetailsPage {
  public static async formCompletionDetailsPage(
    page: Page,
    completedEX740Form: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, completedEX740Form);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingXL, {
        hasText: FormCompletionDetailsContent.govUkHeadingXl,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionL}:text-is("${FormCompletionDetailsContent.govUkCaptionL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${FormCompletionDetailsContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${FormCompletionDetailsContent.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${FormCompletionDetailsContent.govUkFieldsetLegend}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2, 
        FormCompletionDetailsContent,
        `label`, 
        `${Selectors.GovukLabel}`
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${FormCompletionDetailsContent.govUkLink}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
      page: Page,
      completedEX740Form: boolean,
    ): Promise<void> {
      if (completedEX740Form) {
        await page.click(
          UniqueSelectors.completedFormYes,
        );
      } else {
        await page.click(UniqueSelectors.completedFormNo);
      }
    }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
