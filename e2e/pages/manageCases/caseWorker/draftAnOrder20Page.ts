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
    await this.checkPDFContent(page, yesToAll, howLongWillOrderBeInForce, willAllPartiesBeAttendingHearing);
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
        `${Selectors.headingH3}:text-is("${orderTypesMap.get(orderType)}")`,
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
    yesToAll: boolean,
    howLongWillOrderBeInForce: string,
    willAllPartiesBeAttendingHearing: boolean,
  ): Promise<void> {
    await this.checkWelshPdfContent(
      page,
      yesToAll,
      howLongWillOrderBeInForce,
      willAllPartiesBeAttendingHearing
    );
    await this.checkEnglishPdfContent(
      page,
      yesToAll,
      howLongWillOrderBeInForce,
      willAllPartiesBeAttendingHearing,
    );
  }

  private static async checkWelshPdfContent(page: Page, yesNoToAll: boolean, howLongWillOrderBeInForce: string,
                                            willAllPartiesBeAttendingHearing: boolean): Promise<void> {
    const pdfPage: Page = await this.openMediaViewer(page, "Welsh");
    await Helpers.checkGroup(
      pdfPage,
      54,
      DraftAnOrder20Content,
      "welshSpan",
      `${Selectors.Span}`,
    );
    await Helpers.checkVisibleAndPresent(
      pdfPage,
      `${Selectors.Span}:text-is("${this.formatDate()}")`,
      1,
    );
    if (yesNoToAll) {
      await Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.welshChildrenSpan}")`,
        1,
      );
      await Helpers.checkGroup(
        pdfPage,
        48,
        DraftAnOrder20Content,
        "welshCourtOrderSpan",
        `${Selectors.Span}`,
      );
      await Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${DraftAnOrder20Content.welshWithNoticeSpan}")`,
        1,
      );
      await Helpers.checkGroup(
        pdfPage,
        24,
        DraftAnOrder20Content,
        "welshHearingSpan",
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

  private static async checkEnglishPdfContent(
    page: Page,
    yesNoToAll: boolean,
    howLongWillOrderBeInForce: string,
    willAllPartiesBeAttendingHearing: boolean,
  ): Promise<void> {
    const pdfPage: Page = await this.openMediaViewer(page, "English");
    await Helpers.checkGroup(
      pdfPage,
      45,
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
        47,
        DraftAnOrder20Content,
        "courtOrderSpan",
        `${Selectors.Span}`,
      );
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

  private static formatDate(): string {
    const todayDate: string = Helpers.getCurrentDateFormatted();
    const day: string = todayDate.substring(0,2);
    const month: string = todayDate.substring(2,4);
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
