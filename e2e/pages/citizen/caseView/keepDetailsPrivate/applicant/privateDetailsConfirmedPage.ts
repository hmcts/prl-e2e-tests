import { Helpers } from "../../../../../common/helpers.ts";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { PrivateDetailsConfirmedContent } from "../../../../../fixtures/citizen/caseView/keepDetailsPrivate/privateDetailsConfirmedContent.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";

interface Start_alternativeContent {
  page: Page;
  accessibilityTest: boolean;
  startAlternativeYesNo: boolean;
  isApplicant: boolean;
}

export class ApplicantPrivateDetailsConfirmedPage {
  public static async privateDetailsConfirmedPage({
    page,
    accessibilityTest,
    startAlternativeYesNo,
    isApplicant,
  }: Start_alternativeContent): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      startAlternativeYesNo,
      isApplicant,
    });
    await this.fillInFields({ page, isApplicant });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    startAlternativeYesNo,
    isApplicant,
  }: Start_alternativeContent): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    if (startAlternativeYesNo) {
      await page
        .locator(Selectors.GovukFieldsetHeading, {
          hasText: PrivateDetailsConfirmedContent.yesPageTitle,
        })
        .waitFor();
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${PrivateDetailsConfirmedContent.yesSpan}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h2}:text-is("${PrivateDetailsConfirmedContent.h2}")`,
          1,
        ),
        Helpers.checkGroup(
          page,
          2,
          PrivateDetailsConfirmedContent,
          "p",
          Selectors.p,
        ),
      ]);
      if (isApplicant) {
        await Helpers.checkGroup(
          page,
          3,
          PrivateDetailsConfirmedContent,
          "applicantLi",
          Selectors.li,
        );
      } else {
        await Helpers.checkGroup(
          page,
          3,
          PrivateDetailsConfirmedContent,
          "respondentLi",
          Selectors.li,
        );
      }
    } else {
      await page
        .locator(Selectors.h1, {
          hasText: PrivateDetailsConfirmedContent.noPageTitle,
        })
        .waitFor();
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${PrivateDetailsConfirmedContent.noSpan}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${PrivateDetailsConfirmedContent.noP}")`,
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
    isApplicant,
  }: Partial<Start_alternativeContent>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    if (isApplicant) {
      await page.click(
        `${Selectors.GovukButton}:text-is("${CommonStaticText.saveAndContinue}")`,
      );
    } else {
      await page.click(
        `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
      );
    }
  }
}
