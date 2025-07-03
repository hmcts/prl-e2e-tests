import { Page, test } from "@playwright/test";
import Config from "../../../../utils/config.utils.ts";
import { SolicitorDACaseCreator } from "../../../../common/caseHelpers/solicitorDACaseCreator.js";
import { Helpers } from "../../../../common/helpers.js";
import { Fl401ManageOrderDA } from "../../../../journeys/manageCases/caseWorker/createAnOrder/FL401OrderDA/fl401ManageOrderDA.js";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });
//
test.describe("Create an order tests", (): void => {
  test.beforeEach(async ({ page, browser }) => {
    const solicitorPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "solicitor",
    );
    await solicitorPage.goto(Config.manageCasesBaseURLCase);
    const caseRef = await SolicitorDACaseCreator.createCaseSendToGatekeeper(
      solicitorPage,
      browser,
    );
    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      caseRef,
      "Summary",
    );
  });

  test(`Complete Creating an order as a Caseworker with the following options:
  Case: C100,
  Not accessibility testing
  yesNoManageOrders: true,
  howLongWillOrderBeInForce: "untilNextHearing"
  "This order will be served with the 'date to be fixed'" selected on ManageOrders19. @regression`, async ({
    page,
  }): Promise<void> => {
    await Fl401ManageOrderDA.fl401ManageOrderDA({
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

  test(`Complete Creating an order as a Caseworker with the following options:
  Case: C100,
  No Accessibility testing
  yesNoManageOrders: true,
  howLongWillOrderBeInForce: "noEndDate"
  "This order will be served with the 'date to be fixed'" selected on ManageOrders19. @regression`, async ({
    page,
  }): Promise<void> => {
    await Fl401ManageOrderDA.fl401ManageOrderDA({
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

  test(`Complete Creating an order as a Caseworker with the following options:
  Case: C100,
  No Accessibility testing
  yesNoManageOrders: true,
  howLongWillOrderBeInForce: "specificDate"
  "This order will be served with the 'date to be fixed'" selected on ManageOrders19. @regression`, async ({
    page,
  }): Promise<void> => {
    await Fl401ManageOrderDA.fl401ManageOrderDA({
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
  test(`Complete Creating an order as a Caseworker with the following options:
  Case: C100,
  Accessibility testing: yes
  yesNoManageOrders: true,
  howLongWillOrderBeInForce: "untilNextHearing"
  "This order will be served with the 'date to be fixed'" selected on ManageOrders19. @nightly @accessibility`, async ({
    page,
  }): Promise<void> => {
    await Fl401ManageOrderDA.fl401ManageOrderDA({
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
