import { test } from "@playwright/test";
import Config from "../../../../config";
import config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../../../../common/helpers";
import { CreateABundleJourney } from "../../../../journeys/manageCases/caseProgression/createABundle/createABundle.ts";
import { jsonDatas } from "../../../../common/caseHelpers/solicitorCaseCreatorHelper.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Order task for DA Citizen case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Complete Task - Create a Bundle - Power of arrest (FL406) without accessibility test. @nightly @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await CreateABundleJourney.createABundleJourney({
      page: page,
      accessibilityTest: false,
      ccdRef: ccdRef,
      browser: browser,
      manageOrderData: jsonDatas.manageOrderDataPowerOfArrest,
      createOrderFL401Options: "power of arrest",
      applicationSubmittedBy: "Citizen",
    });
  });

  test("Complete Task - Create a Bundle - Amended, discharged or varied order (FL404B)  with accessibility test. @regression @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await CreateABundleJourney.createABundleJourney({
      page: page,
      accessibilityTest: true,
      ccdRef: ccdRef,
      browser: browser,
      manageOrderData: jsonDatas.manageOrderDataAmendDischargedVaried,
      createOrderFL401Options: "amend discharge varied order",
      applicationSubmittedBy: "Citizen",
    });
  });
});
