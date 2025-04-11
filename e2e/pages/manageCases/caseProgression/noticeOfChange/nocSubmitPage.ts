import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { NocSubmitContent } from "../../../../fixtures/manageCases/caseProgression/noticeOfChange/nocSubmitContent.ts";
import { solicitorCaseCreateType } from "../../../../common/types.ts";

enum UniqueSelectors {
  detailsAccurateCheckbox = "#affirmation",
  notifyEveryPartyCheckbox = "#notifyEveryParty",
}

export class NocSubmitPage {
  public static async nocSubmitPage(
    page: Page,
    caseType: solicitorCaseCreateType,
    isApplicant: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, caseType, isApplicant, accessibilityTest);
    await this.fillInfields(page);
    await this.submit(page);
  }

  private static async checkPageLoads(
    page: Page,
    caseType: solicitorCaseCreateType,
    isApplicant: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: NocSubmitContent.govUkHeadingL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        4,
        NocSubmitContent,
        `govUkSummaryListKey`,
        `${Selectors.GovukSummaryListKey}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${NocSubmitContent.govUkSummaryListValue1}")`,
        1,
      ),
      Helpers.checkGroup(page, 2, NocSubmitContent, `p`, `${Selectors.p}`),
      Helpers.checkGroup(page, 2, NocSubmitContent, `li`, `${Selectors.li}`),
      Helpers.checkGroup(
        page,
        2,
        NocSubmitContent,
        `govUkLabel`,
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${NocSubmitContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${NocSubmitContent.govUkInsetText}")`,
        1,
      ),
    ]);
    if (isApplicant) {
      if (caseType === "C100") {
        await Helpers.checkGroup(
          page,
          2,
          NocSubmitContent,
          `c100ApplicantGovSummaryListValue`,
          `${Selectors.GovukSummaryListValue}`,
        );
      } else {
        await Helpers.checkGroup(
          page,
          2,
          NocSubmitContent,
          `fl401ApplicantGovSummaryListValue`,
          `${Selectors.GovukSummaryListValue}`,
        );
      }
    } else {
      if (caseType === "C100") {
        await Helpers.checkGroup(
          page,
          2,
          NocSubmitContent,
          `c100RespondentGovSummaryListValue`,
          `${Selectors.GovukSummaryListValue}`,
        );
      } else {
        await Helpers.checkGroup(
          page,
          2,
          NocSubmitContent,
          `fl401RespondentGovSummaryListValue`,
          `${Selectors.GovukSummaryListValue}`,
        );
      }
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInfields(page: Page): Promise<void> {
    await page.check(UniqueSelectors.detailsAccurateCheckbox);
    await page.check(UniqueSelectors.notifyEveryPartyCheckbox);
  }

  private static async submit(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
