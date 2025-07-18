import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { StatementOfTruth3Content } from "../../../../../fixtures/manageCases/createCase/FL401/statementOfTruth/statementOfTruth3Content.ts";

enum inputIDs {
  courtSelection = "#submitCountyCourtSelection",
}

interface StatementOfTruth3PageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class StatementOfTruth3Page {
  public static async statementOfTruth3Page({
    page,
    accessibilityTest,
    errorMessaging,
  }: StatementOfTruth3PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${StatementOfTruth3Content.h1}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${StatementOfTruth3Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${StatementOfTruth3Content.formLabel1}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      // await new AxeUtils(page).audit(); #TODO: Re-enable when EXUI-2721 is fixed.
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${StatementOfTruth3Content.submit}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${StatementOfTruth3Content.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${StatementOfTruth3Content.errorValidation}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${StatementOfTruth3Content.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.selectOption(inputIDs.courtSelection, { index: 1 });
    await page.click(
      `${Selectors.button}:text-is("${StatementOfTruth3Content.submit}")`,
    );
  }
}
