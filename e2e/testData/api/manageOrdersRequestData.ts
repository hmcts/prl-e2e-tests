export interface ManageOrdersRequestData {
  caseWorkerDraftOrderData?;
  finalOrderData?;
  createAndServeOrderData?;
  judgeDraftOrderData?;
  judgeEditAndApproveDraftedOrderData?;
}

export const PowerOfArrestOrderActionData: ManageOrdersRequestData = {
  caseWorkerDraftOrderData: {
    data: {
      caseTypeOfApplication: "FL401",
      manageOrdersOptions: "createAnOrder",
      createSelectOrderOptions: "powerOfArrest",
      isTheOrderByConsent: "Yes",
      wasTheOrderApprovedAtHearing: "No",
      judgeOrMagistrateTitle: "herHonourJudge",
      judgeOrMagistratesLastName: "Test Judge Name",
      justiceLegalAdviserFullName: "Test Legal Adviser Name",
      dateOrderMade: "2026-07-13",
      isTheOrderAboutChildren: "No",
      recitalsOrPreamble: "Test preamble",
      orderDirections: "Test directions",
      fl404CustomFields: {
        fl404bPowerOfArrestParagraph: "Test paragraphs",
        fl404bRiskOfSignificantHarm: "Yes",
        fl404bDateOrderEnd: "2026-07-13T00:00:00.000",
      },
      previewOrderDocWelsh:
        process.env.MANAGE_CASES_TEST_ENV === "demo"
          ? {
              document_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/a6789d89-d02d-486d-ba89-607c99ef5580",
              document_binary_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/a6789d89-d02d-486d-ba89-607c99ef5580/binary",
              document_filename: "Welsh_Power_of_arrest_draft.pdf",
            }
          : {
              document_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/ea0f8853-f4a2-4bc0-967f-f371774e70c1",
              document_binary_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/ea0f8853-f4a2-4bc0-967f-f371774e70c1/binary",
              document_filename: "Welsh_Power_of_arrest_draft.pdf",
            },
      previewOrderDoc:
        process.env.MANAGE_CASES_TEST_ENV === "demo"
          ? {
              document_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/709f0751-7b7b-49d2-9d7b-61dffe547dd3",
              document_binary_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/709f0751-7b7b-49d2-9d7b-61dffe547dd3/binary",
              document_filename: "Power_of_arrest_draft.pdf",
            }
          : {
              document_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/925b1a8f-b7e5-40f2-8510-f88feb5230f9",
              document_binary_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/925b1a8f-b7e5-40f2-8510-f88feb5230f9/binary",
              document_filename: "Power_of_arrest_draft.pdf",
            },
      amendOrderSelectCheckOptions: "noCheck",
      selectTypeOfOrder: "general",
      localAuthorityNeedToProvideReport: "No",
      doYouWantToServeOrder: "No",
      whatDoWithOrder: "saveAsDraft",
    },
  },
  finalOrderData: {
    data: {
      caseTypeOfApplication: "FL401",
      manageOrdersOptions: "createAnOrder",
      createSelectOrderOptions: "powerOfArrest",
      isTheOrderByConsent: "Yes",
      wasTheOrderApprovedAtHearing: "No",
      judgeOrMagistrateTitle: "herHonourJudge",
      judgeOrMagistratesLastName: "Test Judge Name",
      justiceLegalAdviserFullName: "Test Legal Adviser Name",
      dateOrderMade: "2026-07-13",
      isTheOrderAboutChildren: "No",
      recitalsOrPreamble: "Test preamble",
      orderDirections: "Test directions",
      fl404CustomFields: {
        fl404bPowerOfArrestParagraph: "Test paragraphs",
        fl404bRiskOfSignificantHarm: "Yes",
        fl404bDateOrderEnd: "2026-07-13T00:00:00.000",
      },
      amendOrderSelectCheckOptions: "noCheck",
      selectTypeOfOrder: "general",
      localAuthorityNeedToProvideReport: "No",
      doYouWantToServeOrder: "No",
      whatDoWithOrder: "finalizeSaveToServeLater",
    },
  },
  createAndServeOrderData: {
    data: {
      caseTypeOfApplication: "FL401",
      manageOrdersOptions: "createAnOrder",
      createSelectOrderOptions: "powerOfArrest",
      isTheOrderByConsent: "Yes",
      wasTheOrderApprovedAtHearing: "No",
      judgeOrMagistrateTitle: "herHonourJudge",
      judgeOrMagistratesLastName: "Test Judge Name",
      justiceLegalAdviserFullName: "Test Legal Adviser Name",
      dateOrderMade: "2026-07-13",
      isTheOrderAboutChildren: "No",
      recitalsOrPreamble: "Test preamble",
      orderDirections: "Test directions",
      fl404CustomFields: {
        fl404bPowerOfArrestParagraph: "Test paragraphs",
        fl404bRiskOfSignificantHarm: "Yes",
        fl404bDateOrderEnd: "2026-07-13T00:00:00.000",
      },
      amendOrderSelectCheckOptions: "noCheck",
      selectTypeOfOrder: "general",
      localAuthorityNeedToProvideReport: "No",
      doYouWantToServeOrder: "Yes",
      serveOrderDynamicList: {
        value: [
          {
            code: "62c181e0-f8b4-4da0-bebf-fa857d47ce33",
            label: "Power of arrest (FL406) - 13 Jul 2026",
          },
        ],
      },
      ordersNeedToBeServed: "Yes",
      isOnlyC47aOrderSelectedToServe: "No",
      displayLegalRepOption: "Yes",
      serveToRespondentOptions: "Yes",
      personallyServeRespondentsOptions: "courtAdmin",
    },
  },
  judgeDraftOrderData: {
    data: {
      caseTypeOfApplication: "FL401",
      manageOrdersOptions: "createAnOrder",
      isSdoSelected: "No",
      loggedInUserType: "JUDGE",
      isInvokedFromTask: "No",
      createSelectOrderOptions: "powerOfArrest",
      daOrderForCaCase: "No",
      isTheOrderByConsent: "Yes",
      wasTheOrderApprovedAtHearing: "No",
      judgeOrMagistrateTitle: "circuitJudge",
      judgeOrMagistratesLastName: "Elizabeth Williams",
      justiceLegalAdviserFullName: "Test Legal Adviser Name",
      dateOrderMade: "2026-07-20",
      isTheOrderAboutChildren: "No",
      recitalsOrPreamble: "Test preamble",
      orderDirections: "Test directions",
      fl404CustomFields: {
        fl404bPowerOfArrestParagraph: "Test paragraphs",
        fl404bRiskOfSignificantHarm: "Yes",
        fl404bDateOrderEnd: "2026-07-20T00:00:00.000",
      },
      previewOrderDocWelsh:
        process.env.MANAGE_CASES_TEST_ENV === "demo"
          ? {
              document_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/a6789d89-d02d-486d-ba89-607c99ef5580",
              document_binary_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/a6789d89-d02d-486d-ba89-607c99ef5580/binary",
              document_filename: "Welsh_Power_of_arrest_draft.pdf",
            }
          : {
              document_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/fb12dd45-ad98-4de5-a79a-a9d97d766499",
              document_binary_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/fb12dd45-ad98-4de5-a79a-a9d97d766499/binary",
              document_filename: "Welsh_Power_of_arrest_draft.pdf",
            },
      previewOrderDoc:
        process.env.MANAGE_CASES_TEST_ENV === "demo"
          ? {
              document_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/709f0751-7b7b-49d2-9d7b-61dffe547dd3",
              document_binary_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/709f0751-7b7b-49d2-9d7b-61dffe547dd3/binary",
              document_filename: "Power_of_arrest_draft.pdf",
            }
          : {
              document_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/e1410277-9b94-42b4-9399-ba0f81e93957",
              document_binary_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/e1410277-9b94-42b4-9399-ba0f81e93957/binary",
              document_filename: "Power_of_arrest_draft.pdf",
            },
      judgeDirectionsToAdmin: "Test directions to admin",
      isOrderCompleteToServe: "No",
    },
  },
};

