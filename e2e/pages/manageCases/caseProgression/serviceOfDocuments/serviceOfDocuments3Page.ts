import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { ServiceOfDocuments3Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfDocuments/serviceOfDocuments3Content";

interface serviceOfDocuments3Options {
  page: Page;
  accessibilityTest: boolean;
  checkDocuments: boolean;
}
enum UniqueSelectors {
  managerCheckDocSelector = "#sodDocumentsCheckOptions-managerCheck",
  noCheckDocSelector = "#sodDocumentsCheckOptions-noCheck",
}

export class ServiceOfDocuments3Page {
  public static async serviceOfDocuments3Page({
    page,
    accessibilityTest,
    checkDocuments,
  }: serviceOfDocuments3Options): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, checkDocuments });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<serviceOfDocuments3Options>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ServiceOfDocuments3Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        ServiceOfDocuments3Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    checkDocuments,
  }: Partial<serviceOfDocuments3Options>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    if (checkDocuments) {
      await page.click(UniqueSelectors.managerCheckDocSelector);
    } else {
      await page.click(UniqueSelectors.noCheckDocSelector);
    }
  }
  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
