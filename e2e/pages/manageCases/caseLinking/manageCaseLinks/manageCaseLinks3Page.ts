import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { ManageCaseLinks3Content } from "../../../../fixtures/manageCases/caseLinking/manageCaseLinks/manageCaseLinks3Content";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";

interface ManageCaseLinks3PageOptions {
  page: Page;
  linkedCaseNumber: string;
  accessibilityTest: boolean;
}

export class ManageCaseLinks3Page {
  public static async manageCaseLinks3Page({
    page,
    linkedCaseNumber,
    accessibilityTest,
  }: ManageCaseLinks3PageOptions): Promise<void> {
    linkedCaseNumber = Helpers.getHyphenatedCaseReference(linkedCaseNumber);
    await this.checkPageLoads({ page,
      linkedCaseNumber,
      accessibilityTest });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    linkedCaseNumber,
    accessibilityTest,
  }: Partial<ManageCaseLinks3PageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageCaseLinks3Content.pageTitle}")`,
    );
    await pageTitle.waitFor({ state: "visible" });
    await Helpers.checkGroup(
      page,
      2,
      ManageCaseLinks3Content,
      "tableCaption",
      Selectors.GovukTableCaption,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukTableHeader}:text-is("${ManageCaseLinks3Content.tableHeading1}")`,
      2,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukTableHeader}:text-is("${ManageCaseLinks3Content.tableHeading2}")`,
      1,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukTableCell}:has-text("${linkedCaseNumber}")`,
      1,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukLink}:has-text("${ManageCaseLinks3Content.changeLink}")`,
      1,
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
