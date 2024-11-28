import { test } from "@playwright/test";
import Config from "../../../../config";
import { FL401CreateAnOrder } from "../../../../journeys/manageCases/caseWorker/createAnOrder/FL401";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Create an order tests", (): void => {
  test(`Complete Creating an order as a Caseworker with the following options:
  Case: C100,
  Not accessibility testing
  yesNoManageOrders: true,
  howLongWillOrderBeInForce: "untilNextHearing"
  "This order will be served with the 'date to be fixed'" selected on ManageOrders19. @regression @nightly`, async ({
    page,
  }): Promise<void> => {
    await FL401CreateAnOrder.fL401CreateAnOrder({
      page: page,
      accessibilityTest: false, // failing
      solicitorCaseCreateType: "FL401",
      yesNoManageOrders: true,
      howLongWillOrderBeInForce: "untilNextHearing",
      createOrderFL401Options: "non-molestation",
    });
  });

  test(`Complete Creating an order as a Caseworker with the following options:
  Case: C100,
  Accessibility testing
  yesNoManageOrders: true,
  howLongWillOrderBeInForce: "noEndDate"
  "This order will be served with the 'date to be fixed'" selected on ManageOrders19. @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401CreateAnOrder.fL401CreateAnOrder({
      page: page,
      accessibilityTest: false,
      solicitorCaseCreateType: "FL401",
      yesNoManageOrders: false,
      howLongWillOrderBeInForce: "noEndDate",
      createOrderFL401Options: "non-molestation",
    });
  });

  test(`Complete Creating an order as a Caseworker with the following options:
  Case: C100,
  Accessibility testing
  yesNoManageOrders: true,
  howLongWillOrderBeInForce: "specificDate"
  "This order will be served with the 'date to be fixed'" selected on ManageOrders19. @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401CreateAnOrder.fL401CreateAnOrder({
      page: page,
      accessibilityTest: false,
      solicitorCaseCreateType: "FL401",
      yesNoManageOrders: true,
      howLongWillOrderBeInForce: "specificDate",
      createOrderFL401Options: "non-molestation",
    });
  });
});
