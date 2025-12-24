import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

test.describe("Send and reply to messages between court admin and judge for a C100 case tests", () => {
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

  [
    {
      isJudge: true,
      judgeOrLegalAdviserName: "Ms Elizabeth Williams",
      judgeTier: "Circuit Judge",
      sendSnapshotName: "send_message_caseworker",
      respondToMessage: true,
      replySnapshotName: "reply_yes_message_judge",
    },
  ].forEach(
    ({
      isJudge,
      judgeOrLegalAdviserName,
      judgeTier,
      respondToMessage,
      sendSnapshotName,
      replySnapshotName,
    }) => {
      test(`Complete send and reply messages event between court admin and judge with required response. 
  @regression @accessibility @nightly`, async ({
        caseWorker,
        judge,
        navigationUtils,
      }) => {
        //const { summaryPage, sendAndReplyToMessages } = caseWorker;

        //send as a case worker
        await sendMessageToJudgeOrLegalAdvisorJourney(
          caseWorker,
          caseNumber,
          isJudge,
          judgeTier,
          judgeOrLegalAdviserName,
          sendSnapshotName,
        );

        //reply as a judge or Legal advisor
        await navigationUtils.goToCase(
          judge.page,
          config.manageCasesBaseURLCase,
          caseNumber,
          "summary",
        );

        await replyToCourtAdminJourney(
          judge,
          caseNumber,
          respondToMessage,
          judgeOrLegalAdviserName,
          replySnapshotName,
        );
      });
    },
  );

  [
    {
      isJudge: true,
      judgeOrLegalAdviserName: "Ms Elizabeth Williams",
      judgeTier: "Circuit Judge",
      sendSnapshotName: "send_message_caseworker",
      respondToMessage: false,
      replySnapshotName: "reply_no_message_judge",
    },
  ].forEach(
    ({
      isJudge,
      judgeOrLegalAdviserName,
      judgeTier,
      respondToMessage,
      sendSnapshotName,
      replySnapshotName,
    }) => {
      test(`Complete send and reply messages event between court admin and judge without required response.
  @regression @accessibility`, async ({
        caseWorker,
        judge,
        navigationUtils,
      }) => {
        //send as a case worker
        await sendMessageToJudgeOrLegalAdvisorJourney(
          caseWorker,
          caseNumber,
          isJudge,
          judgeTier,
          judgeOrLegalAdviserName,
          sendSnapshotName,
        );

        //reply as a judge or Legal Advisor
        await navigationUtils.goToCase(
          judge.page,
          config.manageCasesBaseURLCase,
          caseNumber,
          "summary",
        );

        await replyToCourtAdminJourney(
          judge,
          caseNumber,
          respondToMessage,
          judgeOrLegalAdviserName,
          replySnapshotName,
        );
      });
    },
  );
});

/**
 * Sending message to judge or legal advisor as a court admin
 */
async function sendMessageToJudgeOrLegalAdvisorJourney(
  caseWorker,
  caseNumber: string,
  isJudge: boolean,
  judgeTier: string,
  judgeOrLegalAdviserName: string,
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
    judgeTier,
  );
  await sendAndReplyToMessages.sendAndReplyToMessages2page.clickContinue();

  await sendAndReplyToMessages.sendAndReplyToMessages3Page.assertPageContents();
  await sendAndReplyToMessages.sendAndReplyToMessages3Page.verifyAccessibility();
  await sendAndReplyToMessages.sendAndReplyToMessages3Page.enterMessage();
  await sendAndReplyToMessages.sendAndReplyToMessages3Page.clickContinue();

  await sendAndReplyToMessages.sendAndReplyToMessagesSubmitPage.assertPageContents(
    ["caseProgression", "c100SendAndReplyToMessages"],
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
  judge,
  caseNumber: string,
  respondToMessage: boolean,
  judgeOrLegalAdviserName: string,
  replySnapshotName: string,
) {
  const { sendAndReplyToMessages, summaryPage } = judge;

  await summaryPage.chooseEventFromDropdown("Send and reply to messages");
  await sendAndReplyToMessages.sendAndReplyToMessages1Page.assertPageContents();
  // TODO Disabled pending ticket FPET:1211
  //await sendAndReplyToMessages.sendAndReplyToMessages1Page.verifyAccessibility();
  await sendAndReplyToMessages.sendAndReplyToMessages1Page.selectReply();
  await sendAndReplyToMessages.sendAndReplyToMessages1Page.clickContinue();

  //To-Do include case-type to handle CA/DA docs
  await sendAndReplyToMessages.sendAndReplyToMessages4Page.assertPageContents(
    judgeOrLegalAdviserName,
    "C100",
  );
  // TODO Disabled pending ticket FPET:1211
  //await sendAndReplyToMessages.sendAndReplyToMessages4Page.verifyAccessibility();
  await sendAndReplyToMessages.sendAndReplyToMessages4Page.respondToMessage(
    respondToMessage,
  );
  await sendAndReplyToMessages.sendAndReplyToMessages4Page.clickContinue();

  if (respondToMessage) {
    await sendAndReplyToMessages.sendAndReplyToMessages5Page.assertPageContents(
      judgeOrLegalAdviserName,
      "C100",
    );
    // TODO Disabled pending ticket FPET:1211
    //await sendAndReplyToMessages.sendAndReplyToMessages5Page.verifyAccessibility();
    await sendAndReplyToMessages.sendAndReplyToMessages5Page.replyMessageContent();
    await sendAndReplyToMessages.sendAndReplyToMessages5Page.clickContinue();
  }

  await sendAndReplyToMessages.sendAndReplyToMessagesSubmitPage.assertPageContents(
    ["caseProgression", "c100SendAndReplyToMessages"],
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
