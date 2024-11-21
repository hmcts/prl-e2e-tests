import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ManageOrders24Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders24Content";

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
      `${Selectors.h1}:text-is("${ManageOrders1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ManageOrders24Content.span}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        ManageOrders24Content,
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
      ManageOrders24Content.judgeName,
    );
    await page.click(
      `${hiddenSelectors.judgeName}:text-is("${ManageOrders24Content.JudgeNameToSelect}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }

  private static async initialHiddenFormLabels(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ManageOrders24Content.hiddenSpan}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ManageOrders24Content,
        "hiddenFormLabel",
        Selectors.GovukFormLabel,
      ),
    ]);
  }

  private static async SecondaryHiddenFormLabels(page: Page): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.Span}:text-is("${ManageOrders24Content.secondaryHiddenSpan}"):visible`,
      1,
    );
  }
}
