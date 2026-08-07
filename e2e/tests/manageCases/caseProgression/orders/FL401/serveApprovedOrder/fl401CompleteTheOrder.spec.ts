import { test } from "../../../../../fixtures.ts";
import Config from "../../../../../../utils/config.utils.ts";
import config from "../../../../../../utils/config.utils.ts";
import { CompleteTheOrder } from "../../../../../../journeys/manageCases/caseProgression/completeTheOrder/completeTheOrder.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Order task for DA Solicitor case tests.", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  test("Complete Task - Complete the Order - Power of arrest (FL406) without accessibility test. @nightly @regression", async ({
    page,
    manageCasesEventUtils,
  }) => {
    await manageCasesEventUtils.createOrder({
      caseRef,
      orderType: "Power of arrest (FL406)",
      isDraft: true,
      doServe: false,
      user: "judge",
    });

    await CompleteTheOrder.FL401completeTheOrder({
      page: page,
      accessibilityTest: false,
      createOrderFL401Options: "power of arrest",
      personallyServed: true,
      applicationSubmittedBy: "Solicitor",
    });
  });

  test("Complete Task - Complete the Order - Amended, discharged or varied order (FL404B) with accessibility test. @regression @accessibility", async ({
    page,
    manageCasesEventUtils,
  }) => {
    await manageCasesEventUtils.createOrder({
      caseRef,
      orderType: "Amended, discharged or varied order (FL404B)",
      isDraft: true,
      doServe: false,
      user: "judge",
    });

    await CompleteTheOrder.FL401completeTheOrder({
      page: page,
      accessibilityTest: true,
      createOrderFL401Options: "amend discharge varied order",
      personallyServed: true,
      applicationSubmittedBy: "Solicitor",
    });
  });
});
