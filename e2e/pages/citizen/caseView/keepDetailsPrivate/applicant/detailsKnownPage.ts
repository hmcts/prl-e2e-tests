import { Selectors } from "../../../../../common/selectors";
import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { yesNoDontKnow } from "../../../../../common/types";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { DetailsKnownContent } from "../../../../../fixtures/citizen/caseView/keepDetailsPrivate/detailsKnownContent";

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
        hasText: DetailsKnownContent.applicantPageTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${DetailsKnownContent.span}")`,
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
      await new AxeUtils(page).audit();
    }
  }

  private static async RespondentCheckPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: DetailsKnownContent.respondentPageTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${DetailsKnownContent.span}")`,
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
      await new AxeUtils(page).audit();
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
