import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.js";
import { solicitorCaseCreateType } from "../../../../common/types.js";
import { JudgePagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/judgePages.js";
import { CaseWorkerPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/caseWorkerPages.js";
import { CaseManagerPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/caseManagerPages.js";
import { NavigationUtils } from "../../../../utils/navigation.utils.js";

test.describe("List without notice tests for CA cases", () => {
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
      subject: "List without notice",
      caseNote: "Test admin hearing instructions",
      User: "Elizabeth Williams",
      snapshotName: "c100-listWithoutNotice-submit-cya",
      snapshotPath: ["caseProgression", "list"],
    },
  ].forEach((data) => {
    test(`Complete list without notice event for CA cases. @regression @accessibility @nightly`, async ({
      navigationUtils,
      judge,
      caseWorker,
      caseManager,
    }): Promise<void> => {
      await listWithoutNoticeJourney(
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

test.describe("List without notice tests for DA cases", () => {
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
      subject: "List without notice",
      caseNote: "Test admin hearing instructions",
      User: "Elizabeth Williams",
      snapshotName: "fl401-listWithoutNotice-submit-cya",
      snapshotPath: ["caseProgression", "list"],
    },
  ].forEach((data) => {
    test(`Complete list without notice event for DA Cases. @regression @accessibility @nightly`, async ({
      navigationUtils,
      judge,
      caseWorker,
      caseManager,
    }): Promise<void> => {
      await listWithoutNoticeJourney(
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

async function listWithoutNoticeJourney(
  navigationUtils: NavigationUtils,
  caseRef: string,
  caseType: solicitorCaseCreateType,
  judge: JudgePagesGroup,
  caseWorker: CaseWorkerPagesGroup,
  caseManager: CaseManagerPagesGroup,
  data,
) {
  const { listWithoutNotice, summaryPage, caseNotesPage } = judge;
  
  if (caseType === "C100") {
    await Helpers.waitForTask(judge.page, "Gatekeeping");
  } else {
    await Helpers.waitForTask(judge.page, "Directions on Issue");
    await Helpers.assignTaskToMe(judge.page, "Directions on Issue");
  }

  await Helpers.chooseEventFromDropdown(judge.page, "List without notice");
  await listWithoutNotice.listWithoutNotice1Page.assertPageContents();
  await listWithoutNotice.listWithoutNotice1Page.verifyAccessibility();
  await listWithoutNotice.listWithoutNotice1Page.giveInstructions(
    data.caseNote,
  );
  await listWithoutNotice.listWithoutNotice1Page.clickContinue();

  await listWithoutNotice.listWithoutNoticeSubmitPage.assertPageContents(
    data.snapshotPath,
    data.snapshotName,
  );
  await listWithoutNotice.listWithoutNoticeSubmitPage.verifyAccessibility();
  await listWithoutNotice.listWithoutNoticeSubmitPage.clickSubmit();

  await listWithoutNotice.listWithoutNoticeConfirmPage.assertPageContents();
  await listWithoutNotice.listWithoutNoticeConfirmPage.verifyAccessibility();
  await listWithoutNotice.listWithoutNoticeConfirmPage.clickCloseAndReturnToCaseDetails();

  //***** Assertions  ********** //
  await summaryPage.alertBanner.assertEventAlert(
    caseRef,
    "List without notice",
  );
  await Helpers.clickTab(judge.page, "Tasks");
  if (caseType === "C100") {
    await Helpers.waitForTaskToDisappear(judge.page, "Gatekeeping");
  } else {
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

  //check if list without notice task is getting initiated for HCA and Case manager
  await navigationUtils.goToCase(
    caseWorker.page,
    config.manageCasesBaseURLCase,
    caseRef,
    "tasks",
  );
  await Helpers.waitForTask(
    caseWorker.page,
    "List without notice hearing (see case notes)",
  );

  await navigationUtils.goToCase(
    caseManager.page,
    config.manageCasesBaseURLCase,
    caseRef,
    "tasks",
  );
  await Helpers.waitForTask(
    caseManager.page,
    "List without notice hearing (see case notes)",
  );
}
