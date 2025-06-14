import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { ProceedingDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/otherProceedings/proceeding-detailsContent.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";

interface ProceedingDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
}

enum UniqueSelectors {
  op_courtProceedingsOrders1 = "#op_courtProceedingsOrders",
  op_courtProceedingsOrders2 = "#op_courtProceedingsOrders-2",
  op_courtProceedingsOrders3 = "#op_courtProceedingsOrders-3",
  op_courtProceedingsOrders4 = "#op_courtProceedingsOrders-4",
  op_courtProceedingsOrders5 = "#op_courtProceedingsOrders-5",
  op_courtProceedingsOrders6 = "#op_courtProceedingsOrders-6",
  op_courtProceedingsOrders7 = "#op_courtProceedingsOrders-7",
  op_courtProceedingsOrders8 = "#op_courtProceedingsOrders-8",
  op_courtProceedingsOrders9 = "#op_courtProceedingsOrders-9",
  op_courtProceedingsOrders10 = "#op_courtProceedingsOrders-10",
  op_courtProceedingsOrders11 = "#op_courtProceedingsOrders-11",
  op_courtProceedingsOrders12 = "#op_courtProceedingsOrders-12",
  op_courtProceedingsOrders13 = "#op_courtProceedingsOrders-13",
  op_courtProceedingsOrders14 = "#op_courtProceedingsOrders-14",
  op_courtProceedingsOrders15 = "#op_courtProceedingsOrders-15",
  op_courtProceedingsOrders16 = "#op_courtProceedingsOrders-16",
}

export class ProceedingDetailsPage {
  public static async proceedingDetailsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: ProceedingDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ProceedingDetailsContent.h1}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ProceedingDetailsContent,
        "formHint",
        `${Selectors.GovukHint}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ProceedingDetailsContent.repeatedFormHint}")`,
        3,
      ),
      Helpers.checkGroup(
        page,
        16,
        ProceedingDetailsContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${ProceedingDetailsContent.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ProceedingDetailsContent.errorMessageSpecifyWhichCourt}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ProceedingDetailsContent.errorMessageSpecifyWhichCourt}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
  }: fillInFieldsOptions): Promise<void> {
    for (const selector of Object.values(UniqueSelectors)) {
      await page.click(selector);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
