import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1DAContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ManageOrders20DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders20DAContent";
import { howLongWillOrderBeInForce } from "./manageOrders12Page";
import { CreateOrderFL401Options } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders5DAContent";
import { createOrderFL401Options } from "../../../../../common/types";

interface ManageOrders20PageOptions {
  page: Page;
  yesNoManageOrders: boolean;
  howLongWillOrderBeInForce: howLongWillOrderBeInForce;
  createOrderFL401Options: createOrderFL401Options;
  accessibilityTest: boolean;
}

enum ids {
  mvDownBtn = "#mvDownBtn",
  numPages = "#numPages",
}

export class ManageOrders20Page {
  public static async manageOrders20Page({
    page,
    createOrderFL401Options,
    yesNoManageOrders,
    howLongWillOrderBeInForce,
    accessibilityTest,
  }: ManageOrders20PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      createOrderFL401Options,
    });
    if (createOrderFL401Options === "non-molestation") {
      await this.checkPdfContent(
        page,
        yesNoManageOrders,
        howLongWillOrderBeInForce,
      );
    }
    await this.fillInFields({
      page,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    createOrderFL401Options,
  }: Partial<ManageOrders20PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1DAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    switch (createOrderFL401Options) {
      case "power of arrest":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanPowerOfArrest}")`,
          1,
        );
        break;
      case "occupation order":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanOccupationOrder}")`,
          1,
        );
        break;
      case "non-molestation":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanNonMolestation}")`,
          1,
        );
        break;
      case "amend discharge varied order":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanAmendDischargeVariedOrder}")`,
          1,
        );
        break;
      case "blank order":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanBlankOrder}")`,
          1,
        );
        break;
      case "general form of undertaking":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanGeneralFormOfUndertaking}")`,
          1,
        );
        break;
      case "notice of proceedings":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanNoticeOfProceedings}")`,
          1,
        );
        break;
    }
    await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ManageOrders20DAContent.h2}")`,
        1,
      );
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
        ManageOrders20DAContent,
        "welshSpan",
        `${Selectors.Span}`,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20DAContent.repeatedWelshSpan1}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20DAContent.repeatedWelshSpan2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20DAContent.repeatedWelshSpan3}")`,
        2,
      ),
    ]);
    if (yesNoManageOrders) {
      await Promise.all([
        Helpers.checkGroup(
          pdfPage,
          10,
          ManageOrders20DAContent,
          "welshYesToAllSpan",
          `${Selectors.Span}`,
        ),
        Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20DAContent.welshRepeatedYesToAllSpan1}")`,
          2,
        ),
        Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20DAContent.loremIpsumSpan}")`,
          4,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkGroup(
          pdfPage,
          11,
          ManageOrders20DAContent,
          "welshNoToAllSpan",
          `${Selectors.Span}`,
        ),
        Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20DAContent.loremIpsumSpan}")`,
          3,
        ),
      ]);
    }
    switch (howLongWillOrderBeInForce) {
      case "noEndDate":
        await Helpers.checkGroup(
          pdfPage,
          2,
          ManageOrders20DAContent,
          "welshNoFixedEndDate",
          `${Selectors.Span}`,
        );
        break;
      case "specificDate":
        await Helpers.checkGroup(
          pdfPage,
          2,
          ManageOrders20DAContent,
          "welshSpecificDate",
          `${Selectors.Span}`,
        );
        break;
      case "untilNextHearing":
        await Helpers.checkGroup(
          pdfPage,
          2,
          ManageOrders20DAContent,
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
        ManageOrders20DAContent,
        "englishSpan",
        `${Selectors.Span}`,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20DAContent.repeatedEnglishSpan1}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20DAContent.repeatedEnglishSpan2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20DAContent.repeatedEnglishSpan3}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20DAContent.repeatedEnglishSpan4}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20DAContent.repeatedEnglishSpan5}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20DAContent.repeatedEnglishSpan6}")`,
        2,
      ),
    ]);
    if (yesNoManageOrders) {
      await Promise.all([
        Helpers.checkGroup(
          pdfPage,
          7,
          ManageOrders20DAContent,
          "englishYesToAllSpan",
          `${Selectors.Span}`,
        ),
        Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20DAContent.englishRepeatedYesToAllSpan1}")`,
          2,
        ),
        Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20DAContent.loremIpsumSpan}")`,
          4,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkGroup(
          pdfPage,
          10,
          ManageOrders20DAContent,
          "englishNoToAllSpan",
          `${Selectors.Span}`,
        ),
        Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20DAContent.loremIpsumSpan}")`,
          3,
        ),
      ]);
    }
    switch (howLongWillOrderBeInForce) {
      case "noEndDate":
        await Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20DAContent.englishNoFixedEndDate}")`,
          1,
        );
        break;
      case "specificDate":
        await Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20DAContent.englishSpecificDate}")`,
          1,
        );
        break;
      case "untilNextHearing":
        await Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${ManageOrders20DAContent.englishUntilNextHearing}")`,
          1,
        );
        break;
      default:
        console.error("Invalid order length given.");
        break;
    }
  }
  // this is being tested in Create and order for caseWorker
  private static async openMediaViewer(page: Page, language: string) {
    const [pdfPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.click(
        `${Selectors.a}:text-is("${language === "English" ? ManageOrders20DAContent.englishPdfLink : ManageOrders20DAContent.welshPdfLink}")`,
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
