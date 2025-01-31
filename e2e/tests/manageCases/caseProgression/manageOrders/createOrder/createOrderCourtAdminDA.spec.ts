import { test } from "@playwright/test";
import Config from "../../../../../config.ts";
import { FL401CreateAnOrder } from "../../../../../journeys/manageCases/caseProgression/manageOrders/createAnOrder/FL401.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Create an order tests as a court admin for solicitor DA case", (): void => {
  test(`Complete Creating an order as a court admin with the following options:
  Case: FL401,
  Not accessibility testing
  yesNoManageOrders: true,
  howLongWillOrderBeInForce: "untilNextHearing"
  "This order will be served with the 'date to be fixed'" selected on ManageOrders19. @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401CreateAnOrder.fL401CreateAnOrder({
      page: page,
      accessibilityTest: false, // failing
      solicitorCaseCreateType: "FL401",
      yesNoManageOrders: true,
      manageOrdersOptions: "create order",
      howLongWillOrderBeInForce: "untilNextHearing",
      createOrderFL401Options: "non-molestation",
      judgeTitles: "Her Honour Judge",
      createOrderManageOrders19Options: "dateToBeFixed",
    });
  });

  test(`Complete Creating an order as a court admin with the following options:
  Case: FL401,
  No Accessibility testing
  yesNoManageOrders: true,
  howLongWillOrderBeInForce: "noEndDate"
  "This order will be served with the 'date to be fixed'" selected on ManageOrders19. @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401CreateAnOrder.fL401CreateAnOrder({
      page: page,
      accessibilityTest: false,
      solicitorCaseCreateType: "FL401",
      manageOrdersOptions: "create order",
      yesNoManageOrders: false,
      howLongWillOrderBeInForce: "noEndDate",
      createOrderFL401Options: "non-molestation",
      judgeTitles: "Her Honour Judge",
      createOrderManageOrders19Options: "dateToBeFixed",
    });
  });

  test(`Complete Creating an order as a court admin with the following options:
  Case: FL401,
  No Accessibility testing
  yesNoManageOrders: true,
  howLongWillOrderBeInForce: "specificDate"
  "This order will be served with the 'date to be fixed'" selected on ManageOrders19. @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401CreateAnOrder.fL401CreateAnOrder({
      page: page,
      accessibilityTest: false,
      solicitorCaseCreateType: "FL401",
      manageOrdersOptions: "create order",
      yesNoManageOrders: true,
      howLongWillOrderBeInForce: "specificDate",
      createOrderFL401Options: "non-molestation",
      judgeTitles: "Her Honour Judge",
      createOrderManageOrders19Options: "dateToBeFixed",
    });
  });
  test(`Complete Creating an order as a court admin with the following options:
  Case: FL401,
  Accessibility testing: yes
  yesNoManageOrders: true,
  howLongWillOrderBeInForce: "untilNextHearing"
  "This order will be served with the 'date to be fixed'" selected on ManageOrders19. @nightly @accessibility`, async ({
    page,
  }): Promise<void> => {
    await FL401CreateAnOrder.fL401CreateAnOrder({
      page: page,
      accessibilityTest: true,
      solicitorCaseCreateType: "FL401",
      manageOrdersOptions: "create order",
      yesNoManageOrders: true,
      howLongWillOrderBeInForce: "untilNextHearing",
      createOrderFL401Options: "non-molestation",
      judgeTitles: "Her Honour Judge",
      createOrderManageOrders19Options: "dateToBeFixed",
    });
  });
});
