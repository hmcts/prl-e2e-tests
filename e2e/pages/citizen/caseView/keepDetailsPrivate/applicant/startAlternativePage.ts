import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { StartAlternativeContent } from "../../../../../fixtures/citizen/caseView/keepDetailsPrivate/startAlternativeContent.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface Start_alternativeParams {
  page: Page;
  accessibilityTest: boolean;
  startAlternativeYesNo: boolean;
  isApplicant: boolean;
}

enum UniqueSelectors {
  yes = "#startAlternative",
  hiddenYesAddress = "#contactDetailsPrivate",
  hiddenYesPhone = "#contactDetailsPrivate-2",
  hiddenYesEmail = "#contactDetailsPrivate-3",
  no = "#startAlternative-2",
}

export class ApplicantStartAlternativePage {
  public static async applicantStartAlternativePage({
    page,
    accessibilityTest,
    startAlternativeYesNo,
    isApplicant,
  }: Start_alternativeParams): Promise<void> {
    await this.applicantCheckPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, startAlternativeYesNo, isApplicant });
  }

  public static async respondentStartAlternativePage({
    page,
    accessibilityTest,
    startAlternativeYesNo,
    isApplicant,
  }: Start_alternativeParams): Promise<void> {
    await this.respondentCheckPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, startAlternativeYesNo, isApplicant });
  }

  private static async applicantCheckPageLoads({
    page,
    accessibilityTest,
  }: Partial<Start_alternativeParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: StartAlternativeContent.applicantPageTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${StartAlternativeContent.span}")`,
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
      }); //false-positive (https://github.com/alphagov/govuk-frontend/issues/979, https://github.com/w3c/aria/issues/1404)
    }
  }

  private static async respondentCheckPageLoads({
    page,
    accessibilityTest,
  }: Partial<Start_alternativeParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: StartAlternativeContent.respondentPageTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${StartAlternativeContent.span}")`,
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
    isApplicant,
  }: Partial<Start_alternativeParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    if (startAlternativeYesNo) {
      await page.click(UniqueSelectors.yes);
      if (isApplicant) {
        await this.applicantHiddenFormLabels(page);
      } else {
        await this.respondentHiddenFormLabels(page);
      }
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

  private static async applicantHiddenFormLabels(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        StartAlternativeContent,
        "hiddenFormLabel",
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.div}:text-is("${StartAlternativeContent.hiddenDivApplicant}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${StartAlternativeContent.hiddenLegend}")`,
        1,
      ),
    ]);
  }

  private static async respondentHiddenFormLabels(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        StartAlternativeContent,
        "hiddenFormLabel",
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.div}:text-is("${StartAlternativeContent.hiddenDivRespondent}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${StartAlternativeContent.hiddenLegend}")`,
        1,
      ),
    ]);
  }
}
