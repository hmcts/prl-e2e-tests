import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { OrderType } from "../../../../../common/types.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { DraftAnOrder5Content } from "../../../../../fixtures/manageCases/caseProgression/manageOrders/draftAnOrder/draftAnOrder5Content.ts";
import { HowLongWillTheOrderBeInForce } from "../../../../../journeys/manageCases/caseProgression/manageOrders/draftAnOrder/draftAnOrder.ts";
import { NonMolestationOrder5Page } from "./nonMolestationOrder/nonMolestationOrder5Page.ts";

export class DraftAnOrder5Page {
  public static async draftAnOrder5Page(
    page: Page,
    orderType: OrderType,
    yesNoToAll: boolean,
    howLongWillTheOrderBeInForce: HowLongWillTheOrderBeInForce,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, orderType, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page, orderType);
    }
    await this.fillInFields(
      page,
      orderType,
      yesNoToAll,
      howLongWillTheOrderBeInForce,
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
        await NonMolestationOrder5Page.checkPageLoads(page);
        break;
      default:
        console.error("Unknown order type");
        break;
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(
    page: Page,
    orderType: OrderType,
  ): Promise<void> {
    switch (orderType) {
      case "nonMolestation":
        await NonMolestationOrder5Page.checkErrorMessaging(page);
        break;
      default:
        console.error("Unknown order type");
        break;
    }
  }

  private static async fillInFields(
    page: Page,
    orderType: OrderType,
    yesNoToAll: boolean,
    howLongWillTheOrderBeInForce: HowLongWillTheOrderBeInForce,
  ): Promise<void> {
    switch (orderType) {
      case "nonMolestation":
        await NonMolestationOrder5Page.fillInFields(
          page,
          yesNoToAll,
          howLongWillTheOrderBeInForce,
        );
        break;
      default:
        console.error("Unknown order type");
        break;
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DraftAnOrder5Content.continue}")`,
    );
  }
}
