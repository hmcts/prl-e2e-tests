// TODO: order data needs to handle demo as well as AAT

export interface ManageOrdersRequestData {
  caseWorkerDraftOrderData?;
  finalOrderData?;
  createAndServeOrderData?;
  judgeDraftOrderData?;
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
  judgeDraftOrderData: {
    data: {
      manageOrderHeader1: null,
      caseTypeOfApplication: "FL401",
      manageOrdersOptions: "createAnOrder",
      performingUser: null,
      performingAction: null,
      judgeLaReviewRequired: null,
      isHearingTaskNeeded: null,
      hearingOptionSelected: null,
      isOrderApproved: null,
      whoApprovedTheOrder: null,
      isMultipleHearingSelected: null,
      judgeLaManagerReviewRequired: null,
      isSdoSelected: "No",
      sdoPreamblesTempList: null,
      sdoCafcassOrCymruTempList: null,
      sdoLocalAuthorityTempList: null,
      sdoCourtTempList: null,
      sdoDocumentationAndEvidenceTempList: null,
      sdoOtherTempList: null,
      sdoHearingsAndNextStepsTempList: null,
      listElementsSetToDefaultValue: null,
      draftOrderCollectionId: null,
      requestSafeGuardingLetterUpdate: null,
      safeGuardingLetterUploadDueDate: null,
      loggedInUserType: "JUDGE",
      isInvokedFromTask: "No",
      createSelectOrderOptions: "powerOfArrest",
      selectedOrder:
        "<span class='heading-h3'>Power of arrest (FL406)\n\n</span>",
      typeOfC21Order: "",
      daOrderForCaCase: "No",
      nameOfOrder: null,
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
        fl404bCourtName: null,
        fl404bCaseNumber: null,
        fl404bApplicantName: null,
        fl404bApplicantReference: null,
        fl404bRespondentName: null,
        fl404bRespondentReference: null,
        fl404bRespondentDob: null,
        fl404bHearingOutcome: null,
        fl404bPowerOfArrestParagraph: "Test paragraphs",
        fl404bRiskOfSignificantHarm: "Yes",
        fl404bMentionedProperty: null,
        fl404bAddressOfProperty: null,
        fl404bAddMoreDetailsTelephone: null,
        fl404bAddMoreDetailsProperty: null,
        fl404bAddMoreDetailsPhoneChild: null,
        fl404bAddSchool: null,
        fl404bAddMoreDetailsSchool: null,
        fl404bApplicantHomeInstruction: null,
        fl404bApplicantOtherInstruction: null,
        fl404bIsPowerOfArrest1: null,
        fl404bOccupationDate1: "",
        fl404bOccupationTime1: null,
        fl404bOccupationDate2: "",
        fl404bOccupationTime2: null,
        fl404bIsPowerOfArrest2: null,
        fl404bWhenRespondentShallLeave: null,
        fl404bIsPowerOfArrest3: null,
        fl404bAddMoreDetails: null,
        fl404bIsPowerOfArrest4: null,
        fl404bIsPowerOfArrest5: null,
        fl404bAddAnotherInstructions: null,
        fl404bIsPowerOfArrest6: null,
        fl404bDateOrderMade: null,
        fl404bDateOrderEnd: "2026-07-20T00:00:00.000",
        fl404bDateOrderEndTime: null,
        orderEndDateAndTimeOptions: null,
        orderSpecifiedDateTime: "",
        fl404bCostOfApplication: null,
        fl404bIsNoticeGiven: null,
        fl404bCourtName1: null,
        fl404bTimeEstimate: null,
        fl404bDateOfNextHearing: null,
        fl404bTimeOfNextHearing: null,
        fl404bDateAndTimeOfNextHearing: "",
        fl404bCourtAddress: {
          AddressLine1: null,
          AddressLine2: null,
          AddressLine3: null,
          PostTown: null,
          County: null,
          PostCode: null,
          Country: null,
        },
        fl404bAddressAppliedFor: {
          AddressLine1: null,
          AddressLine2: null,
          AddressLine3: null,
          PostTown: null,
          County: null,
          PostCode: null,
          Country: null,
        },
        fl404bRespondentNotToThreat: [],
        fl404bRespondentNotIntimidate: [],
        fl404bRespondentNotToTelephone: [],
        fl404bRespondentNotToDamageOrThreat: [],
        fl404bRespondentNotToDamage: [],
        fl404bRespondentNotToEnterProperty: [],
        fl404bRespondentNotToThreatChild: [],
        fl404bRespondentNotHarassOrIntimidate: [],
        fl404bRespondentNotToTelephoneChild: [],
        fl404bRespondentNotToEnterSchool: [],
        fl404bApplicantIsEntitledToOccupy: [],
        fl404bApplicantHasHomeRight: [],
        fl404bApplicantHasRightToEnter: [],
        fl404bApplicantHasOtherInstruction: [],
        fl404bApplicantAllowedToOccupy: [],
        fl404bRespondentMustNotOccupyAddress: [],
        fl404bRespondentShallLeaveAddress: [],
        fl404bRespondentMustNotEnterAddress: [],
        fl404bRespondentObstructOrHarass: [],
        fl404bRespondentOtherInstructions: [],
        addDirections: [],
        fl404bRespondentAddress: {
          AddressLine1: null,
          AddressLine2: null,
          AddressLine3: null,
          PostTown: null,
          County: null,
          PostCode: null,
          Country: null,
        },
        fl404bOtherCourtAddress: {
          AddressLine1: null,
          AddressLine2: null,
          AddressLine3: null,
          PostTown: null,
          County: null,
          PostCode: null,
          Country: null,
        },
      },
      previewOrderDocWelsh: {
        document_url:
          "http://dm-store-aat.service.core-compute-aat.internal/documents/fb12dd45-ad98-4de5-a79a-a9d97d766499",
        document_binary_url:
          "http://dm-store-aat.service.core-compute-aat.internal/documents/fb12dd45-ad98-4de5-a79a-a9d97d766499/binary",
        document_filename: "Welsh_Power_of_arrest_draft.pdf",
      },
      previewOrderDoc: {
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
  judgeDraftOrderData: {
    data: {
      manageOrderHeader1: null,
      caseTypeOfApplication: "FL401",
      manageOrdersOptions: "createAnOrder",
      performingUser: null,
      performingAction: null,
      judgeLaReviewRequired: null,
      isHearingTaskNeeded: null,
      hearingOptionSelected: null,
      isOrderApproved: null,
      whoApprovedTheOrder: null,
      isMultipleHearingSelected: null,
      judgeLaManagerReviewRequired: null,
      isSdoSelected: "No",
      sdoPreamblesTempList: null,
      sdoCafcassOrCymruTempList: null,
      sdoLocalAuthorityTempList: null,
      sdoCourtTempList: null,
      sdoDocumentationAndEvidenceTempList: null,
      sdoOtherTempList: null,
      sdoHearingsAndNextStepsTempList: null,
      listElementsSetToDefaultValue: null,
      draftOrderCollectionId: null,
      requestSafeGuardingLetterUpdate: null,
      safeGuardingLetterUploadDueDate: null,
      loggedInUserType: "JUDGE",
      isInvokedFromTask: "No",
      createSelectOrderOptions: "amendDischargedVaried",
      selectedOrder:
        "<span class='heading-h3'>Amended, discharged or varied order (FL404B)\n\n</span>",
      typeOfC21Order: "",
      daOrderForCaCase: "No",
      nameOfOrder: null,
      isTheOrderByConsent: "Yes",
      wasTheOrderApprovedAtHearing: "No",
      judgeOrMagistrateTitle: "circuitJudge",
      judgeOrMagistratesLastName: "Elizabeth Williams",
      justiceLegalAdviserFullName: "Test Legal Adviser Name",
      dateOrderMade: "2026-07-20",
      isTheOrderAboutChildren: "No",
      recitalsOrPreamble: "Test preamble",
      orderDirections: "Test directions",
      fl404CustomFields: null,
      isCafcassCymru: "Yes",
      isAutomatedHearingPresent: null,
      isFL401ApplicantPresent: "Yes",
      isFL401ApplicantSolicitorPresent: "Yes",
      isFL401RespondentPresent: "Yes",
      isFL401RespondentSolicitorPresent: "No",
      isApplicant1Present: "No",
      ordersHearingDetails: [
        {
          value: {
            hearingTypes: {
              value: null,
              list_items: [
                {
                  code: "ABA5-2GA",
                  label: "2nd Gatekeeping Appointment",
                },
                {
                  code: "ABA5-ALL",
                  label: "Allocation",
                },
                {
                  code: "ABA5-APL",
                  label: "Appeal",
                },
                {
                  code: "ABA5-APP",
                  label: "Application",
                },
                {
                  code: "ABA5-BRE",
                  label: "Breach",
                },
                {
                  code: "ABA5-CMC",
                  label: "Case Management Conference",
                },
                {
                  code: "ABA5-CMH",
                  label: "Case Management Hearing",
                },
                {
                  code: "ABA5-COM",
                  label: "Committal",
                },
                {
                  code: "ABA5-CON",
                  label: "Conciliation",
                },
                {
                  code: "ABA5-COS",
                  label: "Costs",
                },
                {
                  code: "ABA5-DCH",
                  label: "Decision Hearing",
                },
                {
                  code: "ABA5-DIR",
                  label: "Directions (First/Further)",
                },
                {
                  code: "ABA5-DRA",
                  label: "Dispute Resolution Appointment",
                },
                {
                  code: "ABA5-FCM",
                  label: "Further Case Management Hearing",
                },
                {
                  code: "ABA5-FFH",
                  label: "Full/Final hearing",
                },
                {
                  code: "ABA5-FHD",
                  label: "First Hearing Dispute Resolution Appointment (FHDRA)",
                },
                {
                  code: "ABA5-FHR",
                  label: "First Hearing",
                },
                {
                  code: "ABA5-FOF",
                  label: "Finding of Fact",
                },
                {
                  code: "ABA5-GRH",
                  label: "Ground Rules Hearing",
                },
                {
                  code: "ABA5-HRA",
                  label: "Human Rights Act Application",
                },
                {
                  code: "ABA5-JMT",
                  label: "Judgment",
                },
                {
                  code: "ABA5-NEH",
                  label: "Neutral Evaluation Hearing",
                },
                {
                  code: "ABA5-PER",
                  label: "Permission Hearing",
                },
                {
                  code: "ABA5-PHR",
                  label: "Pre Hearing Review",
                },
                {
                  code: "ABA5-REV",
                  label: "Review",
                },
                {
                  code: "ABA5-SCF",
                  label: "Settlement Conference",
                },
                {
                  code: "ABA5-SGA",
                  label: "Safeguarding Gatekeeping Appointment",
                },
              ],
            },
            hearingDateConfirmOptionEnum: null,
            isRenderingRequiredFlag: null,
            fillingFormRenderingInfo:
              "<details class='govuk-details'>\n\n<summary class='govuk-details__summary'>\n\n<span class='govuk-details__summary-text'>\n\nWhen should I fill this in?\n\n</span>\n\n</summary>\n\n<div class='govuk-details__text'>\n\n<p><strong>Only fill the following if you haven't requested the hearing yet</strong></p></br>\n\n</div>\n\n</details>",
            hearingSpecificDatesOptionsEnum: null,
            firstDateOfTheHearing: null,
            hearingMustTakePlaceAtHour: null,
            hearingMustTakePlaceAtMinute: null,
            earliestHearingDate: null,
            latestHearingDate: null,
            hearingPriorityTypeEnum: null,
            hearingEstimatedDays: null,
            hearingEstimatedHours: null,
            hearingEstimatedMinutes: null,
            hearingChannelsEnum: null,
            allPartiesAttendHearingSameWayYesOrNo: null,
            applicantHearingChannel: {
              value: null,
              list_items: [
                {
                  code: "INTER",
                  label: "In Person",
                },
                {
                  code: "NA",
                  label: "Not in Attendance",
                },
                {
                  code: "ONPPRS",
                  label: "On the Papers",
                },
                {
                  code: "TEL",
                  label: "Telephone",
                },
                {
                  code: "VID",
                  label: "Video",
                },
              ],
            },
            applicantSolicitorHearingChannel: {
              value: null,
              list_items: [
                {
                  code: "INTER",
                  label: "In Person",
                },
                {
                  code: "NA",
                  label: "Not in Attendance",
                },
                {
                  code: "ONPPRS",
                  label: "On the Papers",
                },
                {
                  code: "TEL",
                  label: "Telephone",
                },
                {
                  code: "VID",
                  label: "Video",
                },
              ],
            },
            respondentHearingChannel: {
              value: null,
              list_items: [
                {
                  code: "INTER",
                  label: "In Person",
                },
                {
                  code: "NA",
                  label: "Not in Attendance",
                },
                {
                  code: "ONPPRS",
                  label: "On the Papers",
                },
                {
                  code: "TEL",
                  label: "Telephone",
                },
                {
                  code: "VID",
                  label: "Video",
                },
              ],
            },
            respondentSolicitorHearingChannel: {
              value: null,
              list_items: [
                {
                  code: "INTER",
                  label: "In Person",
                },
                {
                  code: "NA",
                  label: "Not in Attendance",
                },
                {
                  code: "ONPPRS",
                  label: "On the Papers",
                },
                {
                  code: "TEL",
                  label: "Telephone",
                },
                {
                  code: "VID",
                  label: "Video",
                },
              ],
            },
            applicantHearingChannel1: null,
            applicantSolicitorHearingChannel1: null,
            applicantHearingChannel2: null,
            applicantSolicitorHearingChannel2: null,
            applicantHearingChannel3: null,
            applicantSolicitorHearingChannel3: null,
            applicantHearingChannel4: null,
            applicantSolicitorHearingChannel4: null,
            applicantHearingChannel5: null,
            applicantSolicitorHearingChannel5: null,
            respondentHearingChannel1: null,
            respondentSolicitorHearingChannel1: null,
            respondentHearingChannel2: null,
            respondentSolicitorHearingChannel2: null,
            respondentHearingChannel3: null,
            respondentSolicitorHearingChannel3: null,
            respondentHearingChannel4: null,
            respondentSolicitorHearingChannel4: null,
            respondentHearingChannel5: null,
            respondentSolicitorHearingChannel5: null,
            cafcassHearingChannel: {
              value: null,
              list_items: [
                {
                  code: "INTER",
                  label: "In Person",
                },
                {
                  code: "NA",
                  label: "Not in Attendance",
                },
                {
                  code: "ONPPRS",
                  label: "On the Papers",
                },
                {
                  code: "TEL",
                  label: "Telephone",
                },
                {
                  code: "VID",
                  label: "Video",
                },
              ],
            },
            cafcassCymruHearingChannel: {
              value: null,
              list_items: [
                {
                  code: "INTER",
                  label: "In Person",
                },
                {
                  code: "NA",
                  label: "Not in Attendance",
                },
                {
                  code: "ONPPRS",
                  label: "On the Papers",
                },
                {
                  code: "TEL",
                  label: "Telephone",
                },
                {
                  code: "VID",
                  label: "Video",
                },
              ],
            },
            localAuthorityHearingChannel: {
              value: null,
              list_items: [
                {
                  code: "INTER",
                  label: "In Person",
                },
                {
                  code: "NA",
                  label: "Not in Attendance",
                },
                {
                  code: "ONPPRS",
                  label: "On the Papers",
                },
                {
                  code: "TEL",
                  label: "Telephone",
                },
                {
                  code: "VID",
                  label: "Video",
                },
              ],
            },
            courtList: {
              value: {
                code: "234946:",
                label:
                  "Swansea Civil Justice Centre - Quay West, Quay Parade - SA1 1SP",
              },
              list_items: [
                {
                  code: "827534:",
                  label: "Aberystwyth Justice Centre - Trefechan - SY23 1AS",
                },
                {
                  code: "257431:",
                  label:
                    "Bury St Edmunds County Court and Family Court - St Andrews Street North - IP33 1TR",
                },
                {
                  code: "101959:",
                  label:
                    "Carmarthen County Court and Family Court - The Hearing Centre, Hill House, Picton Terrace, Carmarthen - SA31 3BT",
                },
                {
                  code: "816875:",
                  label:
                    "Chelmsford County and Family Court - Priory Place - CM2 0PP",
                },
                {
                  code: "497679:Coventryprivatelawapplications@justice.gov.uk",
                  label:
                    "Coventry Combined Court Centre - Much Park Street, Coventry - CV1 2SN",
                },
                {
                  code: "758998:",
                  label:
                    "Dudley County (and Magistrates') Court - The Court House, The Inhedge - DY1 1RY",
                },
                {
                  code: "898213:eastlondonfamilypr@justice.gov.uk",
                  label:
                    "East London Family Court - Westferry Circus (Westferry House), Part Ground, 6th And 7th Floors, 11 Westferry Circus, Canary Wharf, London, E14 4HE - E14 4HD",
                },
                {
                  code: "735217:family.exeter.countycourt@justice.gov.uk",
                  label:
                    "Exeter Combined Court Centre - Southernhay Gardens, Exeter - EX1 1UH",
                },
                {
                  code: "198592:family.gloucester.countycourt@justice.gov.uk",
                  label:
                    "Gloucestershire Family and Civil Court - Kimbrose Way, Gloucester Docks - GL1 2DE",
                },
                {
                  code: "478126:",
                  label:
                    "Grimsby Combined Court Centre - Town Hall Square - DN31 1HX",
                },
                {
                  code: "700596:",
                  label:
                    "Haverfordwest County and Family - Penffynnon, Hawthorn Rise - SA61 2AZ",
                },
                {
                  code: "471349:",
                  label:
                    "Ipswich County Court and Family Hearing Centre - Arcade Street - IP1 1EJ",
                },
                {
                  code: "195520:",
                  label:
                    "Kingston-upon-Hull Combined Court Centre - The Combined Court Centre - HU1 2EZ",
                },
                {
                  code: "195465:PLP.LINCOLN@justice.gov.uk",
                  label:
                    "Lincoln County Court and Family Court - High Street - LN5 7PS",
                },
                {
                  code: "390932:",
                  label:
                    "Llanelli Law Courts - Town Hall Square, Llanelli - SA15 3AW",
                },
                {
                  code: "487294:KentPRL@justice.gov.uk",
                  label:
                    "Medway County Court and Family Court - 47-67 High Street Chatham Kent - ME4 4DW",
                },
                {
                  code: "366796:newcastle.c100applications@justice.gov.uk",
                  label:
                    "Newcastle Civil & Family Courts and Tribunals Centre - Barras Bridge, Newcastle-Upon-Tyne - NE99 1NA",
                },
                {
                  code: "471569:family.peterborough.countycourt@justice.gov.uk",
                  label:
                    "Peterborough Combined Court Centre - Crown Buildings, Rivergate - PE1 1EJ",
                },
                {
                  code: "846055:",
                  label:
                    "Port Talbot Justice Centre - Harbourside Road - SA13 1SB",
                },
                {
                  code: "43104:family.southampton.countycourt@justice.gov.uk",
                  label:
                    "Southampton Combined Court Centre - The Courts of Justice, London Road - SO15 2XQ",
                },
                {
                  code: "781139:",
                  label:
                    "Southend Court House: County Court and Family Court and Magistrates' Court - Victoria Avenue, The Court House - SS2 6EG",
                },
                {
                  code: "234946:",
                  label:
                    "Swansea Civil Justice Centre - Quay West, Quay Parade - SA1 1SP",
                },
                {
                  code: "292771:",
                  label:
                    "Telford Justice Centre - Telford Square, Malinsgate - TF3 4HX",
                },
                {
                  code: "177463:",
                  label:
                    "Walsall County and Family Court - Bridge Street, Bridge House - WS1 1JQ",
                },
                {
                  code: "41047:",
                  label:
                    "Wolverhampton Combined Court Centre - Pipers Row, Wolverhampton - WV1 3LQ",
                },
              ],
            },
            hearingAuthority: null,
            hearingJudgePersonalCode: null,
            hearingJudgeLastName: null,
            hearingJudgeEmailAddress: null,
            hearingListedLinkedCases: {
              value: null,
              list_items: [],
            },
            confirmedHearingDates: {
              value: {
                code: null,
                label: null,
              },
              list_items: [],
            },
            customDetails: null,
            instructionsForRemoteHearing: null,
            additionalHearingDetails: null,
            additionalDetailsForHearingDateOptions: null,
            transientConfirmedHearingDetail: null,
            displayConfirmedHearing: "No",
            hearingVideoChannels: null,
            hearingTelephoneChannels: null,
            hearingChannels: {
              value: null,
              list_items: [
                {
                  code: "INTER",
                  label: "In Person",
                },
                {
                  code: "NA",
                  label: "Not in Attendance",
                },
                {
                  code: "ONPPRS",
                  label: "On the Papers",
                },
                {
                  code: "TEL",
                  label: "Telephone",
                },
                {
                  code: "VID",
                  label: "Video",
                },
              ],
            },
            applicantName: "John Smith",
            applicantSolicitor: "Legal Solicitor",
            respondentName: "Elise Lynn",
            respondentSolicitor: "",
            applicantName1: null,
            applicantName2: null,
            applicantName3: null,
            applicantName4: null,
            applicantName5: null,
            applicantSolicitor1: null,
            respondentName1: null,
            respondentSolicitor1: null,
            applicantSolicitor2: null,
            respondentName2: null,
            respondentSolicitor2: null,
            applicantSolicitor3: null,
            respondentName3: null,
            respondentSolicitor3: null,
            applicantSolicitor4: null,
            respondentName4: null,
            respondentSolicitor4: null,
            applicantSolicitor5: null,
            respondentName5: null,
            respondentSolicitor5: null,
            isCafcassCymru: "Yes",
            hearingId: null,
            hearingdataFromHearingTab: [],
          },
          id: "462050da-94d5-48da-b556-06b92fe7d65b",
        },
      ],
      isApplicant2Present: "No",
      isApplicant3Present: "No",
      isApplicant4Present: "No",
      isApplicant5Present: "No",
      isApplicant1SolicitorPresent: "No",
      isApplicant2SolicitorPresent: "No",
      isApplicant3SolicitorPresent: "No",
      isApplicant4SolicitorPresent: "No",
      isApplicant5SolicitorPresent: "No",
      isRespondent1Present: "No",
      isRespondent2Present: "No",
      isRespondent3Present: "No",
      isRespondent4Present: "No",
      isRespondent5Present: "No",
      isRespondent1SolicitorPresent: "No",
      isRespondent2SolicitorPresent: "No",
      isRespondent3SolicitorPresent: "No",
      isRespondent4SolicitorPresent: "No",
      isRespondent5SolicitorPresent: "No",
      previewOrderDocWelsh: {
        document_url:
          "http://dm-store-aat.service.core-compute-aat.internal/documents/0da546e2-2a02-4e62-95a8-01bed34a7f50",
        document_binary_url:
          "http://dm-store-aat.service.core-compute-aat.internal/documents/0da546e2-2a02-4e62-95a8-01bed34a7f50/binary",
        document_filename:
          "welsh_amended_discharged_or_varied_order_fl404b_draft.pdf",
      },
      previewOrderDoc: {
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

export const ParentalResponsibilityOrderActionData: ManageOrdersRequestData = {
  finalOrderData: {
    data: {
      manageOrderHeader1: null,
      caseTypeOfApplication: "C100",
      manageOrdersOptions: "createAnOrder",
      performingUser: null,
      performingAction: null,
      judgeLaReviewRequired: null,
      isHearingTaskNeeded: null,
      hearingOptionSelected: null,
      isOrderApproved: null,
      whoApprovedTheOrder: null,
      isMultipleHearingSelected: null,
      judgeLaManagerReviewRequired: null,
      isSdoSelected: "No",
      sdoPreamblesTempList: null,
      sdoCafcassOrCymruTempList: null,
      sdoLocalAuthorityTempList: null,
      sdoCourtTempList: null,
      sdoDocumentationAndEvidenceTempList: null,
      sdoOtherTempList: null,
      listElementsSetToDefaultValue: null,
      sdoHearingsAndNextStepsTempList: null,
      draftOrderCollectionId: null,
      requestSafeGuardingLetterUpdate: null,
      safeGuardingLetterUploadDueDate: null,
      loggedInUserType: "COURT_ADMIN",
      isInvokedFromTask: "No",
      createSelectOrderOptions: "parentalResponsibility",
      selectedOrder:
        "<span class='heading-h3'>Parental responsibility order (C45A)\n\n</span>",
      typeOfC21Order: "",
      daOrderForCaCase: "No",
      isTheOrderByConsent: "Yes",
      wasTheOrderApprovedAtHearing: "No",
      judgeOrMagistrateTitle: "herHonourJudge",
      judgeOrMagistratesLastName: "Test Judge Name",
      justiceLegalAdviserFullName: null,
      dateOrderMade: "2026-02-09",
      isTheOrderAboutAllChildren: "Yes",
      recitalsOrPreamble: null,
      orderDirections: null,
      parentName: "John Doe",
      previewOrderDocWelsh: {
        document_url:
          process.env.MANAGE_CASES_TEST_ENV === "demo"
            ? "http://dm-store-demo.service.core-compute-demo.internal/documents/d9ee0fa9-23fc-4ce7-80e9-1f1716fa1550"
            : "http://dm-store-aat.service.core-compute-aat.internal/documents/e964841f-a497-4f3d-af8c-67ff183f8f18",
        document_binary_url:
          process.env.MANAGE_CASES_TEST_ENV === "demo"
            ? "http://dm-store-demo.service.core-compute-demo.internal/documents/d9ee0fa9-23fc-4ce7-80e9-1f1716fa1550/binary"
            : "http://dm-store-aat.service.core-compute-aat.internal/documents/e964841f-a497-4f3d-af8c-67ff183f8f18/binary",
        document_filename: "Welsh_Parental_Responsibility_Order_C45A_draft.pdf",
      },
      previewOrderDoc: {
        document_url:
          process.env.MANAGE_CASES_TEST_ENV === "demo"
            ? "http://dm-store-demo.service.core-compute-demo.internal/documents/206b1f5f-1034-4a4c-ac6f-d3862814b36b"
            : "http://dm-store-aat.service.core-compute-aat.internal/documents/c5a50165-fbfe-4400-9bae-48111b82a75f",
        document_binary_url:
          process.env.MANAGE_CASES_TEST_ENV === "demo"
            ? "http://dm-store-demo.service.core-compute-demo.internal/documents/206b1f5f-1034-4a4c-ac6f-d3862814b36b/binary"
            : "http://dm-store-aat.service.core-compute-aat.internal/documents/c5a50165-fbfe-4400-9bae-48111b82a75f/binary",
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
};
