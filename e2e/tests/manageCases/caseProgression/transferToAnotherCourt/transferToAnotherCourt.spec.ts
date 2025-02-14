import { test } from "@playwright/test";
import Config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import { TransferToAnotherCourt } from "../../../../journeys/manageCases/caseProgression/transferToAnotherCourt/transferToAnotherCourt";

test.use({ storageState: Config.sessionStoragePath + "courtAdminStoke.json" });

test.describe("Transfer to another court event for DA Citizen case tests as a court admin.", () => {
  test.beforeEach(async ({ page }) => {
    const ccdRef = await createDaCitizenCourtNavCase(true, true);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Complete Transfer to another court. With accessibility test. @nightly @accessibility", async ({
    page,
  }): Promise<void> => {
    await TransferToAnotherCourt.transferToAnotherCourt({
      page: page,
      courtIsListed: true,
      accessibilityTest: true,
    });
  });

  test("Complete Transfer to another court event by selecting court from the courts list. No restricted access and not confidential. @regression", async ({
    page,
  }): Promise<void> => {
    await TransferToAnotherCourt.transferToAnotherCourt({
      page: page,
      courtIsListed: true,
      accessibilityTest: false,
    });
  });

  test("Complete Transfer to another court event by entering court name manually when the court is not available in the courts list  @regression", async ({
    page,
  }): Promise<void> => {
    await TransferToAnotherCourt.transferToAnotherCourt({
      page: page,
      courtIsListed: false,
      accessibilityTest: false,
    });
  });
});
