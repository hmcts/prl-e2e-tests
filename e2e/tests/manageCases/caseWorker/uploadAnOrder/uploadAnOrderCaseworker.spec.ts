import { test } from "@playwright/test";
import Config from "../../../../config";
import { C100UploadAnOrder } from "../../../../journeys/manageCases/caseWorker/uploadAnOrder/UploadC100Order.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Upload an order tests @newtest", (): void => {
  test(`Complete Uploading an order as a Caseworker with the following options @newtest:
  Case: C100,
  Not accessibility testing. 
  @regression`, async ({ page }): Promise<void> => {
    await C100UploadAnOrder.c100UploadAnOrder({
      page: page,
      accessibilityTest: false,
      solicitorCaseCreateType: "C100",
      yesNoManageOrders: false,
      uploadOrderC100Options: "Child arrangements, specific issue or prohibited steps order (C43)",
    });
  });
});
//   test(`Complete Creating an order as a Caseworker with the following options:
//   Case: C100,
//   Accessibility testing: yes.
//   @nightly @accessibility`, async ({ page }): Promise<void> => {
//     await C100UploadAnOrder.c100UploadAnOrder({
//       page: page,
//       accessibilityTest: true,
//       solicitorCaseCreateType: "C100",
//     });
//   });
// });
