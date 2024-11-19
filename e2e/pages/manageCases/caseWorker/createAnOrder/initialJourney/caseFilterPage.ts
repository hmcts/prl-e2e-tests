import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CaseFilterContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/initialJourney/caseFilterContent";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";

enum UniqueSelectors {
  jurisdiction = "#cc-jurisdiction",
  caseType = "#cc-case-type",
  event = "#cc-event",
}

export class CaseFilterPage {
  public static async caseFilterPage(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingXL}:text-is(${CaseFilterContent.pageTitle})`,
    );
    await pageTitle.waitFor();
    await Helpers.checkGroup(
      page,
      3,
      CaseFilterContent,
      "formLabel",
      Selectors.GovukFormLabel,
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.selectOption(
      UniqueSelectors.jurisdiction,
      CaseFilterContent.fpl,
    );
    await page.selectOption(
      UniqueSelectors.caseType,
      CaseFilterContent.caseType,
    );
    await page.selectOption(UniqueSelectors.event, CaseFilterContent.event);
    await page.click(
      `${Selectors.button}:text-is(${CaseFilterContent.startButton})`,
    );
  }
}
