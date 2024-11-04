import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { OrderType } from "../../../../common/types";
import { NonMolestationOrderSubmitPage } from "./nonMolestationOrder/nonMolestationOrderSubmitPage";
import { Selectors } from "../../../../common/selectors";
import { HowLongWillTheOrderBeInForce } from "../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder";

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
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async submit(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("Submit")`,
    );
  }
}
