import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import {
  ViewPDFApplication1Content
} from "../../../../../fixtures/manageCases/createCase/C100/viewPDFApplication/viewPDFApplication1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import {
  EnglishMediaContentYesToAll
} from "../../../../../fixtures/manageCases/createCase/C100/viewPDFApplication/englishMediaContentYesToAll";
import {
  WelshMediaContent
} from "../../../../../fixtures/manageCases/createCase/C100/viewPDFApplication/welshMediaContent";
import {
  EnglishMediaContentNoToAll
} from "../../../../../fixtures/manageCases/createCase/C100/viewPDFApplication/englishMediaContentNoToAll";

enum englishNoSpanCounts {
  page1 = 18,
  page2 = 19,
  page3 = 13,
  page4 = 18,
  page5 = 18,
  page6 = 24,
  page7 = 18,
  page8 = 9,
  page9 = 0,
  page10 = 16,
  page11 = 23,
  page12 = 20,
  page13 = 5
}

enum englishYesSpanCounts {
  page1 = 18,
  page2 = 19,
  page3 = 13,
  page4 = 19,
  page5 = 17,
  page6 = 20,
  page7 = 18,
  page8 = 26,
  page9 = 14,
  page10 = 24,
  page11 = 19,
  page12 = 12,
  page13 = 3
}

enum welshSpanCounts {
  page1 = 21,
  page2 = 23,
  page3 = 15,
  page4 = 20,
  page5 = 18,
  page6 = 20,
  page7 = 17,
  page8 = 30,
  page9 = 18,
  page10 = 26,
  page11 = 23,
  page12 = 13,
  page13 = 3
}

enum englishNoFilledSpanCounts {
  page1 = 7,
  page2 = 0,
  page3 = 9,
  page4 = 10,
  page5 = 9,
  page6 = 0,
  page7 = 0,
  page8 = 35,
  page9 = 57,
  page10 = 36,
  page11 = 5,
  page12 = 2,
  page13 = 2
}

enum englishYesFilledSpanCounts {
  page1 = 6,
  page2 = 0,
  page3 = 11,
  page4 = 9,
  page5 = 12,
  page6 = 8,
  page7 = 0,
  page8 = 4,
  page9 = 25,
  page10 = 6,
  page11 = 6,
  page12 = 8,
  page13 = 0
}

enum welshFilledCounts {
  page1 = 5,
  page2 = 0,
  page3 = 8,
  page4 = 9,
  page5 = 11,
  page6 = 5,
  page7 = 0,
  page8 = 3,
  page9 = 6,
  page10 = 6,
  page11 = 5,
  page12 = 11,
  page13 = 0
}

enum englishNoOtherSpanCounts {
  page1 = 6,
  page2 = 4,
  page3 = 3,
  page4 = 2,
  page5 = 2,
  page6 = 10,
  page7 = 13,
  page8 = 1,
  page9 = 0,
  page10 = 0,
  page11 = 2,
  page12 = 3,
  page13 = 9
}

enum englishYesOtherSpanCounts {
  page1 = 6,
  page2 = 4,
  page3 = 3,
  page4 = 2,
  page5 = 2,
  page6 = 10,
  page7 = 7,
  page8 = 2,
  page9 = 1,
  page10 = 2,
  page11 = 6,
  page12 = 9,
  page13 = 1
}

enum welshOtherSpanCounts {
  page1 = 9,
  page2 = 3,
  page3 = 7,
  page4 = 2,
  page5 = 3,
  page6 = 10,
  page7 = 11,
  page8 = 2,
  page9 = 20,
  page10 = 2,
  page11 = 8,
  page12 = 11,
  page13 = 2
}

enum inputIDs {
  mvDownBtn = "#mvDownBtn",
  numPages = "#numPages",
}

interface ViewPDFApplication1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  c100YesNoToAll: boolean
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
  c100YesNoToAll: boolean
}

interface CheckPDFContentOptions {
  page: Page;
  c100YesNoToAll: boolean
}

