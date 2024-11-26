import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Fl401ReviewDocuments1Content } from "../../../../fixtures/manageCases/caseProgression/reviewDocuments/fl401ReviewDocuments1Content";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";

interface FL401ReviewDocuments1PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

const dropDownId: string = "#reviewDocsDynamicList";

export class FL401ReviewDocuments1Page {
  public static async fl401ReviewDocuments1Page({
    page,
    accessibilityTest,
  }: FL401ReviewDocuments1PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<FL401ReviewDocuments1PageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${Fl401ReviewDocuments1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${Fl401ReviewDocuments1Content.h3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${Fl401ReviewDocuments1Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${Fl401ReviewDocuments1Content.label}")`,
        1,
      ),
    ]);
    // if (accessibilityTest) {
    //   await AccessibilityTestHelper.run(page);
    // }
  }

  private static async fillInFields({
    page,
  }: Partial<FL401ReviewDocuments1PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    await page.selectOption(dropDownId, { index: 1 });
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
