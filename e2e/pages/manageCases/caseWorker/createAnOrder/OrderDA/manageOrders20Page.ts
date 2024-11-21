import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1Content";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ManageOrders20Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders20Content";
import { howLongWillOrderBeInForce } from "./manageOrders12Page";

interface ManageOrders20PageOptions {
  page: Page;
  yesNoManageOrders: boolean;
  howLongWillOrderBeInForce: howLongWillOrderBeInForce;
  accessibilityTest: boolean;
}

enum ids {
  mvDownBtn = "#mvDownBtn",
  numPages = "#numPages",
}

export class ManageOrders20Page {
  public static async manageOrders20Page({
    page,
    yesNoManageOrders,
    howLongWillOrderBeInForce,
    accessibilityTest,
  }: ManageOrders20PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.checkPdfContent(
      page,
      yesNoManageOrders,
      howLongWillOrderBeInForce,
    );
    await this.fillInFields({
      page,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ManageOrders20PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ManageOrders20Content.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ManageOrders20Content.span}")`,
        1,
      ),
      Helpers.checkGroup(page, 2, ManageOrders20Content, "a", Selectors.a),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkPdfContent(
    page: Page,
    yesNoManageOrders: boolean,
    howLongWillOrderBeInForce: howLongWillOrderBeInForce,
  ): Promise<void> {
    await this.checkWelshPdfContent(
      page,
      yesNoManageOrders,
      howLongWillOrderBeInForce,
    );
    await this.checkEnglishPdfContent(
      page,
      yesNoManageOrders,
      howLongWillOrderBeInForce,
    );
  }

  private static async checkWelshPdfContent(
    page: Page,
    yesNoManageOrders: boolean,
    howLongWillOrderBeInForce: howLongWillOrderBeInForce,
  ): Promise<void> {
    const pdfPage: Page = await this.openMediaViewer(page, "Welsh");
    await Promise.all([
      Helpers.checkGroup(
        pdfPage,
        87,
        ManageOrders20Content,
        "welshSpan",
        `${Selectors.Span}`,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20Content.repeatedWelshSpan1}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20Content.repeatedWelshSpan2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20Content.repeatedWelshSpan3}")`,
        2,
      ),
    ]);
    if (yesNoManageOrders) {
      await Promise.all([
        Helpers.checkGroup(
          pdfPage,
          10,
          ManageOrders20Content,
          "welshYesToAllSpan",
          `${Selectors.Span}`,
        ),
        Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20Content.welshRepeatedYesToAllSpan1}")`,
          2,
        ),
        Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20Content.loremIpsumSpan}")`,
          4,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkGroup(
          pdfPage,
          11,
          ManageOrders20Content,
          "welshNoToAllSpan",
          `${Selectors.Span}`,
        ),
        Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20Content.loremIpsumSpan}")`,
          3,
        ),
      ]);
    }
    switch (howLongWillOrderBeInForce) {
      case "noEndDate":
        await Helpers.checkGroup(
          pdfPage,
          2,
          ManageOrders20Content,
          "welshNoFixedEndDate",
          `${Selectors.Span}`,
        );
        break;
      case "specificDate":
        await Helpers.checkGroup(
          pdfPage,
          2,
          ManageOrders20Content,
          "welshSpecificDate",
          `${Selectors.Span}`,
        );
        break;
      case "untilNextHearing":
        await Helpers.checkGroup(
          pdfPage,
          2,
          ManageOrders20Content,
          "welshUntilNextHearing",
          `${Selectors.Span}`,
        );
        break;
      default:
        console.error("Invalid order length given.");
        break;
    }
  }

  private static async checkEnglishPdfContent(
    page: Page,
    yesNoManageOrders: boolean,
    howLongWillOrderBeInForce: howLongWillOrderBeInForce,
  ): Promise<void> {
    const pdfPage: Page = await this.openMediaViewer(page, "English");
    await Promise.all([
      Helpers.checkGroup(
        pdfPage,
        75,
        ManageOrders20Content,
        "englishSpan",
        `${Selectors.Span}`,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20Content.repeatedEnglishSpan1}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20Content.repeatedEnglishSpan2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20Content.repeatedEnglishSpan3}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20Content.repeatedEnglishSpan4}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20Content.repeatedEnglishSpan5}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20Content.repeatedEnglishSpan6}")`,
        2,
      ),
    ]);
    if (yesNoManageOrders) {
      await Promise.all([
        Helpers.checkGroup(
          pdfPage,
          7,
          ManageOrders20Content,
          "englishYesToAllSpan",
          `${Selectors.Span}`,
        ),
        Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20Content.englishRepeatedYesToAllSpan1}")`,
          2,
        ),
        Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20Content.loremIpsumSpan}")`,
          4,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkGroup(
          pdfPage,
          10,
          ManageOrders20Content,
          "englishNoToAllSpan",
          `${Selectors.Span}`,
        ),
        Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20Content.loremIpsumSpan}")`,
          3,
        ),
      ]);
    }
    switch (howLongWillOrderBeInForce) {
      case "noEndDate":
        await Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20Content.englishNoFixedEndDate}")`,
          1,
        );
        break;
      case "specificDate":
        await Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20Content.englishSpecificDate}")`,
          1,
        );
        break;
      case "untilNextHearing":
        await Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20Content.englishUntilNextHearing}")`,
          1,
        );
        break;
      default:
        console.error("Invalid order length given.");
        break;
    }
  }

  private static async openMediaViewer(page: Page, language: string) {
    const [pdfPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.click(
        `${Selectors.a}:text-is("${language === "English" ? ManageOrders20Content.englishPdfLink : ManageOrders20Content.welshPdfLink}")`,
      ),
    ]);
    await pdfPage.waitForLoadState();
    await this.scrollToBottom(pdfPage);
    return pdfPage;
  }

  private static async scrollToBottom(page: Page) {
    const numOfPagesLocator = page.locator(ids.numPages);
    await expect(numOfPagesLocator).not.toHaveText(/0/); // <- Wait for number of pages not to be 0 (i.e., page has loaded)

    const numOfPageText = await numOfPagesLocator.textContent();
    if (numOfPageText) {
      const numOfPages = parseInt(numOfPageText?.replace("/", "").trim(), 10); // <- numOfPageText is in format "/ 7", strip
      //                                                                             the '/' out and convert to int so can
      //                                                                             be used in loop
      for (let i = 0; i < numOfPages - 1; i++) {
        await page.click(ids.mvDownBtn);
      }
    }
  }

  private static async fillInFields({
    page,
  }: Partial<ManageOrders20PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
