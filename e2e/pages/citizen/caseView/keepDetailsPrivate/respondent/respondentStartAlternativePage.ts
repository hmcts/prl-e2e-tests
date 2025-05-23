import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { RespondentStartAlternativeContent } from "../../../../../fixtures/citizen/caseView/respondent/keepDetailsPrivate/respondentStartAlternativeContent.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface StartAlternativeParams {
  page: Page;
  accessibilityTest: boolean;
  startAlternativeYesNo: boolean;
}

enum UniqueSelectors {
  yes = "#startAlternative",
  hiddenYesAddress = "#contactDetailsPrivate",
  hiddenYesPhone = "#contactDetailsPrivate-2",
  hiddenYesEmail = "#contactDetailsPrivate-3",
  no = "#startAlternative-2",
}

export class RespondentStartAlternativePage {
  public static async respondentStartAlternativePage({
    page,
    accessibilityTest,
    startAlternativeYesNo,
  }: StartAlternativeParams): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, startAlternativeYesNo });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<StartAlternativeParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: RespondentStartAlternativeContent.pageTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${RespondentStartAlternativeContent.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.yes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.no}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit({
        exclude: UniqueSelectors.yes,
      });
      //false-positive (https://github.com/alphagov/govuk-frontend/issues/979, https://github.com/w3c/aria/issues/1404)
    }
  }

  private static async fillInFields({
    page,
    startAlternativeYesNo,
  }: Partial<StartAlternativeParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    if (startAlternativeYesNo) {
      await page.click(UniqueSelectors.yes);
      await this.hiddenFormLabels(page);
      await page.click(UniqueSelectors.hiddenYesAddress);
      await page.click(UniqueSelectors.hiddenYesPhone);
      await page.click(UniqueSelectors.hiddenYesEmail);
    } else {
      await page.check(UniqueSelectors.no);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }

  private static async hiddenFormLabels(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        RespondentStartAlternativeContent,
        "hiddenFormLabel",
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.div}:text-is("${RespondentStartAlternativeContent.hiddenHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${RespondentStartAlternativeContent.hiddenLegend}")`,
        1,
      ),
    ]);
  }
}
