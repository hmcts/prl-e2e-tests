import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { HelpWithFeesContent } from "../../../../fixtures/citizen/caseView/requestMoreTime/helpWithFeesContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

enum UniqueSelectors {
  helpWithFeesYes = "#awp_need_hwf",
  helpWithFeesNo = "#awp_need_hwf-2",
}

export class HelpWithFeesPage {
  public static async helpWithFeesPage(
    page: Page,
    accessibilityTest: boolean,
    helpWithFees: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, helpWithFees);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukCaptionL, {
        hasText: HelpWithFeesContent.GovukCaptionL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${HelpWithFeesContent.GovukHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${HelpWithFeesContent.GovukLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${HelpWithFeesContent.GovukFieldsetLegend}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        HelpWithFeesContent,
        `GovukBodyM`,
        `${Selectors.GovukBodyM}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
    page: Page,
    helpWithFees: boolean,
  ): Promise<void>{
    if(helpWithFees) {
      await page.check(`${UniqueSelectors.helpWithFeesYes}`);
    }
    else {
      await page.check(`${UniqueSelectors.helpWithFeesNo}`);
    }
    await page.click(`${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,);
  }
}
