import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { Noc1Content } from "../../../../fixtures/manageCases/caseProgression/noticeOfChange/noc1Content.ts";

enum UniqueSelectors {
  caseRefTextbox = "#caseRef",
}

export class Noc1Page {
  public static async noc1Page(
    page: Page,
    caseRef: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, caseRef);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: Noc1Content.govUkHeadingL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${Noc1Content.p}")`,
        1,
      ),
      Helpers.checkGroup(page, 2, Noc1Content, `li`, `${Selectors.li}`),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${Noc1Content.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${Noc1Content.govUkHint}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
    page: Page,
    caseRef: string,
  ): Promise<void> {
    await page.fill(UniqueSelectors.caseRefTextbox, caseRef);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
