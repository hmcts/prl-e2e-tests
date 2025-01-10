import { Details_knownContent } from "../../../../../fixtures/citizen/caseView/keepDetailsPrivate/applicant/details_knownContent.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { yesNoDontKnow } from "../../../../../common/types.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";

enum UniqueSelectors {
  yes = "#detailsKnown",
  no = "#detailsKnown-2",
  iDontKnow = "#detailsKnown-3",
}

export class DetailsKnownPage {
  public static async details_knownPage(
    page: Page,
    accessibilityTest: boolean,
    yesNoDontKnow: yesNoDontKnow,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, yesNoDontKnow);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: Details_knownContent.pageTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${Details_knownContent.span}")`,
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
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.iDontKnow}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
    page: Page,
    yesNoDontKnow: yesNoDontKnow,
  ): Promise<void> {
    if (yesNoDontKnow === "yes") {
      await page.click(UniqueSelectors.yes);
    } else if (yesNoDontKnow === "no") {
      await page.click(UniqueSelectors.no);
    } else if (yesNoDontKnow === "dontKnow") {
      await page.click(UniqueSelectors.iDontKnow);
    } else {
      throw new Error("Invalid value for yesNoDontKnow");
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
