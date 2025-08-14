import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers.js";
import { C100ListOnNotice1Content } from "../../../../fixtures/manageCases/caseProgression/List/C100ListOnNotice1Content.js";

enum UniqueSelectors {
  selectedReasonsForListOnNoticeCheckbox = "#selectedReasonsForListOnNotice-noEvidenceOfImmediateRiskOfHarmToTheChildren",
}

export class C100ListOnNotice1Page {
  public static async c100ListOnNotice1Page(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${C100ListOnNotice1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();

    await Promise.all([
      Helpers.checkGroup(
        page,
        8,
        C100ListOnNotice1Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
    ]);

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.check(UniqueSelectors.selectedReasonsForListOnNoticeCheckbox);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
