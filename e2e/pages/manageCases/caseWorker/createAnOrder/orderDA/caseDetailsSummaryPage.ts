import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { CaseDetailsSummaryDAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/caseDetailsSummaryDAContent";

interface CaseDetailsSummaryPageOptions {
  page: Page;
  accessibilityTest: boolean;
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
    await Helpers.chooseEventFromDropdown(page, "Manage orders");
  }
}
