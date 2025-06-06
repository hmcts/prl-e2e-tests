import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CaseDetailsSummaryDAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/caseDetailsSummaryDAContent.ts";

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
        CaseDetailsSummaryDAContent,
        "h2",
        Selectors.h2,
      ),
      Helpers.checkGroup(
        page,
        12,
        CaseDetailsSummaryDAContent,
        "text16",
        Selectors.GovukText16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${CaseDetailsSummaryDAContent.text16DateSubmitted}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${CaseDetailsSummaryDAContent.text16TypeOfApplication}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${CaseDetailsSummaryDAContent.text16CaseStatus}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.selectOption(
      UniqueSelectors.nextStepDropDown,
      CaseDetailsSummaryDAContent.manageOrders,
    );
    await page.click(
      `${Selectors.button}:text-is("${CaseDetailsSummaryDAContent.go}")`,
    );
  }
}
