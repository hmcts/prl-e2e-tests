export const C100SendAndReplyToMessagesScenarios = [
  {
    isJudge: true,
    judgeOrLegalAdviserName: "Ms Elizabeth Williams",
    judgeOrLegalAdviserEmail: process.env.JUDGE_USERNAME,
    respondToMessage: true,
    snapshotPath: ["caseProgression", "c100SendAndReplyToMessages"],
    sendSnapshotName: "send_message_caseworkerToJudge",
    replySnapshotName: "reply_yes_message_judge",
  },
  {
    isJudge: true,
    judgeOrLegalAdviserName: "Ms Elizabeth Williams",
    judgeOrLegalAdviserEmail: process.env.JUDGE_USERNAME,
    respondToMessage: false,
    snapshotPath: ["caseProgression", "c100SendAndReplyToMessages"],
    sendSnapshotName: "send_message_caseworkerToJudge",
    replySnapshotName: "reply_no_message_judge",
  },
];

export const FL401SendAndReplyToMessagesScenarios = [
  {
    isJudge: false,
    judgeOrLegalAdviserName:
      process.env.MANAGE_CASES_TEST_ENV === "demo"
        ? "Prl legal advisor"
        : "prl legaladvisor-swansea-two",
    judgeOrLegalAdviserEmail: process.env.LEGALADVISOR_USERNAME,
    respondToMessage: true,
    snapshotPath: ["caseProgression", "fl401SendAndReplyToMessages"],
    sendSnapshotName: "send_message_caseworkerToLegalAdvisor",
    replySnapshotName: "reply_yes_message_legalAdvisor",
  },
  {
    isJudge: false,
    judgeOrLegalAdviserName:
      process.env.MANAGE_CASES_TEST_ENV === "demo"
        ? "Prl legal advisor"
        : "prl legaladvisor-swansea-two",
    judgeOrLegalAdviserEmail: process.env.LEGALADVISOR_USERNAME,
    respondToMessage: false,
    snapshotPath: ["caseProgression", "fl401SendAndReplyToMessages"],
    sendSnapshotName: "send_message_caseworkerToLegalAdvisor",
    replySnapshotName: "reply_no_message_legalAdvisor",
  },
];
