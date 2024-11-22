import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Fl401AddCaseNumberSubmitContent } from "../../../../fixtures/citizen/caseProgression/checkApplication/fl401AddCaseNumberSubmitContent";

export class Fl401AddCaseNumberSubmitPage {
  public static async fl401AddCaseNumberSubmitPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.saveAndContinue(page);
    await this.checkFamilyManIdUpdated(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.headingH2, {
        hasText: Fl401AddCaseNumberSubmitContent.headingH2,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${Fl401AddCaseNumberSubmitContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        Fl401AddCaseNumberSubmitContent,
        `text16`,
        Selectors.GovukText16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async saveAndContinue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }

  private static async checkFamilyManIdUpdated(page: Page): Promise<void> {
    await page
      .locator(Selectors.alertMessage, {
        hasText: Fl401AddCaseNumberSubmitContent.alertMessage,
      })
      .waitFor();
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.h2}:text-is("${Fl401AddCaseNumberSubmitContent.familyManH2}")`,
      1,
    );
  }
}
