import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ViewPDFApplicationContent } from "../../../../../fixtures/manageCases/createCase/FL401/viewPDFApplication/viewPDFApplicationContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

export class ViewPDFApplicationPage {
  public static async viewPDFApplicationPage(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, accessibilityTest);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    // noinspection TypeScriptValidateTypes
    const [pdfPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.click(`${Selectors.a}:text-is("Draft_DA_application.pdf")`),
    ]);

    await pdfPage.waitForLoadState();

    await Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("Do you want to apply for the order without")`,
        1,
    );
    await pdfPage.close();
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {}
}
