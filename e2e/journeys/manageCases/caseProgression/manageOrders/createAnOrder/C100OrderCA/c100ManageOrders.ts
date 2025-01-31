import { Page } from "@playwright/test";
import { Helpers } from "../../../../../../common/helpers.ts";
import { ManageOrders1Page } from "../../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/orderCA/manageOrders1Page.ts";
import { ManageOrders2Page } from "../../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/orderCA/manageOrders2Page.ts";
import { ManageOrders5Page } from "../../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/orderCA/manageOrders5Page.ts";
import { ManageOrders10Page } from "../../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/orderCA/manageOrders10Page.ts";
import { ManageOrders19Page } from "../../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/orderCA/manageOrders19Page.ts";
import { ManageOrders20Page } from "../../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/orderCA/manageOrders20Page.ts";
import { ManageOrders24Page } from "../../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/orderCA/manageOrders24Page.ts";
import { SubmitPage } from "../../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/orderCA/submitPage.ts";

interface C100ManageOrdersOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class C100ManageOrders {
  public static async c100ManageOrders({
    page: page,
    accessibilityTest: accessibilityTest,
  }: C100ManageOrdersOptions): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, `Manage orders`);
    await ManageOrders1Page.manageOrders1Page({
      page,
      accessibilityTest,
    });
    await ManageOrders2Page.manageOrders2Page({
      page,
      accessibilityTest,
    });
    await ManageOrders5Page.manageOrders5Page({
      page,
      accessibilityTest,
    });
    await ManageOrders10Page.manageOrders10Page({
      page,
      accessibilityTest,
    });
    await ManageOrders19Page.manageOrders19Page({
      page,
      accessibilityTest,
    });
    await ManageOrders20Page.manageOrders20Page({
      page,
      accessibilityTest,
    });
    await ManageOrders24Page.manageOrders24Page({
      page,
      accessibilityTest,
    });
    await SubmitPage.submitPage({
      page,
      accessibilityTest,
    });
  }
}
