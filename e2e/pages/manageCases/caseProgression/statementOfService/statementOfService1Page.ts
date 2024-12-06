import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { CommonStaticText } from "../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { StatementOfService1Content } from "../../../../fixtures/manageCases/caseProgression/statementOfService/statementOfService1Content";

interface StatementOfService1PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  applicationPack = "#stmtOfServiceWhatWasServed-statementOfServiceApplicationPack",
  order = "#stmtOfServiceWhatWasServed-statementOfServiceOrder",
  whoWasServedDropDown = "#stmtOfServiceAddRecipient_0_respondentDynamicList",
  inputSpecificDate = ".datepicker-container > .mat-datepicker-input:visible",
  fileUpload = "#stmtOfServiceAddRecipient_0_stmtOfServiceDocument",
}

export class StatementOfService1Page {
  public static async statementOfService1Page({
    page,
    accessibilityTest,
  }: StatementOfService1PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<StatementOfService1PageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${StatementOfService1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<StatementOfService1PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
