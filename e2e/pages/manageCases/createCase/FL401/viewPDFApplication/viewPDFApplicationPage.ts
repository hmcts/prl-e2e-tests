import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ViewPDFApplicationContent } from "../../../../../fixtures/manageCases/createCase/FL401/viewPDFApplication/viewPDFApplicationContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

enum ids {
  mvDownBtn = "#mvDownBtn",
  numPages = "#numPages",
}

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
      page.waitForEvent("popup"),
      page.click(`${Selectors.a}:text-is("Draft_DA_application.pdf")`),
    ]);
    await pdfPage.waitForLoadState();

    await this.scrollToBottom(pdfPage);

    await this.checkApplicationData1(pdfPage);
    await pdfPage.close();
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async scrollToBottom(page: Page) {
    const numOfPagesLocator = page.locator(ids.numPages);
    await expect(numOfPagesLocator).not.toHaveText(/0/); // <- Wait for number of pages not to be 0 (i.e., page has loaded)

    const numOfPageText = await numOfPagesLocator.textContent();
    const numOfPages = parseInt(numOfPageText?.replace("/", "").trim(), 10); // <- numOfPageText is in format "/ 7", strip
    //                                                                             the '/' out and convert to int so can
    //                                                                             be used in loop
    for (let i = 0; i < numOfPages - 1; i++) {
      await page.click(ids.mvDownBtn);
    }
  }

  private static async checkApplicationData1(page: Page) {
    // noinspection TypeScriptValidateTypes
    await Promise.all([
      Helpers.checkGroup(
        page,
        66,
        ViewPDFApplicationContent,
        "applicationLabel",
        `${Selectors.Span}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.exampleNumber}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.yes}")`,
        27,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.infoToBeKeptConfidential}")`,
        6,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.exampleNumber2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.buckinghamPalace}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.london}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.bpPostcode}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.uk}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.dob}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.applicantRespondentSomeoneElse}")`,
        2,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {}
}
