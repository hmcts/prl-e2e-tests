import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { Page } from "@playwright/test";
import { ApplicantPrivateDetailsConfirmedContent } from "../../../../../fixtures/citizen/caseView/applicant/keepDetailsPrivate/applicantPrivateDetailsConfirmedContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";

interface Start_alternativeContent {
  page: Page;
  accessibilityTest: boolean;
  startAlternativeYesNo: boolean;
}

export class ApplicantPrivateDetailsConfirmedPage {
  public static async privateDetailsConfirmedPage({
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
          hasText: ApplicantPrivateDetailsConfirmedContent.yesPageTitle,
        })
        .waitFor();
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${ApplicantPrivateDetailsConfirmedContent.yesSpan}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h2}:text-is("${ApplicantPrivateDetailsConfirmedContent.h2}")`,
          1,
        ),
        Helpers.checkGroup(
          page,
          2,
          ApplicantPrivateDetailsConfirmedContent,
          "p",
          Selectors.p,
        ),
        Helpers.checkGroup(
          page,
          3,
          ApplicantPrivateDetailsConfirmedContent,
          "li",
          Selectors.li,
        ),
      ]);
    } else {
      await page
        .locator(Selectors.h1, {
          hasText: ApplicantPrivateDetailsConfirmedContent.noPageTitle,
        })
        .waitFor();
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${ApplicantPrivateDetailsConfirmedContent.noSpan}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${ApplicantPrivateDetailsConfirmedContent.noP}")`,
          1,
        ),
      ]);
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
