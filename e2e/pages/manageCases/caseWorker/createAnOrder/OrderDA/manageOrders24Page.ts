import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1DAContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ManageOrders24DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders24DAContent";
import { CommonContent } from "../../../../../fixtures/manageCases/commonContent";

interface ManageOrders24PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  judge = "#amendOrderSelectCheckOptions-judgeOrLegalAdvisorCheck",
  manager = "#amendOrderSelectCheckOptions-managerCheck",
  noChecks = "#amendOrderSelectCheckOptions-noCheck",
}
enum hiddenSelectors {
  judge = "#amendOrderSelectJudgeOrLa-judge",
  legalAdvisor = "#amendOrderSelectJudgeOrLa-legalAdvisor",
  judgeNameInput = "#nameOfJudgeToReviewOrder",
  judgeName = ".mat-option-text",
}

export class ManageOrders24Page {
  public static async manageOrders24Page({
    page,
    accessibilityTest,
  }: ManageOrders24PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({
      page,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ManageOrders24PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1DAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ManageOrders24DAContent.span}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        ManageOrders24DAContent,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<ManageOrders24PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.click(`${UniqueSelectors.judge}`);
    await this.initialHiddenFormLabels(page);
    await page.click(`${hiddenSelectors.judge}`);
    await this.SecondaryHiddenFormLabels(page);
    await page.fill(
      `${hiddenSelectors.judgeNameInput}`,
      CommonContent.judgeName,
    );
    await page.click(
      `${hiddenSelectors.judgeName}:text-is("${CommonContent.judgeNameAndEmail}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }

  private static async initialHiddenFormLabels(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ManageOrders24DAContent.hiddenSpan}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ManageOrders24DAContent,
        "hiddenFormLabel",
        Selectors.GovukFormLabel,
      ),
    ]);
  }

  private static async SecondaryHiddenFormLabels(page: Page): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.Span}:text-is("${ManageOrders24DAContent.secondaryHiddenSpan}"):visible`,
      1,
    );
  }
}
