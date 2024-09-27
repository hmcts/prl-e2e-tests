import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { StatementOfTruthSummaryContent } from "../../../../../fixtures/manageCases/createCase/FL401/statementOfTruth/statementOfTruthSummaryContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { StatementOfTruth1Content } from "../../../../../fixtures/manageCases/createCase/FL401/statementOfTruth/statementOfTruth1Content";

interface StatementOfTruthSummaryPageOptions {
  page: Page;
  accessibilityTest: boolean;
  fl401YesNoToEverything: boolean;
}

interface CheckPageContentOptions {
  page: Page;
  accessibilityTest: boolean;
  fl401YesNoToEverything: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  fl401YesNoToEverything: boolean;
}

interface CheckFilledInDataOptions {
  page: Page;
  fl401YesNoToEverything: boolean;
}

enum uniqueSelectors {
  dtElements = "dt > ",
  thElements = "th > ",
  proceedingsText = "#case-viewer-field-read--otherProceedingsForSummaryTab > span > ccd-field-read > div > ccd-field-read-label > div > ccd-read-collection-field > table > tbody > tr > td > ccd-field-read > div > ccd-field-read-label > div > ccd-read-complex-field > ccd-read-complex-field-table > div > table > tbody > tr > td > span > ccd-field-read > div > ccd-field-read-label > div > ccd-read-text-field > ",
  proceedingsHeader = "#case-viewer-field-read--otherProceedingsForSummaryTab > span > ccd-field-read > div > ccd-field-read-label > div > ccd-read-collection-field > table > tbody > tr > td > ccd-field-read > div > ccd-field-read-label > div > ccd-read-complex-field > ccd-read-complex-field-table > div > table > tbody > tr > th > ",
}

export class StatementOfTruthSummaryPage {
  public static async statementOfTruthSummaryPage({
    page,
    accessibilityTest,
    fl401YesNoToEverything,
  }: StatementOfTruthSummaryPageOptions): Promise<void> {
    await this.checkPageContent({
      page,
      accessibilityTest,
      fl401YesNoToEverything,
    });
  }

  private static async checkPageContent({
    page,
    accessibilityTest,
    fl401YesNoToEverything,
  }: CheckPageContentOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${StatementOfTruthSummaryContent.h1}")`,
    );
    await Promise.all([
      this.checkPageLoads({ page, fl401YesNoToEverything }),
      this.checkFilledInFields({
        page,
        fl401YesNoToEverything,
      }),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkPageLoads({
    page,
    fl401YesNoToEverything,
  }: CheckPageLoadsOptions): Promise<void> {
    const headerCount: number = fl401YesNoToEverything ? 9 : 10;
    const dtCount: number = fl401YesNoToEverything ? 7 : 8;
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${StatementOfTruthSummaryContent.courtNavLabel}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        dtCount,
        StatementOfTruthSummaryContent,
        "dtElement",
        `${uniqueSelectors.dtElements}${Selectors.GovukText16}`,
      ),
      Helpers.checkGroup(
        page,
        headerCount,
        StatementOfTruthSummaryContent,
        "tableHeader",
        `${uniqueSelectors.thElements}${Selectors.GovukText16}`,
      ),
      Helpers.checkGroup(
        page,
        8,
        StatementOfTruthSummaryContent,
        "h2",
        `${Selectors.h2}`,
      ),
    ]);
    if (fl401YesNoToEverything) {
      await Promise.all([
        Helpers.checkGroup(
          page,
          2,
          StatementOfTruthSummaryContent,
          "proceedingHeader",
          `${Selectors.GovukText16}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.dtElements}${Selectors.GovukText16}:text-is("${StatementOfTruthSummaryContent.dtProceeding}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.proceedingsHeader}${Selectors.GovukText16}:text-is("${StatementOfTruthSummaryContent.numberHeader}")`,
          1,
        ),
      ]);
    }
  }

  private static async checkFilledInFields({
    page,
    fl401YesNoToEverything,
  }: CheckFilledInDataOptions): Promise<void> {
    const todayDate = new Date();
    const day = String(todayDate.getDate()).padStart(2, "0");
    const month = String(todayDate.getMonth() + 1).padStart(2, "0");
    const year = todayDate.getFullYear();
    const currentDate: string = `${day} ${month} ${year}`;
    const noticeText: string = fl401YesNoToEverything
      ? StatementOfTruthSummaryContent.withoutNotice
      : StatementOfTruthSummaryContent.withNotice;
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${StatementOfTruthSummaryContent.typeOfApplicationText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${currentDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${noticeText}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        StatementOfTruthSummaryContent,
        "filledText",
        `${Selectors.GovukText16}`,
      ),
    ]);
    if (fl401YesNoToEverything) {
      await Helpers.checkGroup(
        page,
        3,
        StatementOfTruthSummaryContent,
        "proceedingText",
        `${uniqueSelectors.proceedingsText}${Selectors.GovukText16}`,
      );
    }
  }
}
