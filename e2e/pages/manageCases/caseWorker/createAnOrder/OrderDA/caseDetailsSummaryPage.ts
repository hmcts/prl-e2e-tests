import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { CaseDetailsSummaryContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/caseDetailsSummaryContent";

interface CaseDetailsSummaryPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  nextStepDropDown = "#next-step",
}

export class CaseDetailsSummaryPage {
  public static async caseDetailsSummaryPage({
    page,
    accessibilityTest,
  }: CaseDetailsSummaryPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<CaseDetailsSummaryPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await Promise.all([
      Helpers.checkGroup(
        page,
        8,
        CaseDetailsSummaryContent,
        "h2",
        Selectors.h2,
      ),
      Helpers.checkGroup(
        page,
        12,
        CaseDetailsSummaryContent,
        "text16",
        Selectors.GovukText16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${CaseDetailsSummaryContent.text16DateSubmitted}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${CaseDetailsSummaryContent.text16TypeOfApplication}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${CaseDetailsSummaryContent.text16CaseStatus}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.selectOption(
      UniqueSelectors.nextStepDropDown,
      CaseDetailsSummaryContent.manageOrders,
    );
    await page.click(
      `${Selectors.button}:text-is("${CaseDetailsSummaryContent.go}")`,
    );
  }
}
