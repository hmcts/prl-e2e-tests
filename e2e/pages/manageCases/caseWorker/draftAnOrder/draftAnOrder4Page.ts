import { Page } from "@playwright/test";
import { OrderType, solicitorCaseCreateType } from "../../../../common/types";
import { Selectors } from "../../../../common/selectors";
import { DraftAnOrder4Content } from "../../../../fixtures/manageCases/caseWorker/draftAnOrder/draftAnOrder4Content";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { NonMolestationOrder4Page } from "./nonMolestationOrder/nonMolestationOrder4Page";

export class DraftAnOrder4Page {
  public static async draftAnOrder4Page(
    page: Page,
    caseType: solicitorCaseCreateType,
    orderType: OrderType,
    yesNoToAll: boolean,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, caseType, orderType, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page, orderType, caseType);
    }
    await this.fillInFields(page, orderType, caseType, yesNoToAll);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    caseType: solicitorCaseCreateType,
    orderType: OrderType,
    accessibilityTest: boolean,
  ): Promise<void> {
    switch (orderType) {
      case "nonMolestation":
        await NonMolestationOrder4Page.checkPageLoads(page, caseType);
        break;
      default:
        console.error("An invalid order type was given");
        break;
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(
    page: Page,
    orderType: OrderType,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    switch (orderType) {
      case "nonMolestation":
        await NonMolestationOrder4Page.checkErrorMessaging(page, caseType);
        break;
      default:
        console.error("An invalid order type was given");
        break;
    }
  }

  private static async fillInFields(
    page: Page,
    orderType: OrderType,
    caseType: solicitorCaseCreateType,
    yesNoToAll: boolean,
  ): Promise<void> {
    switch (orderType) {
      case "nonMolestation":
        await NonMolestationOrder4Page.fillInFields(page, caseType, yesNoToAll);
        break;
      default:
        console.error("An invalid order type was given");
        break;
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DraftAnOrder4Content.continue}")`,
    );
  }
}