export const AmendDischargedVariedOrderActionData: ManageOrdersRequestData = {
  caseWorkerDraftOrderData: {
    data: {
      caseTypeOfApplication: "FL401",
      manageOrdersOptions: "createAnOrder",
      createSelectOrderOptions: "amendDischargedVaried",
      isTheOrderByConsent: "Yes",
      wasTheOrderApprovedAtHearing: "No",
      judgeOrMagistrateTitle: "herHonourJudge",
      judgeOrMagistratesLastName: "Test Judge Name",
      justiceLegalAdviserFullName: "Test Legal Adviser Name",
      dateOrderMade: "2026-07-14",
      isTheOrderAboutChildren: "No",
      recitalsOrPreamble: "Test preamble",
      orderDirections: "Test directions",
      fl404CustomFields: {
        fl404bHearingOutcome: "Test hearing outcome",
      },
      previewOrderDocWelsh:
        process.env.MANAGE_CASES_TEST_ENV === "demo"
          ? {
              document_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/3137f42e-f7b2-4485-aa9d-b842909405d8",
              document_binary_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/3137f42e-f7b2-4485-aa9d-b842909405d8/binary",
              document_filename:
                "welsh_amended_discharged_or_varied_order_fl404b_draft.pdf",
            }
          : {
              document_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/d8507989-df5c-4520-acc4-902c134078de",
              document_binary_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/d8507989-df5c-4520-acc4-902c134078de/binary",
              document_filename:
                "welsh_amended_discharged_or_varied_order_fl404b_draft.pdf",
            },
      previewOrderDoc:
        process.env.MANAGE_CASES_TEST_ENV === "demo"
          ? {
              document_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/c7b7d9b7-7418-422d-a877-1b06de8cd588",
              document_binary_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/c7b7d9b7-7418-422d-a877-1b06de8cd588/binary",
              document_filename:
                "amended_discharged_or_varied_order_fl404b_draft.pdf",
            }
          : {
              document_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/f5c12ba2-335d-41d2-87a0-f8b134dc0c2a",
              document_binary_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/f5c12ba2-335d-41d2-87a0-f8b134dc0c2a/binary",
              document_filename:
                "amended_discharged_or_varied_order_fl404b_draft.pdf",
            },
      amendOrderSelectCheckOptions: "noCheck",
      selectTypeOfOrder: "general",
      localAuthorityNeedToProvideReport: "No",
      doYouWantToServeOrder: "No",
      whatDoWithOrder: "saveAsDraft",
    },
  },
  finalOrderData: {
    data: {
      caseTypeOfApplication: "FL401",
      manageOrdersOptions: "createAnOrder",
      createSelectOrderOptions: "amendDischargedVaried",
      isTheOrderByConsent: "Yes",
      wasTheOrderApprovedAtHearing: "No",
      judgeOrMagistrateTitle: "herHonourJudge",
      judgeOrMagistratesLastName: "Test Judge Name",
      justiceLegalAdviserFullName: "Test Legal Adviser Name",
      dateOrderMade: "2026-07-14",
      isTheOrderAboutChildren: "No",
      recitalsOrPreamble: "Test preamble",
      orderDirections: "Test directions",
      fl404CustomFields: {
        fl404bHearingOutcome: "Test hearing outcome",
      },
      amendOrderSelectCheckOptions: "noCheck",
      selectTypeOfOrder: "general",
      localAuthorityNeedToProvideReport: "No",
      doYouWantToServeOrder: "No",
      whatDoWithOrder: "finalizeSaveToServeLater",
    },
  },
  createAndServeOrderData: {
    data: {
      caseTypeOfApplication: "FL401",
      manageOrdersOptions: "createAnOrder",
      createSelectOrderOptions: "amendDischargedVaried",
      isTheOrderByConsent: "Yes",
      wasTheOrderApprovedAtHearing: "No",
      judgeOrMagistrateTitle: "herHonourJudge",
      judgeOrMagistratesLastName: "Test Judge Name",
      justiceLegalAdviserFullName: "Test Legal Adviser Name",
      dateOrderMade: "2026-07-14",
      isTheOrderAboutChildren: "No",
      recitalsOrPreamble: "Test preamble",
      orderDirections: "Test directions",
      fl404CustomFields: {
        fl404bHearingOutcome: "Test hearing outcome",
      },
      isCafcassCymru: "Yes",
      isFL401ApplicantPresent: "Yes",
      isFL401ApplicantSolicitorPresent: "Yes",
      isFL401RespondentPresent: "Yes",
      isFL401RespondentSolicitorPresent: "No",
      amendOrderSelectCheckOptions: "noCheck",
      selectTypeOfOrder: "general",
      localAuthorityNeedToProvideReport: "No",
      doYouWantToServeOrder: "Yes",
      serveOrderDynamicList: {
        value: [
          {
            code: "c1d015ce-03f3-4b8c-8f67-0f23eee2318a",
            label: "Amended, discharged or varied order (FL404B) - 14 Jul 2026",
          },
        ],
      },
      ordersNeedToBeServed: "Yes",
      displayLegalRepOption: "Yes",
      serveToRespondentOptions: "Yes",
      personallyServeRespondentsOptions: "courtAdmin",
    },
  },
  judgeDraftOrderData: {
    data: {
      caseTypeOfApplication: "FL401",
      manageOrdersOptions: "createAnOrder",
      loggedInUserType: "JUDGE",
      isInvokedFromTask: "No",
      createSelectOrderOptions: "amendDischargedVaried",
      daOrderForCaCase: "No",
      isTheOrderByConsent: "Yes",
      wasTheOrderApprovedAtHearing: "No",
      judgeOrMagistrateTitle: "circuitJudge",
      judgeOrMagistratesLastName: "Elizabeth Williams",
      justiceLegalAdviserFullName: "Test Legal Adviser Name",
      dateOrderMade: "2026-07-20",
      isTheOrderAboutChildren: "No",
      recitalsOrPreamble: "Test preamble",
      orderDirections: "Test directions",
      previewOrderDocWelsh:
        process.env.MANAGE_CASES_TEST_ENV === "demo"
          ? {
              document_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/3137f42e-f7b2-4485-aa9d-b842909405d8",
              document_binary_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/3137f42e-f7b2-4485-aa9d-b842909405d8/binary",
              document_filename:
                "welsh_amended_discharged_or_varied_order_fl404b_draft.pdf",
            }
          : {
              document_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/0da546e2-2a02-4e62-95a8-01bed34a7f50",
              document_binary_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/0da546e2-2a02-4e62-95a8-01bed34a7f50/binary",
              document_filename:
                "welsh_amended_discharged_or_varied_order_fl404b_draft.pdf",
            },
      previewOrderDoc:
        process.env.MANAGE_CASES_TEST_ENV === "demo"
          ? {
              document_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/c7b7d9b7-7418-422d-a877-1b06de8cd588",
              document_binary_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/c7b7d9b7-7418-422d-a877-1b06de8cd588/binary",
              document_filename:
                "amended_discharged_or_varied_order_fl404b_draft.pdf",
            }
          : {
              document_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/175bb0fc-ea6f-496e-9b5c-af8aa309e694",
              document_binary_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/175bb0fc-ea6f-496e-9b5c-af8aa309e694/binary",
              document_filename:
                "amended_discharged_or_varied_order_fl404b_draft.pdf",
            },
      judgeDirectionsToAdmin: "Test directions to admin",
      isOrderCompleteToServe: "No",
    },
  },
};

