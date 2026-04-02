import { CitizenApplicationInfo } from "../utils/citizenC100CaseUtils.js";

// TODO: need to enable data for demo environment as well [TICKET_NUMBER]

export const issueAndSendToLocalCourtEventData = {
  data: {
    courtList: {
      value: {
        code: "827534:",
        label: "Aberystwyth Justice Centre - Trefechan - SY23 1AS",
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
          label: "Chelmsford County and Family Court - Priory Place - CM2 0PP",
        },
        {
          code: "497679:Coventryprivatelawapplications@justice.gov.uk",
          label:
            "Coventry Combined Court Centre - Much Park Street, Coventry - CV1 2SN",
        },
        {
          code: "758998:",
          label:
            "Dudley County (and Magistrates) Court - The Court House, The Inhedge - DY1 1RY",
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
          label: "Grimsby Combined Court Centre - Town Hall Square - DN31 1HX",
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
          label: "Llanelli Law Courts - Town Hall Square, Llanelli - SA15 3AW",
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
          label: "Port Talbot Justice Centre - Harbourside Road - SA13 1SB",
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
  },
};

export const sendToGatekeeperEventData = {
  data: {
    isSpecificGateKeeperNeeded: "No",
  },
};

export const manageOrdersEventData = {
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
        "http://dm-store-aat.service.core-compute-aat.internal/documents/e964841f-a497-4f3d-af8c-67ff183f8f18",
      document_binary_url:
        "http://dm-store-aat.service.core-compute-aat.internal/documents/e964841f-a497-4f3d-af8c-67ff183f8f18/binary",
      document_filename: "Welsh_Parental_Responsibility_Order_C45A_draft.pdf",
    },
    previewOrderDoc: {
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
};

export function buildSOAEventData(citizenSOACaseInfo: CitizenApplicationInfo) {
  return {
    data: {
      serviceOfApplicationHeader: null,
      isConfidential: "No",
      sentDocumentPlaceHolder:
        "<details class='govuk-details'>\n\n<summary class='govuk-details__summary'>\n\n<h3 class='govuk-details__summary-text'>\n\nDocuments served in the pack\n\n</h3>\n\n</summary>\n\n<div class='govuk-details__text'>\n\nCertain documents will be automatically included in the pack this is served on parties(the people in the case)\n\nThis includes\n\n<ul><li>C100</li><li>C1A</li><li>C7</li><li>C1A (if applicable)</li><li>C8 (Cafcass/Cafcass Cymru, if applicable)</li>\n\n<li>Any orders and hearing notices created at the initial gatekeeping stage</li></ul>\n\nYou do not need to upload these documents yourself\n\n</div>\n\n</details>",
      serviceOfApplicationScreen1: {
        value: [
          {
            code: citizenSOACaseInfo.orderId,
            label: "Parental responsibility order (C45A) - 9 Feb 2026",
          },
        ],
        list_items: [
          {
            code: citizenSOACaseInfo.orderId,
            label: "Parental responsibility order (C45A) - 9 Feb 2026",
          },
        ],
      },
      specialArrangementsLetter: {
        document_url:
          "http://dm-store-aat.service.core-compute-aat.internal/documents/5417e28b-d4a0-4c41-8194-d133c50e2297",
        document_binary_url:
          "http://dm-store-aat.service.core-compute-aat.internal/documents/5417e28b-d4a0-4c41-8194-d133c50e2297/binary",
        document_filename: "Special arrangements letter.docx",
      },
      additionalDocumentsList: [],
      caseTypeOfApplication: "C100",
      soaIsOrderListEmpty: "No",
      missingAddressWarningText:
        "<div class='govuk-warning-text'><span class='govuk-warning-text__icon' aria-hidden='true'>!</span><strong class='govuk-warning-text__text'>There is no postal address for a respondent and other people in the case</strong></div>",
      displayLegalRepOption: "No",
      isC8CheckNeeded: null,
      responsibleForService: null,
      isOccupationOrderSelected: null,
      isApplicantRepresented: null,
      productHearingBundleOn: null,
      soaServeToRespondentOptions: "No",
      soaRecipientsOptions: {
        value: [
          {
            code: citizenSOACaseInfo.applicant1Id,
            label: "John Doe (Applicant 1)",
          },
          {
            code: citizenSOACaseInfo.applicant2Id,
            label: "Martina Graham (Applicant 2)",
          },
          {
            code: citizenSOACaseInfo.respondent1Id,
            label: "Mary Richards (Respondent 1)",
          },
          {
            code: citizenSOACaseInfo.respondent2Id,
            label: "David Carmen (Respondent 2)",
          },
        ],
        list_items: [
          {
            code: citizenSOACaseInfo.applicant1Id,
            label: "John Doe (Applicant 1)",
          },
          {
            code: citizenSOACaseInfo.applicant2Id,
            label: "Martina Graham (Applicant 2)",
          },
          {
            code: citizenSOACaseInfo.respondent1Id,
            label: "Mary Richards (Respondent 1)",
          },
          {
            code: citizenSOACaseInfo.respondent2Id,
            label: "David Carmen (Respondent 2)",
          },
        ],
      },
      soaOtherParties: {
        value: [],
        list_items: [
          {
            code: citizenSOACaseInfo.otherPartyId,
            label: "Andrew Smith",
          },
        ],
      },
      soaCafcassCymruServedOptions: "No",
      soaServeLocalAuthorityYesOrNo: "No",
    },
  };
}
