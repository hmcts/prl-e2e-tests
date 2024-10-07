import { Page, expect } from "@playwright/test";
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

const todayDate: string = Helpers.todayDate()

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
  page13 = 10
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
  page12 = 10,
  page13 = 1
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

interface CheckEnglishPDFContentOptions {
  page: Page;
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
      // await this.checkEnglishPDFContentYesToAll(page)
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
  }
}