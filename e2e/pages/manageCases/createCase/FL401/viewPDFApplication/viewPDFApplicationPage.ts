import { expect, Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { Language, ViewPdfTestCases } from "../../../../../common/types";
import { ViewPDFApplicationContent } from "../../../../../fixtures/manageCases/createCase/FL401/viewPDFApplication/viewPDFApplicationContent";

enum ids {
  mvDownBtn = "#mvDownBtn",
  numPages = "#numPages",
}

export class ViewPDFApplicationPage {
  public static async viewPDFApplicationPage(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    viewPdfTestCases: ViewPdfTestCases,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest, viewPdfTestCases);
    await this.fillInFields(page, accessibilityTest);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    viewPdfTestCases: ViewPdfTestCases,
  ): Promise<void> {
    await this.checkEnglishPdf(page, viewPdfTestCases);
    if (viewPdfTestCases !== "3") {
      await this.checkWelshPdf(page, viewPdfTestCases);
    }

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async openMediaViewer(page: Page, language: Language) {
    const [pdfPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.click(
        `${Selectors.a}:text-is("${language === "English" ? ViewPDFApplicationContent.pdfName : ViewPDFApplicationContent.pdfNameWelsh}")`,
      ),
    ]);
    await pdfPage.waitForLoadState();
    await this.scrollToBottom(pdfPage);

    return pdfPage;
  }

  private static async checkEnglishPdf(
    page: Page,
    viewPdfTestCases: ViewPdfTestCases,
  ) {
    const pdfPage = await this.openMediaViewer(page, "English");
    await this.checkQuestionsEnglish(pdfPage, viewPdfTestCases);

    switch (viewPdfTestCases) {
      case "1":
        await this.checkCommonDataEnglish(pdfPage, viewPdfTestCases);
        await this.checkAnswers1English(pdfPage);
        break;
      case "2":
        await this.checkCommonDataEnglish(pdfPage, viewPdfTestCases);
        await this.checkAnswers2English(pdfPage);
        break;
      case "3":
        await this.checkAnswers3English(pdfPage);
        break;
      default:
        console.log(
          `Unexpected value for viewPdfTestCases: ${viewPdfTestCases}`,
        );
        break;
    }
    await pdfPage.close();
  }

  private static async checkWelshPdf(
    page: Page,
    viewPdfTestCases: ViewPdfTestCases,
  ) {
    const pdfPage = await this.openMediaViewer(page, "Welsh");
    await this.checkQuestionsWelsh(pdfPage, viewPdfTestCases);

    if (viewPdfTestCases === "1") {
      await this.checkCommonDataWelsh(pdfPage, viewPdfTestCases);
      await this.checkAnswers1Welsh(pdfPage);
    } else {
      await this.checkCommonDataWelsh(pdfPage, viewPdfTestCases);
      await this.checkAnswers2Welsh(pdfPage);
    }
    await pdfPage.close();
  }

  private static async scrollToBottom(page: Page) {
    const numOfPagesLocator = page.locator(ids.numPages);
    await expect(numOfPagesLocator).not.toHaveText(/0/); // <- Wait for number of pages not to be 0 (i.e., page has loaded)

    const numOfPageText = await numOfPagesLocator.textContent();
    const numOfPages = parseInt(
      (numOfPageText ?? "").replace("/", "").trim(),
      10,
    ); // <- numOfPageText is in format "/ 7", strip
    //                                                                             the '/' out and convert to int so can
    //                                                                             be used in loop
    for (let i = 0; i < numOfPages - 1; i++) {
      await page.click(ids.mvDownBtn);
    }
  }

  private static async checkQuestionsEnglish(
    page: Page,
    viewPdfTestCases: ViewPdfTestCases,
  ) {
    if (viewPdfTestCases === "3") {
      await Helpers.checkGroup(
        page,
        77,
        ViewPDFApplicationContent,
        "testCase3QuestionLabel",
        `${Selectors.Span}`,
      );
    } else {
      if (viewPdfTestCases === "1") {
        await Helpers.checkGroup(
          page,
          4,
          ViewPDFApplicationContent,
          "testCase1QuestionLabel",
          `${Selectors.Span}`,
        );
      }
      await Promise.all([
        Helpers.checkGroup(
          page,
          90,
          ViewPDFApplicationContent,
          "questionLabel",
          `${Selectors.Span}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedQuestionLabel5}")`,
          2,
        ),
      ]);
    }

    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedQuestionLabel1}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedQuestionLabel2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedQuestionLabel3}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedQuestionLabel4}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedQuestionLabel6}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedQuestionLabel7}")`,
        2,
      ),
    ]);
  }

  private static async checkCommonDataEnglish(
    page: Page,
    viewPdfTestCases: ViewPdfTestCases,
  ) {
    await Promise.all([
      Helpers.checkGroup(
        page,
        58,
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
        viewPdfTestCases === "2" ? 25 : 27,
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

  private static async checkAnswers1English(page: Page) {
    await Helpers.checkGroup(
      page,
      8,
      ViewPDFApplicationContent,
      "testCase1Label",
      `${Selectors.Span}`,
    );
  }

  private static async checkAnswers2English(page: Page) {
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        ViewPDFApplicationContent,
        "testCase2Label",
        `${Selectors.Span}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.testCase2LabelRepeated}")`,
        2,
      ),
    ]);
  }

  private static async checkAnswers3English(page: Page) {
    await Promise.all([
      Helpers.checkGroup(
        page,
        22,
        ViewPDFApplicationContent,
        "testCase3Label",
        `${Selectors.Span}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.no}")`,
        24,
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

  private static async checkQuestionsWelsh(
    page: Page,
    viewPdfTestCases: ViewPdfTestCases,
  ) {
    await Promise.all([
      Helpers.checkGroup(
        page,
        83,
        ViewPDFApplicationContent,
        "questionLabelWelsh",
        `${Selectors.Span}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.questionLabelRepeatedWelsh1}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.questionLabelRepeatedWelsh2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.questionLabelRepeatedWelsh3}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.questionLabelRepeatedWelsh4}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.questionLabelRepeatedWelsh5}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.questionLabelRepeatedWelsh6}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.questionLabelRepeatedWelsh7}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.questionLabelRepeatedWelsh8}")`,
        3,
      ),
    ]);
    if (viewPdfTestCases === "1") {
      await Helpers.checkGroup(
        page,
        4,
        ViewPDFApplicationContent,
        "testCase1QuestionLabelWelsh",
        `${Selectors.Span}`,
      );
    }
  }

  private static async checkCommonDataWelsh(
    page: Page,
    viewPdfTestCases: ViewPdfTestCases,
  ) {
    await Promise.all([
      Helpers.checkGroup(
        page,
        60,
        ViewPDFApplicationContent,
        "answerLabelWelsh",
        `${Selectors.Span}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedLabelWelsh1}")`,
        viewPdfTestCases === "1" ? 9 : 8,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedLabelWelsh2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedLabelWelsh3}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedLabelWelsh4}")`,
        6,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedLabelWelsh5}")`,
        viewPdfTestCases === "1" ? 12 : 11,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedLabelWelsh6}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedLabelWelsh7}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedLabelWelsh8}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.repeatedLabelWelsh9}")`,
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
    ]);
  }

  private static async checkAnswers1Welsh(page: Page) {
    await Helpers.checkGroup(
      page,
      4,
      ViewPDFApplicationContent,
      "testCase1LabelWelsh",
      `${Selectors.Span}`,
    );
  }

  private static async checkAnswers2Welsh(page: Page) {
    await Promise.all([
      Helpers.checkGroup(
        page,
        5,
        ViewPDFApplicationContent,
        "testCase2LabelWelsh",
        `${Selectors.Span}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ViewPDFApplicationContent.testCase2LabelWelshRepeated1}")`,
        2,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${ViewPDFApplicationContent.continue}")`,
    );
  }
}
