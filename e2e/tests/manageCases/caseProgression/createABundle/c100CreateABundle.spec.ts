import { test } from "../../../fixtures.ts";
import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import { CreateABundleJourney } from "../../../../journeys/manageCases/caseProgression/createABundle/createABundle.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Order task for CA Solicitor case tests.", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
    await manageCasesEventUtils.createOrder({
      caseRef: caseRef,
      orderType:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      isDraft: false,
      doServe: false,
    });
    await manageCasesEventUtils.serviceOfApplication(
      caseRef,
      "C100",
      "Child arrangements, specific issue or prohibited steps order (C43)",
    );
    await manageCasesEventUtils.confidentialityCheck(caseRef);
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  test("Complete Task - Create a Bundle - Child arrangements, specific issue or prohibited steps order (C43) with accessibility test. @nightly @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await CreateABundleJourney.C100CreateABundleJourney({
      page: page,
      accessibilityTest: true,
    });
  });
});
