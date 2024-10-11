import { Page } from "@playwright/test";
import { UserRole } from "../../../../common/types";
import { SelectCourtOrderPage } from "../../../../pages/citizen/createCase/C100/typeOfOrder/selectCourtOrderPage";
import { CaOrderPage } from "../../../../pages/citizen/createCase/C100/typeOfOrder/caOrderPage";
import { ShortStatementPage } from "../../../../pages/citizen/createCase/C100/typeOfOrder/shortStatementPage";

interface C100TypeOfOrderOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  subJourney: boolean;
}

export class C100TypeOfOrder {
  public static async c100TypeOfOrder({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    subJourney,
  }: C100TypeOfOrderOptions): Promise<void> {
    if (subJourney) {
    }
    await SelectCourtOrderPage.selectCourtOrderPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
    });
    await CaOrderPage.caOrderPage({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await ShortStatementPage.shortStatementPage({
      page: page,
      accessibilityTest: accessibilityTest,
    });
  }
}
