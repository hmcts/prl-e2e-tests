import { Page } from "@playwright/test";
import { OrderType } from "../../../../common/types.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { ParentalResponsibilityOrder8Page } from "./parentalResponsibilityOrder/parentalResponsibilityOrder8Page.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

export class DraftAnOrder8Page {
  public static async draftAnOrder8Page(
    page: Page,
    orderType: OrderType,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, orderType, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page, orderType);
    }
    await this.fillInFields(page, orderType);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    orderType: OrderType,
    accessibilityTest: boolean,
  ): Promise<void> {
    switch (orderType) {
      case "parentalResponsibility":
        await ParentalResponsibilityOrder8Page.checkPageLoads(page);
        break;
      default:
        console.error("An invalid order type was given");
        break;
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkErrorMessaging(
    page: Page,
    orderType: OrderType,
  ): Promise<void> {
    switch (orderType) {
      case "parentalResponsibility":
        await ParentalResponsibilityOrder8Page.checkErrorMessaging(page);
        break;
      default:
        console.error("An invalid order type was given");
        break;
    }
  }

  private static async fillInFields(
    page: Page,
    orderType: OrderType,
  ): Promise<void> {
    switch (orderType) {
      case "parentalResponsibility":
        await ParentalResponsibilityOrder8Page.fillInFields(page);
        break;
      default:
        console.error("An invalid order type was given");
        break;
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
