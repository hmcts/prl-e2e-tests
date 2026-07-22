import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { SendToGateKeeperJourneyParams } from "../../../../journeys/manageCases/caseProgression/sendToGateKeeper/sendToGateKeeperJourney.ts";
import { SendToGateKeeperCourtAdminScenarios as scenarios } from "../../../../testData/ui/sendToGateKeeper.ts";
import { CaseWorkerPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/caseWorkerPages.ts";
import { CaseManagerPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/caseManagerPages.ts";

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
  let caseRef: string = "";

  test.beforeEach(
    async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
        .caseRef;
      await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
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
        caseRef,
        params,
        "caseWorker",
      );
    });
  });
});

// CASE MANAGER (FL401 Cases)
test.describe("Case Manager: Send to Gatekeeper (FL401)", () => {
  let caseRef: string = "";

  test.beforeEach(
    async ({ caseManager, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
        .caseRef;
      await navigationUtils.goToCase(
        caseManager.page,
        config.manageCasesBaseURLCase,
        caseRef,
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
        caseRef,
        params,
        "caseManager",
      );
    });
  });
});