export const ChildArrangementsOrderActionData: ManageOrdersRequestData = {
  caseWorkerDraftOrderData: {
    data: {
      caseTypeOfApplication: "C100",
      manageOrdersOptions: "createAnOrder",
      createSelectOrderOptions: "childArrangementsSpecificProhibitedOrder",
      isTheOrderByConsent: "Yes",
      wasTheOrderApprovedAtHearing: "No",
      judgeOrMagistrateTitle: "herHonourJudge",
      judgeOrMagistratesLastName: "Test Judge Name",
      justiceLegalAdviserFullName: "Test Legal Adviser Name",
      dateOrderMade: "2026-07-14",
      isTheOrderAboutAllChildren: "Yes",
      recitalsOrPreamble: "Test preamble",
      orderDirections: "Test directions",
      childArrangementsOrdersToIssue: [
        "childArrangementsOrder",
        "prohibitedStepsOrder",
        "specificIssueOrder",
      ],
      selectChildArrangementsOrder: "liveWithOrder",
      previewOrderDocWelsh:
        process.env.MANAGE_CASES_TEST_ENV === "demo"
          ? {
              document_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/b5c87797-8c0f-48a9-b4f9-9f55445b3b13",
              document_binary_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/b5c87797-8c0f-48a9-b4f9-9f55445b3b13/binary",
              document_filename:
                "Welsh_ChildArrangements_Specific_Prohibited_Steps_C43_Draft.pdf",
            }
          : {
              document_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/bc083139-d472-4028-8d49-9caef0b1a4f0",
              document_binary_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/bc083139-d472-4028-8d49-9caef0b1a4f0/binary",
              document_filename:
                "Welsh_ChildArrangements_Specific_Prohibited_Steps_C43_Draft.pdf",
            },
      previewOrderDoc:
        process.env.MANAGE_CASES_TEST_ENV === "demo"
          ? {
              document_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/e008c25a-647a-4e95-86f2-478594bd4ab7",
              document_binary_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/e008c25a-647a-4e95-86f2-478594bd4ab7/binary",
              document_filename:
                "ChildArrangements_Specific_Prohibited_Steps_C43_Draft.pdf",
            }
          : {
              document_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/a8dd92e3-f049-4ec3-af23-8e6480e1c338",
              document_binary_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/a8dd92e3-f049-4ec3-af23-8e6480e1c338/binary",
              document_filename:
                "ChildArrangements_Specific_Prohibited_Steps_C43_Draft.pdf",
            },
      amendOrderSelectCheckOptions: "noCheck",
      selectTypeOfOrder: "general",
      cafcassOrCymruNeedToProvideReport: "No",
      orderEndsInvolvementOfCafcassOrCymru: "No",
      localAuthorityNeedToProvideReport: "No",
      doYouWantToServeOrder: "No",
      whatDoWithOrder: "saveAsDraft",
    },
  },
  finalOrderData: {
    data: {
      caseTypeOfApplication: "C100",
      manageOrdersOptions: "createAnOrder",
      createSelectOrderOptions: "childArrangementsSpecificProhibitedOrder",
      isTheOrderByConsent: "Yes",
      wasTheOrderApprovedAtHearing: "No",
      judgeOrMagistrateTitle: "herHonourJudge",
      judgeOrMagistratesLastName: "Test Judge Name",
      justiceLegalAdviserFullName: "Test Legal Adviser Name",
      dateOrderMade: "2026-07-14",
      isTheOrderAboutAllChildren: "Yes",
      recitalsOrPreamble: "Test preamble",
      orderDirections: "Test directions",
      childArrangementsOrdersToIssue: [
        "childArrangementsOrder",
        "prohibitedStepsOrder",
        "specificIssueOrder",
      ],
      selectChildArrangementsOrder: "liveWithOrder",
      amendOrderSelectCheckOptions: "noCheck",
      selectTypeOfOrder: "general",
      cafcassOrCymruNeedToProvideReport: "No",
      orderEndsInvolvementOfCafcassOrCymru: "No",
      localAuthorityNeedToProvideReport: "No",
      doYouWantToServeOrder: "No",
      whatDoWithOrder: "finalizeSaveToServeLater",
    },
  },
  createAndServeOrderData: {
    data: {
      caseTypeOfApplication: "C100",
      manageOrdersOptions: "createAnOrder",
      createSelectOrderOptions: "childArrangementsSpecificProhibitedOrder",
      isTheOrderByConsent: "Yes",
      wasTheOrderApprovedAtHearing: "No",
      judgeOrMagistrateTitle: "herHonourJudge",
      judgeOrMagistratesLastName: "Test Judge Name",
      justiceLegalAdviserFullName: "Test Legal Adviser Name",
      dateOrderMade: "2026-07-14",
      isTheOrderAboutAllChildren: "Yes",
      recitalsOrPreamble: "Test preamble",
      orderDirections: "Test directions",
      childArrangementsOrdersToIssue: [
        "childArrangementsOrder",
        "prohibitedStepsOrder",
        "specificIssueOrder",
      ],
      selectChildArrangementsOrder: "liveWithOrder",
      amendOrderSelectCheckOptions: "noCheck",
      selectTypeOfOrder: "general",
      cafcassOrCymruNeedToProvideReport: "No",
      orderEndsInvolvementOfCafcassOrCymru: "No",
      localAuthorityNeedToProvideReport: "No",
      doYouWantToServeOrder: "Yes",
      serveOrderDynamicList: {
        value: [
          {
            code: "7ba654b6-3f8c-49b9-863d-f1b5387db356",
            label:
              "Child arrangements, specific issue or prohibited steps order (C43) - 14 Jul 2026",
          },
        ],
      },
      ordersNeedToBeServed: "Yes",
      isOnlyC47aOrderSelectedToServe: "No",
      displayLegalRepOption: "Yes",
      serveToRespondentOptions: "Yes",

      personallyServeRespondentsOptions: "courtAdmin",
      cafcassCymruServedOptions: "No",
    },
  },
};

