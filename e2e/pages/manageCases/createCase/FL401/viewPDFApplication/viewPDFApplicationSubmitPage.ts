import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../../common/selectors";
import { SubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/viewPDFApplication/submitContent";

export class ViewPDFApplicationSubmitPage {
  public static async viewPDFApplicationSubmitPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageContent(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageContent(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([this.checkPageLoads(page)]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkPageLoads(page: Page): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${SubmitContent.pageTitle}")`,
    );
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SubmitContent.saveAndContinue}")`,
    );
  }
}
