import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import { DraftAnOrder20Content } from "../../../fixtures/manageCases/caseWorker/draftAnOrder20Content";
import { Helpers } from "../../../common/helpers";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper";
import { OrderType } from "../../../common/types";
import { orderTypesMap } from "../../../journeys/manageCases/caseWorker/draftAnOrder";

enum ids {
  mvDownBtn = "#mvDownBtn",
  numPages = "#numPages",
}

export class DraftAnOrder20Page {
  public static async draftAnOrder20Page(
    page: Page,
    orderType: OrderType,
    yesToAll: boolean,
    howLongWillOrderBeInForce: string,
    willAllPartiesBeAttendingHearing: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, orderType, accessibilityTest);
    await this.checkPDFContent(
      page,
      orderType,
      yesToAll,
      howLongWillOrderBeInForce,
      willAllPartiesBeAttendingHearing,
    );
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    orderType: OrderType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${DraftAnOrder20Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${DraftAnOrder20Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${orderTypesMap.get(orderType)?.journeyName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${DraftAnOrder20Content.welshPdfLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${DraftAnOrder20Content.pdfLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${DraftAnOrder20Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrder20Content.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrder20Content.continue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkPDFContent(
    page: Page,
    orderType: OrderType,
    yesToAll: boolean,
    howLongWillOrderBeInForce: string,
    willAllPartiesBeAttendingHearing: boolean,
  ): Promise<void> {
    await this.checkWelshPdfContent(
      page,
      orderType,
      yesToAll,
      howLongWillOrderBeInForce,
      willAllPartiesBeAttendingHearing,
    );
    await this.checkEnglishPdfContent(
      page,
      orderType,
      yesToAll,
      howLongWillOrderBeInForce,
      willAllPartiesBeAttendingHearing,
    );
  }

  private static async checkWelshPdfContent(
    page: Page,
    orderType: OrderType,
    yesNoToAll: boolean,
    howLongWillOrderBeInForce: string,
    willAllPartiesBeAttendingHearing: boolean,
  ): Promise<void> {
    const pdfPage: Page = await this.openMediaViewer(page, "Welsh");
    await Helpers.checkVisibleAndPresent(
      pdfPage,
      `${Selectors.Span}:text-is("${orderTypesMap.get(orderType)?.welshPdfName}")`,
      1,
    );
    await Helpers.checkGroup(
      pdfPage,
      53,
      DraftAnOrder20Content,
      "welshSpan",
      `${Selectors.Span}`,
    );
    if (yesNoToAll) {
      await Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.welshChildrenSpan}")`,
        1,
      );
      await Helpers.checkGroup(
        pdfPage,
        40,
        DraftAnOrder20Content,
        "welshCourtOrderSpan",
        `${Selectors.Span}`,
      );
      await this.checkWelshRepeatedCourtOrderSpans(pdfPage);
      await Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.welshWithNoticeSpan}")`,
        1,
      );
      await Helpers.checkGroup(
        pdfPage,
        22,
        DraftAnOrder20Content,
        "welshHearingSpan",
        `${Selectors.Span}`,
      );
      await this.checkWelshRepeatedHearingSpans(pdfPage);
      await Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${this.formatDate()}")`,
        2,
      );
      if (willAllPartiesBeAttendingHearing) {
        await Helpers.checkGroup(
          pdfPage,
          3,
          DraftAnOrder20Content,
          "welshAllPartiesAttendingInSameWaySpan",
          `${Selectors.Span}`,
        );
      } else {
        await Helpers.checkGroup(
          pdfPage,
          11,
          DraftAnOrder20Content,
          "welshHearingArrangementsSpan",
          `${Selectors.Span}`,
        );
      }
    } else {
      await Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${this.formatDate()}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.welshWithoutNoticeSpan}")`,
        1,
      );
    }
    switch (howLongWillOrderBeInForce) {
      case "noEndDate":
        await Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${DraftAnOrder20Content.welshOrderAppliesNoFixedEndDateSpan}")`,
          1,
        );
        break;
      case "specifiedDateAndTime":
        await Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${this.formatDate()} at 12:00 AM")`,
          1,
        );
        break;
      default:
        console.error(
          "No such option exists for how lon an order will be in force",
        );
        break;
    }
  }

  private static async checkWelshRepeatedCourtOrderSpans(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.welshRepeatedCourtOrderSpan1}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.welshRepeatedCourtOrderSpan2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.welshRepeatedCourtOrderSpan3}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.welshRepeatedCourtOrderSpan4}")`,
        2,
      ),
    ]);
  }

  private static async checkWelshRepeatedHearingSpans(page: Page): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.Span}:text-is("${DraftAnOrder20Content.welshHearingRepeatedColon}")`,
      3,
    )
  }

  private static async checkEnglishPdfContent(
    page: Page,
    orderType: OrderType,
    yesNoToAll: boolean,
    howLongWillOrderBeInForce: string,
    willAllPartiesBeAttendingHearing: boolean,
  ): Promise<void> {
    const pdfPage: Page = await this.openMediaViewer(page, "English");
    await Helpers.checkVisibleAndPresent(
      pdfPage,
      `${Selectors.Span}:text-is("${orderTypesMap.get(orderType)?.englishPdfName}")`,
      1,
    );
    await Helpers.checkGroup(
      pdfPage,
      44,
      DraftAnOrder20Content,
      "span",
      `${Selectors.Span}`,
    );
    await Helpers.checkVisibleAndPresent(
      pdfPage,
      `${Selectors.Span}:text-is("Ordered on ${this.formatDate()} by")`,
      1,
    );
    if (yesNoToAll) {
      await Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.childrenSpan}")`,
        1,
      );
      await Helpers.checkGroup(
        pdfPage,
        33,
        DraftAnOrder20Content,
        "courtOrderSpan",
        `${Selectors.Span}`,
      );
      await this.checkEnglishRepeatCourtOrderSpans(pdfPage);
      await Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.withNoticeSpan}")`,
        1,
      );
      await Helpers.checkGroup(
        pdfPage,
        23,
        DraftAnOrder20Content,
        "hearingSpan",
        `${Selectors.Span}`,
      );
      await Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${this.formatDate()}")`,
        1,
      );
      if (willAllPartiesBeAttendingHearing) {
        await Helpers.checkGroup(
          pdfPage,
          2,
          DraftAnOrder20Content,
          "allPartiesAttendingInSameWaySpan",
          `${Selectors.Span}`,
        );
      } else {
        await Helpers.checkGroup(
          pdfPage,
          11,
          DraftAnOrder20Content,
          "hearingArrangementsSpan",
          `${Selectors.Span}`,
        );
      }
    } else {
      await Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.withoutNoticeSpan}")`,
        1,
      );
    }
    switch (howLongWillOrderBeInForce) {
      case "noEndDate":
        await Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("${DraftAnOrder20Content.spanOrderAppliesNoFixedEndDate}")`,
          1,
        );
        break;
      case "specifiedDateAndTime":
        await Helpers.checkVisibleAndPresent(
          pdfPage,
          `${Selectors.Span}:text-is("This order applies until ${this.formatDate()} at 12:00 AM")`,
          1,
        );
        break;
      default:
        console.error(
          "No such option exists for how lon an order will be in force",
        );
        break;
    }
  }

  private static async checkEnglishRepeatCourtOrderSpans(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.repeatCourtOrderSpan1}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.repeatCourtOrderSpan2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.repeatCourtOrderSpan3}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.repeatCourtOrderSpan4}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.repeatCourtOrderSpan5}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.repeatCourtOrderSpan6}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.repeatCourtOrderSpan7}")`,
        2,
      ),
    ]);
  }

  private static formatDate(): string {
    const todayDate: string = Helpers.getCurrentDateFormatted();
    const day: string = todayDate.substring(0, 2);
    const month: string = todayDate.substring(2, 4);
    const year: string = todayDate.substring(4);
    return Helpers.dayLongMonthYear(day, month, year);
  }

  private static async openMediaViewer(page: Page, language: string) {
    const [pdfPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.click(
        `${Selectors.a}:text-is("${language === "English" ? DraftAnOrder20Content.pdfLink : DraftAnOrder20Content.welshPdfLink}")`,
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

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DraftAnOrder20Content.continue}")`,
    );
  }
}
