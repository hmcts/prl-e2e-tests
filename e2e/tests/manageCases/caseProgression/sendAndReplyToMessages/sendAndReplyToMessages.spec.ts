import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";
import {
  C100SendAndReplyToMessagesScenarios,
  FL401SendAndReplyToMessagesScenarios,
} from "../../../../testData/sendAndReplyToMessages.js";
import { CaseWorkerPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/caseWorkerPages.ts";
import { JudgePagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/judgePages.js";
import { LegalAdvisorPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/legalAdvisorPages.js";

// -------------------------------
// C100 CASE TYPE: Send and reply for judges
// -------------------------------
test.describe("C100 Send & Reply to messages scenarios", () => {
  let caseNumber: string;

  test.beforeEach(
    async ({ caseWorker, browser, caseEventUtils, navigationUtils }) => {
      caseNumber =
        await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  C100SendAndReplyToMessagesScenarios.forEach((scenario) => {
    const {
      isJudge,
      judgeOrLegalAdviserName,
      respondToMessage,
      snapshotPath,
      sendSnapshotName,
      replySnapshotName,
    } = scenario;

    test(`Complete C100 send and reply messages event between court admin and judge with : response=${respondToMessage}. 
  @regression @accessibility @nightly`, async ({
      caseWorker,
      judge,
      navigationUtils,
    }) => {
      await sendMessageToJudgeOrLegalAdvisorJourney(
        caseWorker,
        caseNumber,
        isJudge,
        judgeOrLegalAdviserName,
        snapshotPath,
        sendSnapshotName,
      );

      await navigationUtils.goToCase(
        judge.page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "summary",
      );

      await replyToCourtAdminJourney(
        "C100",
        isJudge,
        judge,
        caseNumber,
        respondToMessage,
        judgeOrLegalAdviserName,
        snapshotPath,
        replySnapshotName,
      );
    });
  });
});

// -------------------------------
// FL401 CASE TYPE:Send and reply for Legal Advisors
// -------------------------------
test.describe("FL401 Send & Reply to messages scenarios", () => {
  let caseNumber: string;

  test.beforeEach(
    async ({ caseWorker, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createDACase(browser);
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  FL401SendAndReplyToMessagesScenarios.forEach((scenario) => {
    const {
      isJudge,
      judgeOrLegalAdviserName,
      respondToMessage,
      snapshotPath,
      sendSnapshotName,
      replySnapshotName,
    } = scenario;

    test(`Complete FL401 send and reply messages event between court admin and legal advisor with : response=${respondToMessage}. 
  @regression @accessibility @nightly`, async ({
      caseWorker,
      legalAdvisor,
      navigationUtils,
    }) => {
      await sendMessageToJudgeOrLegalAdvisorJourney(
        caseWorker,
        caseNumber,
        isJudge,
        judgeOrLegalAdviserName,
        snapshotPath,
        sendSnapshotName,
      );

      await navigationUtils.goToCase(
        legalAdvisor.page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "summary",
      );

      await replyToCourtAdminJourney(
        "FL401",
        isJudge,
        legalAdvisor,
        caseNumber,
        respondToMessage,
        judgeOrLegalAdviserName,
        snapshotPath,
        replySnapshotName,
      );
    });
  });
});

/**
 * Sending message to judge or legal advisor as a court admin
 */
async function sendMessageToJudgeOrLegalAdvisorJourney(
  caseWorker: CaseWorkerPagesGroup,
  caseNumber: string,
  isJudge: boolean,
  judgeOrLegalAdviserName: string,
  snapshotPath: string[],
  sendSnapshotName: string,
) {
  const { sendAndReplyToMessages, summaryPage } = caseWorker;

  await summaryPage.chooseEventFromDropdown("Send and reply to messages");
  await sendAndReplyToMessages.sendAndReplyToMessages1Page.assertPageContents();
  // TODO Disabled pending ticket FPET:1211
  //await sendAndReplyToMessages.sendAndReplyToMessages1Page.verifyAccessibility();
  await sendAndReplyToMessages.sendAndReplyToMessages1Page.selectSend();
  await sendAndReplyToMessages.sendAndReplyToMessages1Page.clickContinue();

  await sendAndReplyToMessages.sendAndReplyToMessages2page.assertPageContents();
  await sendAndReplyToMessages.sendAndReplyToMessages2page.verifyAccessibility();
  await sendAndReplyToMessages.sendAndReplyToMessages2page.selectJudgeOrLegalAdviser(
    isJudge,
    judgeOrLegalAdviserName,
  );
  await sendAndReplyToMessages.sendAndReplyToMessages2page.clickContinue();

  await sendAndReplyToMessages.sendAndReplyToMessages3Page.assertPageContents();
  await sendAndReplyToMessages.sendAndReplyToMessages3Page.verifyAccessibility();
  await sendAndReplyToMessages.sendAndReplyToMessages3Page.enterMessage();
  await sendAndReplyToMessages.sendAndReplyToMessages3Page.clickContinue();

  await sendAndReplyToMessages.sendAndReplyToMessagesSubmitPage.assertPageContents(
    snapshotPath,
    sendSnapshotName,
  );
  await sendAndReplyToMessages.sendAndReplyToMessagesSubmitPage.clickSaveAndContinue();
  // TODO Disabled pending ticket FPET:1211
  //await sendAndReplyToMessages.sendAndReplyToMessagesSubmitPage.verifyAccessibility();

  await summaryPage.alertBanner.assertEventAlert(
    caseNumber,
    "Send and reply to messages",
  );
}

/**
 * Replying message to court admin as a judge or legal advisor
 */
async function replyToCourtAdminJourney(
  caseType: string,
  isJudge: boolean,
  actor: JudgePagesGroup | LegalAdvisorPagesGroup,
  caseNumber: string,
  respondToMessage: boolean,
  judgeOrLegalAdviserName: string,
  snapshotPath: string[],
  replySnapshotName: string,
) {
  const { sendAndReplyToMessages, summaryPage } = actor;

  await summaryPage.chooseEventFromDropdown("Send and reply to messages");
  await sendAndReplyToMessages.sendAndReplyToMessages1Page.assertPageContents();
  // TODO Disabled pending ticket FPET:1211
  //await sendAndReplyToMessages.sendAndReplyToMessages1Page.verifyAccessibility();
  await sendAndReplyToMessages.sendAndReplyToMessages1Page.selectReply();
  await sendAndReplyToMessages.sendAndReplyToMessages1Page.clickContinue();

  await sendAndReplyToMessages.sendAndReplyToMessages4Page.assertPageContents(
    isJudge,
    judgeOrLegalAdviserName,
    caseType,
  );
  // TODO Disabled pending ticket FPET:1211
  //await sendAndReplyToMessages.sendAndReplyToMessages4Page.verifyAccessibility();
  await sendAndReplyToMessages.sendAndReplyToMessages4Page.respondToMessage(
    respondToMessage,
  );
  await sendAndReplyToMessages.sendAndReplyToMessages4Page.clickContinue();

  if (respondToMessage) {
    await sendAndReplyToMessages.sendAndReplyToMessages5Page.assertPageContents(
      isJudge,
      judgeOrLegalAdviserName,
      caseType,
    );
    // TODO Disabled pending ticket FPET:1211
    //await sendAndReplyToMessages.sendAndReplyToMessages5Page.verifyAccessibility();
    await sendAndReplyToMessages.sendAndReplyToMessages5Page.replyMessageContent();
    await sendAndReplyToMessages.sendAndReplyToMessages5Page.clickContinue();
  }

  await sendAndReplyToMessages.sendAndReplyToMessagesSubmitPage.assertPageContents(
    snapshotPath,
    replySnapshotName,
  );
  await sendAndReplyToMessages.sendAndReplyToMessagesSubmitPage.clickSaveAndContinue();

  if (respondToMessage) {
    await sendAndReplyToMessages.sendAndReplyToMessagesConfirmPage.assertPageContents();
    // TODO Disabled pending ticket FPET:1211
    //await sendAndReplyToMessages.sendAndReplyToMessagesConfirmPage.verifyAccessibility();
    await sendAndReplyToMessages.sendAndReplyToMessagesConfirmPage.clickCloseAndReturnToCaseDetails();
  }

  await summaryPage.alertBanner.assertEventAlert(
    caseNumber,
    "Send and reply to messages",
  );
}