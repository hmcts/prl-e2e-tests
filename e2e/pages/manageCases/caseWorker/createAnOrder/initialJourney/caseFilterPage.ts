import { Page } from "@playwright/test";
// import { AxeUtils } from "@hmcts/playwright-common";
import { CaseFilterContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/initialJourney/caseFilterContent";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";

interface CaseFilterPageOptions {
  page: Page;
  accessibilityTest: boolean;
}
enum UniqueSelectors {
  jurisdiction = "#cc-jurisdiction",
  caseType = "#cc-case-type",
  event = "#cc-event",
}

export class CaseFilterPage {
  public static async caseFilterPage({
    page,
    accessibilityTest,
  }: CaseFilterPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<CaseFilterPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${CaseFilterContent.pageTitle}")`,
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
      // await new AxeUtils(page).audit();
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
      `${Selectors.button}:text-is("${CaseFilterContent.startButton}")`,
    );
  }
}
