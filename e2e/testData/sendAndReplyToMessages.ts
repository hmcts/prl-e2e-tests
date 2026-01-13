export const C100SendAndReplyToMessagesScenarios = [
  {
    isJudge: true,
    judgeOrLegalAdviserName: "Ms Elizabeth Williams",
    respondToMessage: true,
    snapshotPath: ["caseProgression", "c100SendAndReplyToMessages"],
    sendSnapshotName: "send_message_caseworkerToJudge",
    replySnapshotName: "reply_yes_message_judge",
  },
  {
    isJudge: true,
    judgeOrLegalAdviserName: "Ms Elizabeth Williams",
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
        ? "Prl legal advisor (prl_demo_la_swansea@justice.gov.uk)"
        : "prl legaladvisor-swansea-two (prl_legaladvisor_swansea@justice.gov.uk)",
    respondToMessage: true,
    snapshotPath: ["caseProgression", "fl401SendAndReplyToMessages"],
    sendSnapshotName: "send_message_caseworkerToLegalAdvisor",
    replySnapshotName: "reply_yes_message_legalAdvisor",
  },
  {
    isJudge: false,
    judgeOrLegalAdviserName:
      process.env.MANAGE_CASES_TEST_ENV === "demo"
        ? "Prl legal advisor (prl_demo_la_swansea@justice.gov.uk)"
        : "prl legaladvisor-swansea-two (prl_legaladvisor_swansea@justice.gov.uk)",
    respondToMessage: false,
    snapshotPath: ["caseProgression", "fl401SendAndReplyToMessages"],
    sendSnapshotName: "send_message_caseworkerToLegalAdvisor",
    replySnapshotName: "reply_no_message_legalAdvisor",
  },
];
