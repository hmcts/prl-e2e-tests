import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { Page } from "@playwright/test";
import { Private_details_confirmedContent } from "../../../../../fixtures/citizen/caseView/applicant/keepDetailsPrivate/private_details_confirmedContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";

interface Start_alternativeContent {
  page: Page;
  accessibilityTest: boolean;
  startAlternativeYesNo: boolean;
}

export class PrivateDetailsConfirmedPage {
  public static async private_details_confirmedPage({
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
          hasText: Private_details_confirmedContent.yesPageTitle,
        })
        .waitFor();
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${Private_details_confirmedContent.yesSpan}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h2}:text-is("${Private_details_confirmedContent.h2}")`,
          1,
        ),
        Helpers.checkGroup(
          page,
          2,
          Private_details_confirmedContent,
          "p",
          Selectors.p,
        ),
        Helpers.checkGroup(
          page,
          3,
          Private_details_confirmedContent,
          "li",
          Selectors.li,
        ),
      ]);
    } else if (startAlternativeYesNo) {
      await page
        .locator(Selectors.h1, {
          hasText: Private_details_confirmedContent.noPageTitle,
        })
        .waitFor();
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${Private_details_confirmedContent.noSpan}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${Private_details_confirmedContent.noP}")`,
          1,
        ),
      ]);
    } else {
      throw new Error("startAlternativeYesNo is not defined)");
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<Start_alternativeContent>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
