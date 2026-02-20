import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { MiamGetDocContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamGetDocContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { AxeUtils } from "@hmcts/playwright-common";

interface MiamGetDocPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class MiamGetDocPage {
  public static async miamGetDocPage({
    page: page,
    accessibilityTest: accessibilityTest,
  }: MiamGetDocPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({ page: page });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: MiamGetDocPageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${MiamGetDocContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        MiamGetDocContent,
        `govukBody`,
        Selectors.GovukBody,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page: page,
  }: Partial<MiamGetDocPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page object not present.");
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.saveAndComeBackLater}")`,
    );
  }
}
