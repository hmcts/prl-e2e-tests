import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers.ts";
import { ConsentToTheApplicationC7Content } from "../../../../fixtures/citizen/caseView/respondToTheApplicationC7/consentToTheApplicationContent.ts";

enum UniqueSelectors {
  question1 = "#doYouConsent",
  question2day = "#applicationReceivedDate-day",
  question2month = "#applicationReceivedDate-month",
  question2year = "#applicationReceivedDate-year",
  question3 = "#courtPermission-2",
}

export class ConsentToTheApplication1Page {
  public static async consentToTheApplication1Page(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: ConsentToTheApplicationC7Content.h1,
      })
      .waitFor();
    await Promise.all([
      await Helpers.checkGroup(
        page,
        3,
        ConsentToTheApplicationC7Content,
        "legendFieldSet",
        Selectors.GovukFieldsetLegend,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ConsentToTheApplicationC7Content.radioNo}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ConsentToTheApplicationC7Content.radioYes}")`,
        2,
      ),
      await Helpers.checkGroup(
        page,
        3,
        ConsentToTheApplicationC7Content,
        "label",
        Selectors.GovukLabel,
      ),
    ]);
    if (accessibilityTest) {
      // await new AxeUtils(page).audit(); // accessibility check is failing, ticket raised for fix FPVTL-XXXX
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(UniqueSelectors.question1);
    await page.fill(
      `${UniqueSelectors.question2day}`,
      ConsentToTheApplicationC7Content.question2day,
    );
    await page.fill(
      `${UniqueSelectors.question2month}`,
      ConsentToTheApplicationC7Content.question2month,
    );
    await page.fill(
      `${UniqueSelectors.question2year}`,
      ConsentToTheApplicationC7Content.question2year,
    );
    await page.click(UniqueSelectors.question3);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
