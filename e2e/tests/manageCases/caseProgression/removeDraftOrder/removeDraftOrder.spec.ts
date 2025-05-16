import { test } from "@playwright/test";
import Config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers";
import { RemoveDraftOrder } from "../../../../journeys/manageCases/caseProgression/removeDraftOrder/removeDraftOrder";
import { SolicitorDACaseCreator } from "../../../../common/caseHelpers/solicitorDACaseCreator.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Remove draft order as a court admin for solicitor-created DA case", (): void => {
  let caseRef: string;
  test.slow();

  test.beforeEach(async ({ page }) => {
    await page.goto(Config.manageCasesBaseURLCase);
    caseRef =
      await SolicitorDACaseCreator.createCaseStatementOfTruthAndSubmit(page);
    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  test("Draft a non-molestation order for a DA case as a solicitor and remove draft as a court admin. @regression @nightly @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await RemoveDraftOrder.removeDraftOrder({
      page,
      accessibilityTest: true,
      caseRef,
      browser: browser,
    });
  });
});
