import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { DraftAnOrder20Content } from "../../../../fixtures/manageCases/caseWorker/draftAnOrder/draftAnOrder20Content";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { OrderType } from "../../../../common/types";
import { HowLongWillTheOrderBeInForce } from "../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder";
import { NonMolestationOrder20Page } from "./nonMolestationOrder/nonMolestationOrder20Page";

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
    switch (orderType) {
      case "nonMolestation":
        await NonMolestationOrder20Page.checkPageLoads(page);
        break;
      default:
        console.error("Unknown order type");
        break;
    }
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
}
