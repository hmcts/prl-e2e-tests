import { test } from "../../../fixtures.ts";
import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import { CreateABundleJourney } from "../../../../journeys/manageCases/caseProgression/createABundle/createABundle.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Order task for DA Solicitor case tests.", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
    await manageCasesEventUtils.createOrder({
      caseRef: caseRef,
      orderType: "Power of arrest (FL406)",
      isDraft: false,
      doServe: false,
    });
    await manageCasesEventUtils.serviceOfApplication(
      caseRef,
      "FL401",
      "Power of arrest (FL406)",
    );
    await manageCasesEventUtils.confidentialityCheck(caseRef);
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  test("Complete Task - Create a Bundle - Power of arrest (FL406) with accessibility test. @nightly @accessibility @regression", async ({
    page,
  }): Promise<void> => {
    await CreateABundleJourney.FL401CreateABundleJourney({
      page: page,
      accessibilityTest: false,
    });
  });
});
