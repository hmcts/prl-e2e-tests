import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { MiamUploadConfirmationContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamUploadConfirmationContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { AxeUtils } from "@hmcts/playwright-common";

interface MiamUploadConfirmationPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class MiamUploadConfirmationPage {
  public static async miamUploadConfirmationPage({
    page: page,
    accessibilityTest: accessibilityTest,
  }: MiamUploadConfirmationPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({ page: page });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: MiamUploadConfirmationPageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h3}:text-is("${MiamUploadConfirmationContent.h3}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingXL}:text-is("${MiamUploadConfirmationContent.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${MiamUploadConfirmationContent.h2}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page: page,
  }: Partial<MiamUploadConfirmationPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
