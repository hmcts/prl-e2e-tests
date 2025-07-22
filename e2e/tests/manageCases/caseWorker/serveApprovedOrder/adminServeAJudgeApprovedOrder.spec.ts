import Config from "../../../../utils/config.utils.ts";
import { AdminEditAndServeAnOrder } from "../../../../journeys/manageCases/caseWorker/serveApprovedOrder/adminEditAndServeAnOrder.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.js";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("As a Court admin Serve a judge approved solicitor created DA case order tests", (): void => {
  test.slow();

  let caseRef: string;

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    caseRef = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  test(`Complete serve an order that is personally served with the following options:
  Case: FL401,
  Order type: Non-molestation order (FL404A),
  Judge order action: Send to admin to serve,
  Error message testing,
  Not accessibility testing. @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await AdminEditAndServeAnOrder.adminEditAndServeAnOrder({
      page: page,
      accessibilityTest: false,
      browser: browser,
      personallyServed: true,
      caseRef: caseRef,
    });
  });

  test(`Complete serve an order that is not personally served with the following options:
  Case: FL401,
  Order type: Non-molestation order (FL404A),
  Judge order action: Send to admin to serve,
  Error message testing,
  Not accessibility testing. @nightly @accessibility`, async ({
    page,
    browser,
  }): Promise<void> => {
    await AdminEditAndServeAnOrder.adminEditAndServeAnOrder({
      page: page,
      accessibilityTest: false,
      browser: browser,
      personallyServed: false,
      caseRef: caseRef,
    });
  });
});
