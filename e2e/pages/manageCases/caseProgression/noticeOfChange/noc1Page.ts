import { Page } from "@playwright/test";
import { Noc1Content } from "../../../../fixtures/manageCases/caseProgression/noticeOfChange/noc1Content.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../../../common/helpers.ts";

enum UniqueSelectors {
  nocClientFirstName = "#NoCChallengeQ1",
  nocClientLastName = "#NoCChallengeQ2",
}

export class Noc1Page {
  public static async noc1Page(
    page: Page,
    isApplicant: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInfields(page, isApplicant);
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
      Helpers.checkGroup(
        page,
        2,
        Noc1Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInfields(
    page: Page,
    isApplicant: boolean,
  ): Promise<void> {
    if (isApplicant) {
      await page.fill(
        UniqueSelectors.nocClientFirstName,
        Noc1Content.applicantFirstName,
      );
      await page.fill(
        UniqueSelectors.nocClientLastName,
        Noc1Content.applicantLastName,
      );
    } else {
      await page.fill(
        UniqueSelectors.nocClientFirstName,
        Noc1Content.respondentFirstName,
      );
      await page.fill(
        UniqueSelectors.nocClientLastName,
        Noc1Content.respondentLastName,
      );
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