export const ParentalResponsibilityOrderActionData: ManageOrdersRequestData = {
  finalOrderData: {
    data: {
      caseTypeOfApplication: "C100",
      manageOrdersOptions: "createAnOrder",
      loggedInUserType: "COURT_ADMIN",
      isInvokedFromTask: "No",
      createSelectOrderOptions: "parentalResponsibility",
      isTheOrderByConsent: "Yes",
      wasTheOrderApprovedAtHearing: "No",
      judgeOrMagistrateTitle: "herHonourJudge",
      judgeOrMagistratesLastName: "Test Judge Name",
      dateOrderMade: "2026-02-09",
      isTheOrderAboutAllChildren: "Yes",
      parentName: "John Doe",
      previewOrderDocWelsh:
        process.env.MANAGE_CASES_TEST_ENV === "demo"
          ? {
              document_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/d9ee0fa9-23fc-4ce7-80e9-1f1716fa1550",
              document_binary_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/d9ee0fa9-23fc-4ce7-80e9-1f1716fa1550/binary",
              document_filename:
                "Welsh_Parental_Responsibility_Order_C45A_draft.pdf",
            }
          : {
              document_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/e964841f-a497-4f3d-af8c-67ff183f8f18",
              document_binary_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/e964841f-a497-4f3d-af8c-67ff183f8f18/binary",
              document_filename:
                "Welsh_Parental_Responsibility_Order_C45A_draft.pdf",
            },
      previewOrderDoc:
        process.env.MANAGE_CASES_TEST_ENV === "demo"
          ? {
              document_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/206b1f5f-1034-4a4c-ac6f-d3862814b36b",
              document_binary_url:
                "http://dm-store-demo.service.core-compute-demo.internal/documents/206b1f5f-1034-4a4c-ac6f-d3862814b36b/binary",
              document_filename: "Parental_Responsibility_Order_C45A_draft.pdf",
            }
          : {
              document_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/c5a50165-fbfe-4400-9bae-48111b82a75f",
              document_binary_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/c5a50165-fbfe-4400-9bae-48111b82a75f/binary",
              document_filename: "Parental_Responsibility_Order_C45A_draft.pdf",
            },
      amendOrderSelectCheckOptions: "noCheck",
      selectTypeOfOrder: "general",
      cafcassOrCymruNeedToProvideReport: "No",
      orderEndsInvolvementOfCafcassOrCymru: "No",
      doYouWantToServeOrder: "No",
      whatDoWithOrder: "finalizeSaveToServeLater",
    },
  },

  judgeEditAndApproveDraftedOrderData: {
    data: {
      caseTypeOfApplication: "C100",
      orderName: "Parental responsibility order (C45A)",
      orderUploadedAsDraftFlag: "No",
      isOrderCreatedBySolicitor: "Yes",
      doYouWantToEditTheOrder: null,
      legalRepInstructionsPlaceHolder: null,
      previewDraftOrderWelsh: {
        document_url: "...",
        document_binary_url: "...",
        document_filename: "Welsh_Parental_Responsibility_Order_C45A_draft.pdf",
        upload_timestamp: "2026-08-06T11:57:36.200037674",
      },
      previewDraftOrder: {
        document_url: "...",
        document_binary_url: "...",
        document_filename: "Parental_Responsibility_Order_C45A_draft.pdf",
        upload_timestamp: "2026-08-06T11:57:36.200037674",
      },
      previewUploadedOrder: {
        document_url: "...",
        document_binary_url: "...",
        document_filename: "Parental_Responsibility_Order_C45A_draft.pdf",
        upload_timestamp: "2026-08-06T11:57:36.200037674",
      },
      whatToDoWithOrderSolicitor: "askLegalRepToMakeChanges",
      whatToDoWithOrderCourtAdmin: null,
      instructionsToLegalRepresentative: "Test instructions",
      orderType: "parentalResponsibility",
      isCafcassCymru: "Yes",
      isFL401ApplicantPresent: "No",
      isFL401ApplicantSolicitorPresent: "No",
      isFL401RespondentPresent: "No",
      isFL401RespondentSolicitorPresent: "No",
      isApplicant1Present: "Yes",
      isApplicant2Present: "Yes",
      isApplicant3Present: "Yes",
      isApplicant4Present: "No",
      isApplicant5Present: "No",
      isApplicant1SolicitorPresent: "Yes",
      isApplicant2SolicitorPresent: "Yes",
      isApplicant3SolicitorPresent: "Yes",
      isApplicant4SolicitorPresent: "No",
      isApplicant5SolicitorPresent: "No",
      isRespondent1Present: "Yes",
      isRespondent2Present: "Yes",
      isRespondent3Present: "Yes",
      isRespondent4Present: "No",
      isRespondent5Present: "No",
      isRespondent1SolicitorPresent: "No",
      isRespondent2SolicitorPresent: "No",
      isRespondent3SolicitorPresent: "No",
      isRespondent4SolicitorPresent: "No",
      isRespondent5SolicitorPresent: "No",
      c21OrderOptions: null,
      isHearingTaskNeeded: null,
      hearingOptionSelected: null,
      isOrderApproved: null,
      whoApprovedTheOrder: null,
      isMultipleHearingSelected: null,
      judgeLaManagerReviewRequired: null,
      sdoPreamblesTempList: null,
      sdoCafcassOrCymruTempList: null,
      sdoLocalAuthorityTempList: null,
      sdoCourtTempList: null,
      sdoDocumentationAndEvidenceTempList: null,
      sdoOtherTempList: null,
      sdoHearingsAndNextStepsTempList: null,
      listElementsSetToDefaultValue: null,
      editedOrderHasDefaultCaseFields: null,
      isAutomatedHearingPresent: "No",
    },
  },
};
