import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { RequestSupportSupportForContent } from "../../../../fixtures/manageCases/caseProgression/caseFlags/requestSupportSupportForContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { solicitorCaseCreateType } from "../../../../common/types.ts";

enum UniqueSelectors {
  applicantRadio = "#flag-location-0",
}

export class RequestSupportSupportForPage {
  public static async requestSupportSupportForPage(
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
        hasText: RequestSupportSupportForContent.govUkFieldSetHeading,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${RequestSupportSupportForContent.govUKHeadingL}")`,
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
        RequestSupportSupportForContent,
        `c100GovUkLabel`,
        `${Selectors.GovukLabel}`,
      );
    } else {
      await Helpers.checkGroup(
        page,
        2,
        RequestSupportSupportForContent,
        `fl401GovUkLabel`,
        `${Selectors.GovukLabel}`,
      );
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
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
