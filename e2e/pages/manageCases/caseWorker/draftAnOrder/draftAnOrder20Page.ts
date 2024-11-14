import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { DraftAnOrder20Content } from "../../../../fixtures/manageCases/caseWorker/draftAnOrder/draftAnOrder20Content";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { OrderType } from "../../../../common/types";
import {
  HowLongWillTheOrderBeInForce,
  orderTypesMap
} from "../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder";
import { NonMolestationOrder20Page } from "./nonMolestationOrder/nonMolestationOrder20Page";
import { Helpers } from "../../../../common/helpers";
import { ParentalResponsibilityOrder20Page } from "./parentalResponsibilityOrder/parentalResponsibilityOrder20Page";

export class DraftAnOrder20Page {
  public static async draftAnOrder20Page(
    page: Page,
    orderType: OrderType,
    yesToAll: boolean,
    howLongWillOrderBeInForce: HowLongWillTheOrderBeInForce,
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
    await this.checkPdfLinks(page, orderType);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkPDFContent(
    page: Page,
    orderType: OrderType,
    yesToAll: boolean,
    howLongWillOrderBeInForce: HowLongWillTheOrderBeInForce,
    willAllPartiesBeAttendingHearing: boolean,
  ): Promise<void> {
    switch (orderType) {
      case "nonMolestation":
        await NonMolestationOrder20Page.checkPdfContent(
          page,
          orderType,
          yesToAll,
          howLongWillOrderBeInForce,
          willAllPartiesBeAttendingHearing,
        );
        break;
      case "parentalResponsibility":
        await ParentalResponsibilityOrder20Page.checkPdfContent(
          page,
          yesToAll
        );
        break;
      default:
        console.error("Unknown order type");
        break;
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DraftAnOrder20Content.continue}")`,
    );
  }

  private static async checkPdfLinks(page: Page, orderType: OrderType) {
    switch (orderType) {
      case "nonMolestation":
        await NonMolestationOrder20Page.checkPdfLinks(page)
        break;
      case "parentalResponsibility":
        await ParentalResponsibilityOrder20Page.checkPdfLinks(page)
        break;
      default:
        console.error("Unknown order type");
        break;
    }
  }
}
