export const SolicitorDraftParentalResponsibilityOrderData = {
  data: {
    draftOrderOptions: "draftAnOrder",
    caseTypeOfApplication: "C100",
    createSelectOrderOptions: "parentalResponsibility",
    daOrderForCaCase: "No",
    isTheOrderByConsent: "Yes",
    wasTheOrderApprovedAtHearing: "No",
    judgeOrMagistrateTitle: "herHonourJudge",
    judgeOrMagistratesLastName: "Test Judge Name",
    justiceLegalAdviserFullName: "Test Legal Adviser Name",
    dateOrderMade: "2026-07-20",
    isTheOrderAboutAllChildren: "Yes",
    recitalsOrPreamble: "Test preamble",
    orderDirections: "Test directions",
    parentName: "Test parent name",
    previewOrderDocWelsh:
      process.env.MANAGE_CASES_TEST_ENV === "demo"
        ? {
            document_url:
              "http://dm-store-demo.service.core-compute-demo.internal/documents/48f043c8-ec55-4aca-9f46-e37c8342f0b6",
            document_binary_url:
              "http://dm-store-demo.service.core-compute-demo.internal/documents/48f043c8-ec55-4aca-9f46-e37c8342f0b6/binary",
            document_filename:
              "Welsh_Parental_Responsibility_Order_C45A_draft.pdf",
          }
        : {
            document_url:
              "http://dm-store-aat.service.core-compute-aat.internal/documents/385543f7-1e30-41ec-8b1f-dd7c69a0449f",
            document_binary_url:
              "http://dm-store-aat.service.core-compute-aat.internal/documents/385543f7-1e30-41ec-8b1f-dd7c69a0449f/binary",
            document_filename:
              "Welsh_Parental_Responsibility_Order_C45A_draft.pdf",
          },
    previewOrderDoc:
      process.env.MANAGE_CASES_TEST_ENV === "demo"
        ? {
            document_url:
              "http://dm-store-demo.service.core-compute-demo.internal/documents/d450f2d5-dbac-4fe5-8288-5698c68f6166",
            document_binary_url:
              "http://dm-store-demo.service.core-compute-demo.internal/documents/d450f2d5-dbac-4fe5-8288-5698c68f6166/binary",
            document_filename: "Parental_Responsibility_Order_C45A_draft.pdf",
          }
        : {
            document_url:
              "http://dm-store-aat.service.core-compute-aat.internal/documents/7e1e3e31-f8c1-4f4c-851a-0145291b47ac",
            document_binary_url:
              "http://dm-store-aat.service.core-compute-aat.internal/documents/7e1e3e31-f8c1-4f4c-851a-0145291b47ac/binary",
            document_filename: "Parental_Responsibility_Order_C45A_draft.pdf",
          },
  },
};

export const SolicitorDraftNonMolestationOrderData = {
  data: {
    draftOrderOptions: "draftAnOrder",
    caseTypeOfApplication: "FL401",
    createSelectOrderOptions: "nonMolestation",
    isTheOrderByConsent: "Yes",
    wasTheOrderApprovedAtHearing: "No",
    judgeOrMagistrateTitle: "herHonourJudge",
    judgeOrMagistratesLastName: "Test Judge Name",
    justiceLegalAdviserFullName: "Test Legal Adviser Name",
    dateOrderMade: "2026-07-20",
    isTheOrderAboutChildren: "No",
    recitalsOrPreamble: "Test preamble",
    orderDirections: "Test directions",
    fl404CustomFields: {
      fl404bMentionedProperty: "Yes",
      fl404bAddressOfProperty: "Test property address",
      orderEndDateAndTimeOptions: "noEndDate",
      fl404bCostOfApplication: "Test",
      fl404bIsNoticeGiven: "WithNotice",
      fl404bDateAndTimeOfNextHearing: "",
      fl404bRespondentNotToThreat: ["respondentNotToThreat"],
    },
    hasJudgeProvidedHearingDetails: "No",
    previewOrderDocWelsh:
      process.env.MANAGE_CASES_TEST_ENV === "demo"
        ? {
            document_url:
              "http://dm-store-demo.service.core-compute-demo.internal/documents/2bd4d6a5-b304-498a-bab5-ef2e868c1142",
            document_binary_url:
              "http://dm-store-demo.service.core-compute-demo.internal/documents/2bd4d6a5-b304-498a-bab5-ef2e868c1142/binary",
            document_filename: "welsh_non_molestation_order_fl404a_draft.pdf",
          }
        : {
            document_url:
              "http://dm-store-aat.service.core-compute-aat.internal/documents/67733608-919b-40fa-b48c-aef22ede02b3",
            document_binary_url:
              "http://dm-store-aat.service.core-compute-aat.internal/documents/67733608-919b-40fa-b48c-aef22ede02b3/binary",
            document_filename: "welsh_non_molestation_order_fl404a_draft.pdf",
          },
    previewOrderDoc:
      process.env.MANAGE_CASES_TEST_ENV === "demo"
        ? {
            document_url:
              "http://dm-store-demo.service.core-compute-demo.internal/documents/7f5c19a9-9613-4b84-b6c3-25b3752df5d8",
            document_binary_url:
              "http://dm-store-demo.service.core-compute-demo.internal/documents/7f5c19a9-9613-4b84-b6c3-25b3752df5d8/binary",
            document_filename: "non_molestation_order_fl404a_draft.pdf",
          }
        : {
            document_url:
              "http://dm-store-aat.service.core-compute-aat.internal/documents/f105140a-8a49-420b-820f-e7328a47b008",
            document_binary_url:
              "http://dm-store-aat.service.core-compute-aat.internal/documents/f105140a-8a49-420b-820f-e7328a47b008/binary",
            document_filename: "non_molestation_order_fl404a_draft.pdf",
          },
  },
};
