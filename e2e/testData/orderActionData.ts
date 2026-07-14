// TODO: order data needs to handle demo as well as AAT

export interface OrderActionData {
  draftOrderData;
  finalOrderData;
  createAndServeOrderData;
}

export const PowerOfArrestOrderActionData: OrderActionData = {
  draftOrderData: {
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
      previewOrderDocWelsh: {
        document_url:
          "http://dm-store-aat.service.core-compute-aat.internal/documents/ea0f8853-f4a2-4bc0-967f-f371774e70c1",
        document_binary_url:
          "http://dm-store-aat.service.core-compute-aat.internal/documents/ea0f8853-f4a2-4bc0-967f-f371774e70c1/binary",
        document_filename: "Welsh_Power_of_arrest_draft.pdf",
      },
      previewOrderDoc: {
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
};

export const AmendDischargedVariedOrderActionData: OrderActionData = {
  draftOrderData: {
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
      previewOrderDocWelsh: {
        document_url:
          "http://dm-store-aat.service.core-compute-aat.internal/documents/d8507989-df5c-4520-acc4-902c134078de",
        document_binary_url:
          "http://dm-store-aat.service.core-compute-aat.internal/documents/d8507989-df5c-4520-acc4-902c134078de/binary",
        document_filename:
          "welsh_amended_discharged_or_varied_order_fl404b_draft.pdf",
      },
      previewOrderDoc: {
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
};

export const ChildArrangementsOrderActionData: OrderActionData = {
  draftOrderData: {
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
      previewOrderDocWelsh: {
        document_url:
          "http://dm-store-aat.service.core-compute-aat.internal/documents/bc083139-d472-4028-8d49-9caef0b1a4f0",
        document_binary_url:
          "http://dm-store-aat.service.core-compute-aat.internal/documents/bc083139-d472-4028-8d49-9caef0b1a4f0/binary",
        document_filename:
          "Welsh_ChildArrangements_Specific_Prohibited_Steps_C43_Draft.pdf",
      },
      previewOrderDoc: {
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
