import { test } from "@playwright/test";
import Config from "../../../../config";
import { FL401CreateAnOrder } from "../../../../journeys/manageCases/caseWorker/createAnOrder/FL401";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Create an order tests @manageCases", (): void => {
  test(`Complete Creating an order as a Caseworker with the following options:
  Case: C100,
  Not accessibility testing. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401CreateAnOrder.fL401CreateAnOrder({
      page: page,
      accessibilityTest: false,
      solicitorCaseCreateType: "FL401",
    });
  });
});
