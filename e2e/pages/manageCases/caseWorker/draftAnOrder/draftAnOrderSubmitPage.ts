import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { OrderType } from "../../../../common/types.ts";
import { NonMolestationOrderSubmitPage } from "./nonMolestationOrder/nonMolestationOrderSubmitPage.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { HowLongWillTheOrderBeInForce } from "../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder.ts";

export class DraftAnOrderSubmitPage {
  public static async draftAnOrderSubmitPage(
    page: Page,
    orderType: OrderType,
    yesNoToAll: boolean,
    howLongWillOrderBeInForce: HowLongWillTheOrderBeInForce,
    willAllPartiesBeAttendingHearing: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageContent(
      page,
      orderType,
      yesNoToAll,
      howLongWillOrderBeInForce,
      willAllPartiesBeAttendingHearing,
      accessibilityTest,
    );
    await this.submit(page);
  }

  private static async checkPageContent(
    page: Page,
    orderType: OrderType,
    yesNoToAll: boolean,
    howLongWillOrderBeInForce: HowLongWillTheOrderBeInForce,
    willAllPartiesBeAttendingHearing: boolean,
    accessibilityTest: boolean,
  ) {
    switch (orderType) {
      case "nonMolestation":
        await NonMolestationOrderSubmitPage.checkPageContent(
          page,
          yesNoToAll,
          howLongWillOrderBeInForce,
          willAllPartiesBeAttendingHearing,
        );
        break;
      default:
        console.error("Unknown order type");
        break;
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async submit(page: Page) {
    await page.click(`${Selectors.button}:text-is("Submit")`);
  }
}
