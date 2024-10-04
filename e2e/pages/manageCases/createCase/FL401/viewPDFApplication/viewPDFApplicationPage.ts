import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ViewPDFApplicationContent } from "../../../../../fixtures/manageCases/createCase/FL401/viewPDFApplication/viewPDFApplicationContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { viewPdfTestCases } from "../../../../../common/types";

enum ids {
  mvDownBtn = "#mvDownBtn",
  numPages = "#numPages",
}

export class ViewPDFApplicationPage {
  public static async viewPDFApplicationPage(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    viewPdfTestCases: viewPdfTestCases,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest, viewPdfTestCases);
    await this.fillInFields(page, accessibilityTest);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    viewPdfTestCases: viewPdfTestCases,
  ): Promise<void> {
    // noinspection TypeScriptValidateTypes
    const [pdfPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.click(
        `${Selectors.a}:text-is("${ViewPDFApplicationContent.pdfName}")`,
      ),
    ]);
    await pdfPage.waitForLoadState();

    await this.scrollToBottom(pdfPage);

    switch (viewPdfTestCases) {
      case "1":
        await this.checkCommonData(pdfPage);
        await this.checkApplicationData1(pdfPage);
        break;
      case "2":
        await this.checkCommonData(pdfPage);
        await this.checkApplicationData2(pdfPage);
        break;
      case "3":
        await this.checkApplicationData3(pdfPage);
        break;
      default:
        console.log(
          `Unexpected value for viewPdfTestCases: ${viewPdfTestCases}`,
        );
        break;
    }

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

  private static async checkCommonData(page: Page) {
    // noinspection TypeScriptValidateTypes
    await Promise.all([
      Helpers.checkGroup(
        page,
        62,
        ViewPDFApplicationContent,
        "applicationLabel",
        `${Selectors.Span}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedLabel1}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedLabel2}")`,
        6,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedLabel3}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedLabel4}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedLabel5}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.yes}")`,
        27,
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
    ]);
  }

  private static async checkApplicationData1(page: Page) {
    await Helpers.checkGroup(
      page,
      4,
      ViewPDFApplicationContent,
      "testCase1Label",
      `${Selectors.Span}`,
    );
  }

  private static async checkApplicationData2(page: Page) {
    await Helpers.checkGroup(
      page,
      4,
      ViewPDFApplicationContent,
      "testCase2Label",
      `${Selectors.Span}`,
    );
  }

  private static async checkApplicationData3(page: Page) {
    // noinspection TypeScriptValidateTypes
    await Promise.all([
      Helpers.checkGroup(
        page,
        26,
        ViewPDFApplicationContent,
        "testCase3Label",
        `${Selectors.Span}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.no}")`,
        23,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.buckinghamPalace}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.london}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.bpPostcode}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.uk}")`,
        3,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {}
}
