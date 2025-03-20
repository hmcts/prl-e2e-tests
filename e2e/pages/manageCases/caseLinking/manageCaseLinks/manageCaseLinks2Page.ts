import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { ManageCaseLinks2Content } from "../../../../fixtures/manageCases/caseLinking/manageCaseLinks/manageCaseLinks2Conent";
import { Helpers } from "../../../../common/helpers";
// import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";

interface ManageCaseLinks2PageOptions {
  page: Page;
  linkedCaseNumber: string;
  accessibilityTest: boolean;
}

export class ManageCaseLinks2Page {
  public static async manageCaseLinks2Page({
    page,
    linkedCaseNumber,
    accessibilityTest,
  }: ManageCaseLinks2PageOptions): Promise<void> {
    linkedCaseNumber = Helpers.getHyphenatedCaseReference(linkedCaseNumber);
    await this.checkPageLoads({
      page,
      linkedCaseNumber,
      accessibilityTest,
    });
    await this.fillInFields({ page, linkedCaseNumber });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    linkedCaseNumber,
    accessibilityTest,
  }: Partial<ManageCaseLinks2PageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageCaseLinks2Content.h1}")`,
    );
    await pageTitle.waitFor({ state: "visible" });
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukLabel}:has-text("${linkedCaseNumber}")`,
      1,
    );
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page); //#TODO: Awaiting for accessibility ticket FPVTL-337 to be resolved
    }
  }

  private static async fillInFields({
    page,
    linkedCaseNumber,
  }: Partial<ManageCaseLinks2PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    if (!linkedCaseNumber) {
      throw new Error("Cannot unlink case without the linked case number");
    }
    await page
      .locator(`//div[label[contains(text(), "${linkedCaseNumber}")]]/input`)
      .check();
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
