import { Page } from "@playwright/test";
import { Noc2Content } from "../../../../fixtures/manageCases/caseProgression/noticeOfChange/noc2Content.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../../../common/helpers.ts";

enum UniqueSelectors {
  nocClientFirstName = "#NoCChallengeQ1",
  nocClientLastName = "#NoCChallengeQ2",
}

export class Noc2Page {
  public static async noc2Page(
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
        hasText: Noc2Content.govUkHeadingL,
      })
      .waitFor();
    await Promise.all([
      page.locator(Selectors.p, { hasText: Noc2Content.p }),
      Helpers.checkGroup(
        page,
        2,
        Noc2Content,
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
        Noc2Content.applicantFirstName,
      );
      await page.fill(
        UniqueSelectors.nocClientLastName,
        Noc2Content.applicantLastName,
      );
    } else {
      await page.fill(
        UniqueSelectors.nocClientFirstName,
        Noc2Content.respondentFirstName,
      );
      await page.fill(
        UniqueSelectors.nocClientLastName,
        Noc2Content.respondentLastName,
      );
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
