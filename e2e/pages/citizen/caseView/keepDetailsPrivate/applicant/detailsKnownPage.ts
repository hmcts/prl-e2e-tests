import { Selectors } from "../../../../../common/selectors.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { yesNoDontKnow } from "../../../../../common/types.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { ApplicantDetailsKnownContent } from "../../../../../fixtures/citizen/caseView/keepDetailsPrivate/applicant/detailsKnownContent.ts";

enum UniqueSelectors {
  yes = "#detailsKnown",
  no = "#detailsKnown-2",
  iDontKnow = "#detailsKnown-3",
}

export class DetailsKnownPage {
  public static async ApplicantDetailsKnownPage(
    page: Page,
    accessibilityTest: boolean,
    yesNoDontKnow: yesNoDontKnow,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.applicantCheckPageLoads(page, accessibilityTest);
    await this.fillInFields(page, yesNoDontKnow);
  }

  public static async RespondentDetailsKnownPage(
    page: Page,
    accessibilityTest: boolean,
    yesNoDontKnow: yesNoDontKnow,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.RespondentCheckPageLoads(page, accessibilityTest);
    await this.fillInFields(page, yesNoDontKnow);
  }

  private static async applicantCheckPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: ApplicantDetailsKnownContent.applicantPageTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ApplicantDetailsKnownContent.span}")`,
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

  private static async RespondentCheckPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: ApplicantDetailsKnownContent.respondentPageTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ApplicantDetailsKnownContent.span}")`,
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
