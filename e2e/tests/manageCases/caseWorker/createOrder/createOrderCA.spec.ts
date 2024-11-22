import { test } from "@playwright/test";
import Config from "../../../../config";
import { C100CreateAnOrder } from "../../../../journeys/manageCases/caseWorker/createAnOrder/C100";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Create an order tests @manageCases", (): void => {
  test(`Complete Creating an order as a Caseworker with the following options:
  Case: C100,
  Not accessibility testing. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100CreateAnOrder.c100CreateAnOrder({
      page: page,
      accessibilityTest: false,
      solicitorCaseCreateType: "C100",
    });
  });
});
