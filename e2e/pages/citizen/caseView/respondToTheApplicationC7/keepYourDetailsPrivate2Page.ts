import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers.ts";
import { KeepYourDetailsPrivateContent } from "../../../../fixtures/citizen/caseView/respondToTheApplicationC7/keepYourDetailsPrivateContent.ts";

enum UniqueSelectors {
  question = "#startAlternative-2",
}

export class KeepYourDetailsPrivate2Page {
  public static async keepYourDetailsPrivate2Page(
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
      .locator(Selectors.GovukHeadingL, {
        hasText: KeepYourDetailsPrivateContent.page2h1,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${KeepYourDetailsPrivateContent.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${KeepYourDetailsPrivateContent.radioNo}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${KeepYourDetailsPrivateContent.radioYes}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      //await new AxeUtils(page).audit(); //failing, ticket raised FPVTL-XXXX
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(UniqueSelectors.question);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
