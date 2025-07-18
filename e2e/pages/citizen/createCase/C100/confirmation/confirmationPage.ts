import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { ConfirmationContent } from "../../../../../fixtures/citizen/createCase/C100/confirmation/confirmationContent.ts";

interface ConfirmationPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class ConfirmationPage {
  public static async confirmationPage({
    page,
    accessibilityTest,
  }: ConfirmationPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ConfirmationPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page object ha not been found.");
    }
    const pageTitleVisible = page.locator(
      `${Selectors.GovukPanelTitle}:text-is("${ConfirmationContent.pageTitle}")`,
    );
    await pageTitleVisible.waitFor();
    await Helpers.checkCaseNumberRegex(page);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyL}:has-text("${ConfirmationContent.govukBodyL}")`,
        1,
      ),
      Helpers.checkGroup(page, 2, ConfirmationContent, "h2", Selectors.h2),
      Helpers.checkGroup(page, 3, ConfirmationContent, "p", Selectors.p),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukButton}:text-is("${ConfirmationContent.buttonDownloadApplication}")`,
        1,
      ),
      Helpers.checkGroup(page, 6, ConfirmationContent, "li", Selectors.li),
      Helpers.checkGroup(
        page,
        6,
        ConfirmationContent,
        "goukLink",
        Selectors.GovukLink,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${ConfirmationContent.h3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:has-text("${ConfirmationContent.govukBody}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:has-text("${ConfirmationContent.notificationBanner}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${ConfirmationContent.returnToDashboard}")`,
    );
  }
}
