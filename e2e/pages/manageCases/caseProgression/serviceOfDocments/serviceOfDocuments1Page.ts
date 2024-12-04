import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { ServiceOfDocuments1Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfDocuments/serviceOfDocuments1Content";

interface serviceOfDocuments1Options {
  page: Page;
  accessibilityTest: boolean;
  withDoc: boolean;
}

enum UniqueSelectors {
  addAdditionalDocSelector = "#sodAdditionalDocumentsList_0",
  addNewButton1 = "#sodAdditionalDocumentsList",
  docList1Selector = "#sodDocumentsList_0_documentsList",
  docList2Selector = "#sodDocumentsList_1_documentsList",
}

export class ServiceOfDocuments1Page {
  public static async serviceOfDocuments1Page({
    page,
    accessibilityTest,
    withDoc,
  }: serviceOfDocuments1Options): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, withDoc });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<serviceOfDocuments1Options>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ServiceOfDocuments1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ServiceOfDocuments1Content,
        `h2`,
        `${Selectors.h2}`,
      ),
      Helpers.checkGroup(
        page,
        5,
        ServiceOfDocuments1Content,
        `formHint`,
        `${Selectors.GovukFormHint}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${ServiceOfDocuments1Content.h3}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    withDoc,
  }: Partial<serviceOfDocuments1Options>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    await page
      .locator(UniqueSelectors.addNewButton1)
      .getByRole("button", { name: "Add new" })
      .click();
    await page
      .locator(UniqueSelectors.addAdditionalDocSelector)
      .getByLabel("", { exact: true })
      .click();
    await page
      .locator(UniqueSelectors.addAdditionalDocSelector)
      .getByLabel("", { exact: true })
      .setInputFiles("testPdf.pdf");
    await page
      .getByLabel(ServiceOfDocuments1Content.formHint4)
      .selectOption("1: applications -> applicantDocuments -> applicant");
    if (withDoc) {
      await page.getByRole("button", { name: "Add new" }).nth(2).click(); //second add new button
      await page
        .locator(UniqueSelectors.docList2Selector)
        .selectOption("2: witnessStatementAndEvidence -> applicantStateme");
    }
  }
  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
