import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { OrderType } from "../../../../common/types";
import { NonMolestationOrderSubmitPage } from "./nonMolestationOrder/nonMolestationOrderSubmitPage";
import { Selectors } from "../../../../common/selectors";
import { HowLongWillTheOrderBeInForce } from "../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder";
import { DraftAnOrderSubmitContent } from "../../../../fixtures/manageCases/caseWorker/draftAnOrder/draftAnOrderSubmitContent";
import { Helpers } from "../../../../common/helpers";

enum UniqueSelectors {
  caseTab = ".mat-tab-label-content",
  firstRowOfEventTable = ".EventLogTable tbody tr:first-child",
  eventColumnOfFirstRowAnchor = `${firstRowOfEventTable} td:nth-child(1) ${Selectors.a}`,
  authorColumnOfFirstRowText16 = `${firstRowOfEventTable} td:nth-child(3) ${Selectors.GovukText16}`,
}

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
    await this.confirmSubmission(page);
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
    await page.click(`${Selectors.button}:text-is("Submit")`);
  }

  private static async confirmSubmission(page: Page): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${DraftAnOrderSubmitContent.summaryH1}")`,
    );
    await page.click(
      `${UniqueSelectors.caseTab}:text-is("${DraftAnOrderSubmitContent.historyH2}")`,
    );
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${DraftAnOrderSubmitContent.historyH2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.eventColumnOfFirstRowAnchor}:text-is("${DraftAnOrderSubmitContent.event}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.authorColumnOfFirstRowText16}:text-is("${DraftAnOrderSubmitContent.author}")`,
        1,
      ),
    ]);
  }
}
