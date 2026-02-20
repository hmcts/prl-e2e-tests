import { test } from "../../../fixtures";
import config from "../../../../utils/config.utils";
import { SendToGateKeeperJourneyParams } from "../../../../journeys/manageCases/caseProgression/sendToGateKeeper/sendToGateKeeperJourney";
import { SendToGateKeeperCourtAdminScenarios as scenarios } from "../../../../testData/sendToGateKeeper";
import { CaseWorkerPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/caseWorkerPages";
import { CaseManagerPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/caseManagerPages";

/**
 * Handles the logic for both Case Workers and Case Managers
 * using a union type for the page group.
 */
async function completeSendToGatekeeperJourney(
  actor: CaseWorkerPagesGroup | CaseManagerPagesGroup,
  caseNumber: string,
  params: SendToGateKeeperJourneyParams,
  roleName: "caseWorker" | "caseManager",
) {
  const { rolesAndAccessPage, sendToGateKeeper, tasksPage, summaryPage } =
    actor;

  await tasksPage.assignTaskToMeAndTriggerNextSteps(
    "Send to Gatekeeper",
    "Send to Gatekeeper",
    roleName,
  );

  await sendToGateKeeper.page1.assertPageContents();
  await sendToGateKeeper.page1.verifyAccessibility();
  await sendToGateKeeper.page1.fillInFields(params.sendToGateKeeperParams);
  await sendToGateKeeper.page1.clickContinue();

  await sendToGateKeeper.submitPage.assertPageContents(
    params.snapshotPath,
    params.snapshotName,
  );
  await sendToGateKeeper.submitPage.verifyAccessibility();
  await sendToGateKeeper.submitPage.clickSubmit();

  await summaryPage.alertBanner.assertEventAlert(
    caseNumber,
    "Send to gatekeeper",
  );
  await summaryPage.assertCaseStatus("Gatekeeping");

  if (params.sendToGateKeeperParams.sendToSpecificGateKeeper) {
    await rolesAndAccessPage.goToPage();

    if (params.sendToGateKeeperParams.judgeOrLegalAdviser === "Judge") {
      await rolesAndAccessPage.assertRolesAndAccessSection(
        "Judiciary",
        params.sendToGateKeeperParams.judgeName,
        "Gatekeeping Judge",
      );
    } else {
      await rolesAndAccessPage.assertRolesAndAccessSection(
        "Legal Ops",
        params.sendToGateKeeperParams.legalAdviserDisplayName,
        "Allocated Legal Adviser",
      );
    }
  }
}

// COURT ADMIN (C100 Cases)
test.describe("Court Admin: Send to Gatekeeper (C100)", () => {
  let caseNumber: string = "";

  test.beforeEach(
    async ({ caseWorker, browser, caseEventUtils, navigationUtils }) => {
      // Note: createCACase... implies C100 setup
      caseNumber =
        await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "tasks",
      );
    },
  );

  scenarios.forEach((params) => {
    const gatekeeperType =
      params.sendToGateKeeperParams.judgeOrLegalAdviser ||
      "no specific gatekeeper";

    test(`Complete Send to Gatekeeper with ${gatekeeperType} @nightly @regression @accessibility`, async ({
      caseWorker,
    }) => {
      await completeSendToGatekeeperJourney(
        caseWorker,
        caseNumber,
        params,
        "caseWorker",
      );
    });
  });
});

// CASE MANAGER (FL401 Cases)
test.describe("Case Manager: Send to Gatekeeper (FL401)", () => {
  let caseNumber: string = "";

  // Set the specific storage state for this describe block
  test.use({ storageState: config.sessionStoragePath + "caseManager.json" });

  test.beforeEach(
    async ({ caseManager, browser, caseEventUtils, navigationUtils }) => {
      // Note: createDACase implies FL401 setup
      caseNumber = await caseEventUtils.createDACase(browser);
      await navigationUtils.goToCase(
        caseManager.page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "tasks",
      );
    },
  );

  scenarios.forEach((params) => {
    const gatekeeperType =
      params.sendToGateKeeperParams.judgeOrLegalAdviser ||
      "no specific gatekeeper";

    test(`Complete Send to Gatekeeper with ${gatekeeperType} @regression @accessibility`, async ({
      caseManager,
    }) => {
      await completeSendToGatekeeperJourney(
        caseManager,
        caseNumber,
        params,
        "caseManager",
      );
    });
  });
});
