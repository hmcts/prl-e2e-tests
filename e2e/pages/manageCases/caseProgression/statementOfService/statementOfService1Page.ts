import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { StatementOfService1Content } from "../../../../fixtures/manageCases/caseProgression/statementOfService/statementOfService1Content.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
// import { AxeUtils } from "@hmcts/playwright-common";

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
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${StatementOfService1Content.recipientH2H3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${StatementOfService1Content.recipientH2H3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${StatementOfService1Content.formHint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${StatementOfService1Content.strong}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${StatementOfService1Content.formLabelWhoWasServed}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${StatementOfService1Content.formLabelWhenWereTheyServed}"):visible`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        StatementOfService1Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkGroup(page, 2, StatementOfService1Content, "p", Selectors.p),
    ]);
    if (accessibilityTest) {
      // await new AxeUtils(page).audit(); //#TODO turn back on once EXUI-2724 is resolved
    }
  }

  private static async fillInFields({
    page,
  }: Partial<StatementOfService1PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    await page.click(UniqueSelectors.applicationPack);
    await page.selectOption(UniqueSelectors.whoWasServedDropDown, { index: 1 });
    await page.fill(
      UniqueSelectors.inputSpecificDate,
      StatementOfService1Content.date,
    );
    const fileUpload = page.locator(UniqueSelectors.fileUpload);
    await fileUpload.setInputFiles(config.testPdfFile);
    await page.waitForTimeout(5000);
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
