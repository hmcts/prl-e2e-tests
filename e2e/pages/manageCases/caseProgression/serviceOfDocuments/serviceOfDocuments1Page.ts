import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { ServiceOfDocuments1Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfDocuments/serviceOfDocuments1Content";
import path from "path";

interface serviceOfDocuments1Options {
  page: Page;
  accessibilityTest: boolean;
  additionalDoc: boolean;
  withCaseDoc: boolean;
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
    additionalDoc,
    withCaseDoc,
  }: serviceOfDocuments1Options): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      additionalDoc,
      withCaseDoc,
    });
    await this.fillInFields({ page, withCaseDoc, additionalDoc });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
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
        `${Selectors.headingH2}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        ServiceOfDocuments1Content,
        `p`,
        `${Selectors.p}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${ServiceOfDocuments1Content.h3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${ServiceOfDocuments1Content.formHint}")`,
        1,
      ),
    ]);
    // if (accessibilityTest) {
    //   await new AxeUtils(page).audit(); #TODO Enable after resolving FPET-1225
    // }
  }

  private static async fillInFields({
    page,
    additionalDoc,
    withCaseDoc,
  }: Partial<serviceOfDocuments1Options>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    if (additionalDoc) {
      await this.handleAdditionalDoc(page);
    }
    await page
      .getByLabel(ServiceOfDocuments1Content.formLabel1)
      .selectOption("1: applications -> applicantDocuments -> applicant");

    if (withCaseDoc) {
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

  private static async handleAdditionalDoc(page: Page): Promise<void> {
    await page
      .locator(UniqueSelectors.addNewButton1)
      .getByRole("button", { name: "Add new" })
      .click();
    await page
      .locator(UniqueSelectors.addAdditionalDocSelector)
      .getByLabel("", { exact: true })
      .setInputFiles(
        path.resolve(__dirname, "../../../../assets/mockFile.pdf"),
      );
  }
}
