import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { DraftAnOrder16Content } from "../../../../fixtures/manageCases/caseWorker/draftAnOrder/draftAnOrder16Content";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { OrderType } from "../../../../common/types";
import { NonMolestationOrder16Page } from "./nonMolestationOrder/nonMolestationOrder16Page";

export class DraftAnOrder16Page {
  public static async draftAnOrder16Page(
    page: Page,
    orderType: OrderType,
    yesNoToAll: boolean,
    willAllPartiesAttendHearing: boolean,
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
      willAllPartiesAttendHearing,
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
        await NonMolestationOrder16Page.checkPageLoads(page);
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
        await NonMolestationOrder16Page.checkErrorMessaging(page);
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
    willAllPartiesAttendHearing: boolean,
  ): Promise<void> {
    switch (orderType) {
      case "nonMolestation":
        await NonMolestationOrder16Page.fillInFields(
          page,
          yesNoToAll,
          willAllPartiesAttendHearing,
        );
        break;
      default:
        console.error("Unknown order type");
        break;
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DraftAnOrder16Content.continue}")`,
    );
  }
}
