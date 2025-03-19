import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { Fl401RequestSupport1SupportForContent } from "../../../../../fixtures/manageCases/caseProgression/caseFlags/fl401/fl401RequestSupport1SupportForContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { solicitorCaseCreateType } from "../../../../../common/types.ts";

enum UniqueSelectors {
  applicantRadio = "#flag-location-0",
}

export class Fl401RequestSupport1SupportForPage {
  public static async fl401RequestSupport1SupportForPage(
    page: Page,
    caseType: solicitorCaseCreateType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, caseType, accessibilityTest);
    await this.fillInFields(page);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    caseType: solicitorCaseCreateType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukFieldsetHeading, {
        hasText: Fl401RequestSupport1SupportForContent.govUkFieldSetHeading,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${Fl401RequestSupport1SupportForContent.govUKHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
    ]);
    if (caseType === "C100") {
      await Helpers.checkGroup(
        page,
        7,
        Fl401RequestSupport1SupportForContent,
        `c100GovUkLabel`,
        `${Selectors.GovukLabel}`,
      );
    } else {
      await Helpers.checkGroup(
        page,
        2,
        Fl401RequestSupport1SupportForContent,
        `fl401GovUkLabel`,
        `${Selectors.GovukLabel}`,
      );
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.check(UniqueSelectors.applicantRadio);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
