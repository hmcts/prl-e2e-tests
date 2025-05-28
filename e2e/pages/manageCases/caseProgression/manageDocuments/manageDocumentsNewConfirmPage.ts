import { Page } from "@playwright/test";
import { ManageDocumentsNewConfirmContent } from "../../../../fixtures/manageCases/caseProgression/manageDocuments/manageDocumentsNewConfirmContent.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface ManageDocumentsNewConfirmPageParams {
  page: Page;
  accessibilityTest: boolean;
}

export class ManageDocumentsNewConfirmPage {
  public static async manageDocumentsNewConfirmPage({
    page,
    accessibilityTest,
  }: ManageDocumentsNewConfirmPageParams): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.closeAndReturnToCase(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ManageDocumentsNewConfirmPageParams>) {
    if (!page) {
      throw new Error("No page found");
    }
    const confirmationHeader = page.locator("#confirmation-header", {
      hasText: `${ManageDocumentsNewConfirmContent.confirmationHeader}`,
    });

    await confirmationHeader.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH1}:text-is("${ManageDocumentsNewConfirmContent.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${ManageDocumentsNewConfirmContent.h3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ManageDocumentsNewConfirmContent.p}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async closeAndReturnToCase(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.closeAndReturnToCaseDetails}")`,
    );
  }
}
