import { Page } from "@playwright/test";
import { SupportType } from "../../../../common/types";
import { Selectors } from "../../../../common/selectors";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { Helpers } from "../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { RequestSupportSupportTypeContent } from "../../../../fixtures/manageCases/caseProgression/caseFlags/requestSupportSupportTypeContent";

enum UniqueSelectors {
  reasonableAdjustmentsRadio = "#flag-type-0",
  languageInterpreterRadio = "#flag-type-1",
}

export class RequestSupportSupportTypePage {
  public static async requestSupportSupportTypePage(
    page: Page,
    supportType: SupportType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, supportType);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukFieldsetHeading, {
        hasText: RequestSupportSupportTypeContent.govUkFieldSetHeading,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${RequestSupportSupportTypeContent.govUKHeadingL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        RequestSupportSupportTypeContent,
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
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    supportType: SupportType,
  ): Promise<void> {
    if (supportType === "reasonableAdjustment") {
      await page.check(UniqueSelectors.reasonableAdjustmentsRadio);
    } else {
      await page.check(UniqueSelectors.languageInterpreterRadio);
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
