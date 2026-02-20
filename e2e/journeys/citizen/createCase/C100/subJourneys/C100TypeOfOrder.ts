import { Page } from "@playwright/test";
import { SelectCourtOrderPage } from "../../../../../pages/citizen/createCase/C100/typeOfOrder/selectCourtOrderPage";
import { CaOrderPage } from "../../../../../pages/citizen/createCase/C100/typeOfOrder/caOrderPage";
import { ShortStatementPage } from "../../../../../pages/citizen/createCase/C100/typeOfOrder/shortStatementPage";

interface C100TypeOfOrderOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

export class C100TypeOfOrder {
  public static async c100TypeOfOrder({
    page,
    accessibilityTest,
    errorMessaging,
  }: C100TypeOfOrderOptions): Promise<void> {
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
      errorMessage: errorMessaging,
    });
  }
}
