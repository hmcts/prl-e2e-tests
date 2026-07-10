import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers.ts";
import { ResponseCYAsContent } from "../../../../fixtures/citizen/caseView/respondToTheApplicationC7/responseCYAsContent.ts";

enum UniqueSelectors {
  declarationRadio = "#declarationCheck",
}

export class ResponseCYAsPage {
  public static async responseCYAsPage(
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
      .locator(Selectors.GovukHeadingXL, {
        hasText: ResponseCYAsContent.h1,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyL}:text-is("${ResponseCYAsContent.bodyL}")`,
        1,
      ),
      await Helpers.checkGroup(
        page,
        2,
        ResponseCYAsContent,
        "warningText",
        Selectors.GovukWarningText,
      ),
      await Helpers.checkGroup(
        page,
        7,
        ResponseCYAsContent,
        "h2_",
        Selectors.GovukHeadingAppTask,
      ),
      await Helpers.checkGroup(
        page,
        4,
        ResponseCYAsContent,
        "h3_",
        Selectors.GovukHeadingAppTask,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${ResponseCYAsContent.h3govukHeadingM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${ResponseCYAsContent.editLink}")`,
        23,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${ResponseCYAsContent.answerNo}")`,
        13,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${ResponseCYAsContent.answerYes}")`,
        2,
      ),
      await Helpers.checkGroup(
        page,
        23,
        ResponseCYAsContent,
        "listKey",
        Selectors.GovukSummaryListKey,
      ),
      await Helpers.checkGroup(
        page,
        7,
        ResponseCYAsContent,
        "listValue",
        Selectors.GovukSummaryListValue,
      ),
      await Helpers.checkGroup(page, 5, ResponseCYAsContent, "p", Selectors.p),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ResponseCYAsContent.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ResponseCYAsContent.label}")`,
        1,
      ),
      await Helpers.checkGroup(
        page,
        2,
        ResponseCYAsContent,
        "button",
        Selectors.GovukButton,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ResponseCYAsContent.headingL}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(UniqueSelectors.declarationRadio);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.submitYourResponse}")`,
    );
  }
}
