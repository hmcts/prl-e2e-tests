import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.js";
import { solicitorCaseCreateType } from "../../../../common/types.js";
import { JudgePagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/judgePages.js";
import { CaseWorkerPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/caseWorkerPages.js";
import { CaseManagerPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/caseManagerPages.js";
import { NavigationUtils } from "../../../../utils/navigation.utils.js";

test.describe("List with notice tests for CA cases", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ judge, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
    await navigationUtils.goToCase(
      judge.page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });
  [
    {
      reason: "noEvidenceOfImmediateRiskOfHarmToTheChildren",
      subject: "Without notice rejection",
      caseNote:
        "There is no evidence of immediate risk of harm to the child[ren]",
      User: "Elizabeth Williams",
    },
  ].forEach((data) => {
    test(`Complete list with notice event for CA cases. @regression @accessibility @nightly`, async ({
      navigationUtils,
      judge,
      caseWorker,
      caseManager,
    }): Promise<void> => {
      await listOnNoticeJourney(
        navigationUtils,
        caseRef,
        "C100",
        judge,
        caseWorker,
        caseManager,
        data,
      );
    });
  });
});

test.describe("List with notice tests for DA cases", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ judge, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
    await navigationUtils.goToCase(
      judge.page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });
  [
    {
      subject: "List on notice - hearing instructions",
      caseNote: "Test admin hearing instructions",
      User: "Elizabeth Williams",
      snapshotName: "fl401-listOnNotice-submit-cya",
      snapshotPath: ["caseProgression", "list"],
    },
  ].forEach((data) => {
    test(`Complete list with notice event for DA cases. @regression @accessibility @nightly`, async ({
      navigationUtils,
      judge,
      caseWorker,
      caseManager,
    }): Promise<void> => {
      await listOnNoticeJourney(
        navigationUtils,
        caseRef,
        "FL401",
        judge,
        caseWorker,
        caseManager,
        data,
      );
    });
  });
});

async function listOnNoticeJourney(
  navigationUtils: NavigationUtils,
  caseRef: string,
  caseType: solicitorCaseCreateType,
  judge: JudgePagesGroup,
  caseWorker: CaseWorkerPagesGroup,
  caseManager: CaseManagerPagesGroup,
  data,
) {
  const { listOnNotice, summaryPage, caseNotesPage } = judge;

  //For C100 cases
  if (caseType === "C100") {
    await Helpers.waitForTask(judge.page, "Gatekeeping");
    await Helpers.chooseEventFromDropdown(judge.page, "List on notice");

    await listOnNotice.listOnNotice1Page.assertPageContents();
    await listOnNotice.listOnNotice1Page.verifyAccessibility();
    await listOnNotice.listOnNotice1Page.checkReason(data.reason);
    await listOnNotice.listOnNotice1Page.clickContinue();

    await listOnNotice.listOnNotice2Page.assertPageContents();
    await listOnNotice.listOnNotice2Page.verifyAccessibility();
    await listOnNotice.listOnNotice2Page.clickContinue();

    await listOnNotice.listOnNotice3Page.assertPageContents();
    await listOnNotice.listOnNotice3Page.verifyAccessibility();
    await listOnNotice.listOnNotice3Page.clickSubmit();

    await Helpers.clickTab(judge.page, "Tasks");
    await Helpers.waitForTaskToDisappear(judge.page, "Gatekeeping");
  }

  //For FL401 cases
  if (caseType === "FL401") {
    await Helpers.waitForTask(judge.page, "Directions on Issue");
    await Helpers.assignTaskToMe(judge.page, "Directions on Issue");
    await Helpers.chooseEventFromDropdown(judge.page, "List on notice");

    await listOnNotice.fl401ListOnNotice2Page.assertPageContents();
    await listOnNotice.fl401ListOnNotice2Page.verifyAccessibility();
    await listOnNotice.fl401ListOnNotice2Page.giveInstructions(data.caseNote);
    await listOnNotice.fl401ListOnNotice2Page.clickContinue();

    await listOnNotice.fl401OnNoticeSubmitPage.assertPageContents(
      data.snapshotPath,
      data.snapshotName,
    );
    await listOnNotice.fl401OnNoticeSubmitPage.verifyAccessibility();
    await listOnNotice.fl401OnNoticeSubmitPage.clickSubmit();

    await listOnNotice.fl401ListOnNoticeConfirmPage.assertPageContents();
    await listOnNotice.fl401ListOnNoticeConfirmPage.verifyAccessibility();
    await listOnNotice.fl401ListOnNoticeConfirmPage.clickCloseAndReturnToCaseDetails();

    //***** Assertions  ********** //
    await summaryPage.alertBanner.assertEventAlert(caseRef, "List on notice");
    await Helpers.clickTab(judge.page, "Tasks");
    await Helpers.waitForTaskToDisappear(judge.page, "Directions on Issue");
  }

  // check case notes are updated
  await caseNotesPage.goToPage();
  await caseNotesPage.verifyCaseNotes([
    {
      subject: data.subject,
      caseNote: data.caseNote,
      User: data.User,
    },
  ]);

  //check if list on notice task is getting initiated for HCA and Case manager
  await navigationUtils.goToCase(
    caseWorker.page,
    config.manageCasesBaseURLCase,
    caseRef,
    "tasks",
  );
  await Helpers.waitForTask(
    caseWorker.page,
    "Listing instructions (refer to case notes)",
  );

  await navigationUtils.goToCase(
    caseManager.page,
    config.manageCasesBaseURLCase,
    caseRef,
    "tasks",
  );
  await Helpers.waitForTask(
    caseManager.page,
    "Listing instructions (refer to case notes)",
  );
}