export class ViewPDFApplication1Page {
  public static async viewPDFApplication1Page({
    page,
    accessibilityTest,
    c100YesNoToAll
  }: ViewPDFApplication1PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      c100YesNoToAll
    });
    await this.checkPDFContent({
      page,
      c100YesNoToAll
    });
    await page.click(
      `${Selectors.button}:text-is("${ViewPDFApplication1Content.continue}")`
    );
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    c100YesNoToAll
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${ViewPDFApplication1Content.pageTitle}")`
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ViewPDFApplication1Content.p}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukTextFieldLabel}:text-is("${ViewPDFApplication1Content.fieldLabel}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${ViewPDFApplication1Content.h3}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ViewPDFApplication1Content.pdfLink}")`,
        1
      ),
    ]);
    if (c100YesNoToAll) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${ViewPDFApplication1Content.welshPdfLink}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukTextFieldLabel}:text-is("${ViewPDFApplication1Content.welshFieldLabel}")`,
          1
        ),
      ]);
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkPDFContent({
    page,
    c100YesNoToAll
  }: CheckPDFContentOptions): Promise<void> {
    if (c100YesNoToAll) {
      await this.checkEnglishPDFContentYesToAll(page)
      await this.checkWelshPDFContent(
        page
      );
    } else {
      await this.checkEnglishPDFContentNoToAll(page);
    }
  }

  private static async checkEnglishPDFContentYesToAll(
    page: Page
  ): Promise<void> {
    const context = page.context();
    const [pdfPage] = await Promise.all([
      context.waitForEvent("page"),
      page.click(`${Selectors.a}:text-is("${ViewPDFApplication1Content.pdfLink}")`, {
        modifiers: ["ControlOrMeta"],
      }),
    ]);
    await pdfPage.waitForSelector(
      `${Selectors.Span}:text-is("C100")`
    )
    for (let i = 1; i <= 14 - 1; i++) {
      let uniquePageSelector = pdfPage.locator(
        `div[data-page-number="${i}"] > .textLayer > `
      )
      let spanCount = englishYesSpanCounts[`page${i}}` as keyof typeof englishYesSpanCounts]
      let filledSpanCount = englishYesFilledSpanCounts[`page${i}}` as keyof typeof englishYesFilledSpanCounts]
      let otherSpanCount = englishYesOtherSpanCounts[`page${i}}` as keyof typeof englishYesOtherSpanCounts]
      await Promise.all([
        Helpers.checkGroup(
          pdfPage,
          spanCount,
          EnglishMediaContentYesToAll,
          `page${i}Span`,
          `${uniquePageSelector}${Selectors.Span}`
        ),
        Helpers.checkGroup(
          pdfPage,
          filledSpanCount,
          EnglishMediaContentYesToAll,
          `page${i}FilledSpan`,
          `${uniquePageSelector}${Selectors.Span}`
        ),
        Helpers.checkGroup(
          pdfPage,
          otherSpanCount,
          EnglishMediaContentYesToAll,
          `page${i}OtherSpan`,
          `${uniquePageSelector}${Selectors.Span}`
        ),
      ]);
      await this.checkEnglishYesPageRepeatedText(
        pdfPage, i
      )
      if (i < 12) {
        await pdfPage.click(inputIDs.mvDownBtn);
      }
    }
  }

  private static async checkEnglishPDFContentNoToAll(
    page: Page
  ): Promise<void> {
    const context = page.context();
    const [pdfPage] = await Promise.all([
      context.waitForEvent("page"),
      page.click(`${Selectors.a}:text-is("${ViewPDFApplication1Content.pdfLink}")`, {
        modifiers: ["ControlOrMeta"],
      }),
    ]);
    await pdfPage.waitForLoadState("domcontentloaded");
    await pdfPage.waitForSelector(
      `${Selectors.Span}:text-is("C100")`
    )
    for (let i = 1; i <= 14 - 1; i++) {
      let uniquePageSelector = pdfPage.locator(
        `div[data-page-number="${i}"] > .textLayer > `
      )
      let spanCount = englishNoSpanCounts[`page${i}}` as keyof typeof englishNoSpanCounts]
      let filledSpanCount = englishNoFilledSpanCounts[`page${i}}` as keyof typeof englishNoFilledSpanCounts]
      let otherSpanCount = englishNoOtherSpanCounts[`page${i}}` as keyof typeof englishNoOtherSpanCounts]
      await Promise.all([
        Helpers.checkGroup(
          pdfPage,
          spanCount,
          EnglishMediaContentNoToAll,
          `page${i}Span`,
          `${uniquePageSelector}${Selectors.Span}`
        ),
        Helpers.checkGroup(
          pdfPage,
          filledSpanCount,
          EnglishMediaContentNoToAll,
          `page${i}FilledSpan`,
          `${uniquePageSelector}${Selectors.Span}`
        ),
        Helpers.checkGroup(
          pdfPage,
          otherSpanCount,
          EnglishMediaContentNoToAll,
          `page${i}OtherSpan`,
          `${uniquePageSelector}${Selectors.Span}`
        ),
      ]);
      await this.checkEnglishNoRepeatedText(
        pdfPage, i
      )
      if (i < 12) {
        await pdfPage.click(inputIDs.mvDownBtn);
      }
    }
  }

  private static async checkEnglishNoRepeatedText(
    page: Page, i: number
  ): Promise<void> {
    switch (i) {
      case 1:
        await this.checkEnglishNoPage1RepeatedText(page);
        break;
      case 2:
        await this.checkEnglishNoPage2RepeatedText(page);
        break;
      case 3:
        await this.checkEnglishNoPage3RepeatedText(page);
        break;
      case 4:
        await this.checkEnglishNoPage4RepeatedText(page);
        break;
      case 5:
        await this.checkEnglishNoPage5RepeatedText(page);
        break;
      case 6:
        await this.checkEnglishNoPage6RepeatedText(page);
        break;
      case 7:
        await this.checkEnglishNoPage7RepeatedText(page);
        break;
      case 8:
        await this.checkEnglishNoPage8RepeatedText(page);
        break;
      case 11:
        await this.checkEnglishNoPage11RepeatedText(page);
        break;
      case 12:
        await this.checkEnglishNoPage12RepeatedText(page);
        break;
      default:
        console.log(`No check function defined for page ${i}`);
    }
  }

  private static async checkEnglishYesPageRepeatedText(page: Page, i: number): Promise<void> {
    switch (i) {
      case 1:
        await this.checkEnglishYesPage1RepeatedText(page);
        break;
      case 2:
        await this.checkEnglishYesPage2RepeatedText(page);
        break;
      case 3:
        await this.checkEnglishYesPage3RepeatedText(page);
        break;
      case 4:
        await this.checkEnglishYesPage4RepeatedText(page);
        break;
      case 5:
        await this.checkEnglishYesPage5RepeatedText(page);
        break;
      case 6:
        await this.checkEnglishYesPage6RepeatedText(page);
        break;
      case 7:
        await this.checkEnglishYesPage7RepeatedText(page);
        break;
      case 8:
        await this.checkEnglishYesPage8RepeatedText(page);
        break;
      case 10:
        await this.checkEnglishYesPage10RepeatedText(page);
        break;
      case 11:
        await this.checkEnglishYesPage11RepeatedText(page);
        break;
      case 12:
        await this.checkEnglishYesPage12RepeatedText(page);
        break;
      default:
        console.log(`Page ${i} is not handled.`);
    }
  }

  private static async checkEnglishYesPage1RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="1"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page1LoremIpsumLine1}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="1"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page1LoremIpsumLine2}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="1"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page1LoremIpsumLine3}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="1"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page1Yes}")`,
        2
      ),
    ]);
  }

  private static async checkEnglishYesPage2RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="2"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page2Yes}")`,
        10
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="2"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page2LoremIpsum}")`,
        4
      ),
    ]);
  }

  private static async checkEnglishYesPage3RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="3"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page3FirstNames}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="3"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page3LastName}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="3"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page3Gender}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="3"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page3Male}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="3"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page3Yes}")`,
        2
      ),
    ]);
  }

  private static async checkEnglishYesPage4RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="4"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page4London}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="4"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page4ConfidentialInformation}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="4"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page4isConfidential}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="4"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page4Yes}")`,
        5
      ),
    ]);
  }

  private static async checkEnglishYesPage5RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="5"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page5UnitedKingdom}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="5"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page5Yes}")`,
        6
      ),
    ]);
  }

  private static async checkEnglishYesPage6RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="6"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page6London}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="6"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page6Yes}")`,
        4
      ),
    ]);
  }

  private static async checkEnglishYesPage7RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="7"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page7Yes}")`,
        8
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="7"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page7confidentialInformation}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="7"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page7ChildName}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="7"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page7AutomatedChildFirstNameAutomatedChildLastName}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="7"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page7Father}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="7"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page7ChildLivesWithPerson}")`,
        3
      ),
    ]);
  }

  private static async checkEnglishYesPage8RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="8"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page8Contact}")`,
        2
      ),
    ]);
  }

  private static async checkEnglishYesPage10RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="10"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page10Yes}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="10"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page10ReasonsProvided}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="10"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page10LoremIpsum}")`,
        5
      ),
    ]);
  }

  private static async checkEnglishYesPage11RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="11"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page11WelshLanguageRequirements}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="11"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page11Yes}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="11"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page11DNeedsTranslating}")`,
        2
      ),
    ]);
  }

  private static async checkEnglishYesPage12RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="12"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page12required}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="11"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.page12Yes}")`,
        3
      ),
    ]);
  }


  private static async checkEnglishNoPage1RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="1"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page1LoremIpsumLine1}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="1"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page1LoremIpsumLine2}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="1"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page1LoremIpsumLine3}")`,
        2
      ),
    ]);
  }

  private static async checkEnglishNoPage2RepeatedText(
    page: Page
  ): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `div[data-page-number="2"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page2No}")`,
      5
    );
  }

  private static async checkEnglishNoPage3RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="3"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page3FirstNames}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="3"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page3Lastname}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="3"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page3Gender}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="3"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page3Female}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="3"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page3No}")`,
        2
      ),
    ]);
  }

  private static async checkEnglishNoPage4RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="4"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page4London}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="4"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page4Confidential}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="4"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page4No}")`,
        4
      ),
    ]);
  }

  private static async checkEnglishNoPage5RepeatedText(
    page: Page
  ): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `div[data-page-number="5"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page5No}")`,
      6
    );
  }

  private static async checkEnglishNoPage6RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="6"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page6No}")`,
        6
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="6"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page6DoConfidentialAddress}")`,
        2
      ),
    ]);
  }

  private static async checkEnglishNoPage7RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="7"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page7AutomatedChildFirstNameAutomatedChildLastName}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="7"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page7LoremIpsum}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="7"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page7ChildLiveWithPerson}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="7"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page7No}")`,
        4
      ),
    ]);
  }

  private static async checkEnglishNoPage8RepeatedText(
    page: Page
  ): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `div[data-page-number="8"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page8Offence}")`,
      2
    );
  }

  private static async checkEnglishNoPage11RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="11"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page11LoremIpsum}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="11"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page11No}")`,
        5
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="11"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page11ReasonsProvided}")`,
        3
      ),
    ]);
  }

  private static async checkEnglishNoPage12RepeatedText(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="12"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page12TranslatedApplication}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="12"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page12No}")`,
        6
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="12"] > .textLayer > ${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.page12required}")`,
        2
      ),
    ]);
  }

  private static async checkWelshPDFContent(
    page: Page
  ): Promise<void> {
    const context = page.context();
    const [pdfPage] = await Promise.all([
      context.waitForEvent("page"),
      page.click(`${Selectors.a}:text-is("${ViewPDFApplication1Content.welshPdfLink}")`, {
        modifiers: ["ControlOrMeta"],
      }),
    ]);
    await pdfPage.waitForLoadState("domcontentloaded");
    await pdfPage.waitForSelector(
      `${Selectors.Span}:text-is("C100")`
    )
    for (let i = 1; i <= 14 - 1; i++) {
      let uniquePageSelector = pdfPage.locator(
        `div[data-page-number="${i}"] > .textLayer > `
      )
      let spanCount = welshSpanCounts[`page${i}}` as keyof typeof welshSpanCounts]
      let filledSpanCount = welshFilledCounts[`page${i}}` as keyof typeof welshFilledCounts]
      let otherSpanCount = welshOtherSpanCounts[`page${i}}` as keyof typeof welshOtherSpanCounts]
      await Promise.all([
        Helpers.checkGroup(
          pdfPage,
          spanCount,
          WelshMediaContent,
          `page${i}Span`,
          `${uniquePageSelector}${Selectors.Span}`
        ),
        Helpers.checkGroup(
          pdfPage,
          filledSpanCount,
          WelshMediaContent,
          `page${i}FilledSpan`,
          `${uniquePageSelector}${Selectors.Span}`
        ),
        Helpers.checkGroup(
          pdfPage,
          otherSpanCount,
          WelshMediaContent,
          `page${i}OtherSpan`,
          `${uniquePageSelector}${Selectors.Span}`
        ),
      ]);
      await this.checkWelshRepeatedTextByPage(
        pdfPage, i
      )
      if (i < 12) {
        await pdfPage.click(inputIDs.mvDownBtn);
      }
    }
  }

  private static async checkWelshRepeatedTextByPage(page: Page, i: number): Promise<void> {
    switch (i) {
      case 1:
        await this.checkWelshPage1RepeatedText(page);
        break;
      case 2:
        await this.checkWelshPage2RepeatedText(page);
        break;
      case 3:
        await this.checkWelshPage3RepeatedText(page);
        break;
      case 4:
        await this.checkWelshPage4RepeatedText(page);
        break;
      case 5:
        await this.checkWelshPage5RepeatedText(page);
        break;
      case 6:
        await this.checkWelshPage6RepeatedText(page);
        break;
      case 7:
        await this.checkWelshPage7RepeatedText(page);
        break;
      case 8:
        await this.checkWelshPage8RepeatedText(page);
        break;
      case 10:
        await this.checkWelshPage10RepeatedText(page);
        break;
      case 11:
        await this.checkWelshPage11RepeatedText(page);
        break;
      default:
        console.log(`Page number ${i} is not supported.`);
    }
  }

  private static async checkWelshPage1RepeatedText(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="1"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page1LoremIpsumLine1}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="1"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page1LoremIpsumLine2}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="1"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page1LoremIpsumLine3}")`,
        3
      ),
    ]);
  }

  private static async checkWelshPage2RepeatedText(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="2"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page2Ydy}")`,
        8
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="2"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page2LoremIpsum}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="2"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page2Ydw}")`,
        2
      ),
    ]);
  }

  private static async checkWelshPage3RepeatedText(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="3"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page3Enwaucyntaf}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="3"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page3Enwolaf}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="3"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page3Rhywedd}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="3"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page3Gwryw}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="3"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page3Ydy}")`,
        2
      ),
    ]);
  }

  private static async checkWelshPage4RepeatedText(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="4"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page4London}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="4"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page4Dylidcadwrwybodaethhonyngyfrinachol}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="4"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page4gyfrinachol}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="4"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page4Ydw}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="4"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page4Ydy}")`,
        2
      ),
    ]);
  }

  private static async checkWelshPage5RepeatedText(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="5"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page5SWAAA}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="5"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page5UnitedKingdom}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="5"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page5Ydy}")`,
        6
      ),
    ]);
  }

  private static async checkWelshPage6RepeatedText(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="6"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page6BuckinghamPalace}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="6"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page6London}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="6"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page6SWAAA}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="6"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page6UnitedKingdom}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="6"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page6Ydy}")`,
        2
      ),
    ]);
  }

  private static async checkWelshPage7RepeatedText(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="7"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page7Yes}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="7"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page7gyfrinachol}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="7"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page7Ydy}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="7"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page7Enwrplentyn}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="7"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page7AutomatedChildFirstNameAutomatedChildLastName}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="7"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page7Tad}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="7"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page7Aywrplentynynbywgydarunigolynhwn}")`,
        3
      ),
    ]);
  }

  private static async checkWelshPage8RepeatedText(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="8"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page8Ydy}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="8"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page8}")`,
        2
      ),
    ]);
  }

  private static async checkWelshPage10RepeatedText(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="10"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page10Oes}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="10"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page10Rhesymauaddarparwyd}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="10"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page10loremIpsum}")`,
        5
      ),
    ]);
  }

  private static async checkWelshPage11RepeatedText(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="11"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page11GofynionoranyriaithGymraeg}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `div[data-page-number="11"] > .textLayer > ${Selectors.Span}:text-is("${WelshMediaContent.page11Ydy}")`,
        3
      ),
    ]);
  }
}