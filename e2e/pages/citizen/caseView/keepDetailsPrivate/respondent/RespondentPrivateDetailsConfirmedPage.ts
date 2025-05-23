import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { RespondentPrivateDetailsConfirmedContent } from "../../../../../fixtures/citizen/caseView/respondent/keepDetailsPrivate/respondentPrivateDetailsConfirmedContent.ts";

interface Start_alternativeContent {
  page: Page;
  accessibilityTest: boolean;
  startAlternativeYesNo: boolean;
}

export class RespondentPrivateDetailsConfirmedPage {
  public static async respondentPrivateDetailsConfirmedPage({
    page,
    accessibilityTest,
    startAlternativeYesNo,
  }: {
    page: Page;
    accessibilityTest: boolean;
    startAlternativeYesNo: boolean;
  }): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      startAlternativeYesNo,
    });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    startAlternativeYesNo,
  }: Start_alternativeContent): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    if (startAlternativeYesNo) {
      await page
        .locator(Selectors.GovukFieldsetHeading, {
          hasText: RespondentPrivateDetailsConfirmedContent.yesPageTitle,
        })
        .waitFor();
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${RespondentPrivateDetailsConfirmedContent.yesSpan}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h2}:text-is("${RespondentPrivateDetailsConfirmedContent.h2}")`,
          1,
        ),
        Helpers.checkGroup(
          page,
          2,
          RespondentPrivateDetailsConfirmedContent,
          "p",
          Selectors.p,
        ),
        Helpers.checkGroup(
          page,
          3,
          RespondentPrivateDetailsConfirmedContent,
          "li",
          Selectors.li,
        ),
      ]);
    } else {
      await page
        .locator(Selectors.h1, {
          hasText: RespondentPrivateDetailsConfirmedContent.noPageTitle,
        })
        .waitFor();
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${RespondentPrivateDetailsConfirmedContent.noSpan}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${RespondentPrivateDetailsConfirmedContent.noP}")`,
          1,
        ),
      ]);
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
  }: Partial<Start_alternativeContent>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
