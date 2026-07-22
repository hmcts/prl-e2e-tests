import { CitizenApplicationInfo } from "../../utils/citizenC100Case.utils.ts";

export const issueAndSendToLocalCourtEventData = {
  data: {
    courtList: {
      value: {
        code: "827534:",
        label: "Aberystwyth Justice Centre - Trefechan - SY23 1AS",
      },
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
          process.env.MANAGE_CASES_TEST_ENV === "demo"
            ? "http://dm-store-demo.service.core-compute-demo.internal/documents/da240bb3-848a-4ab9-8eeb-938e195e922d"
            : "http://dm-store-aat.service.core-compute-aat.internal/documents/5417e28b-d4a0-4c41-8194-d133c50e2297",
        document_binary_url:
          process.env.MANAGE_CASES_TEST_ENV === "demo"
            ? "http://dm-store-demo.service.core-compute-demo.internal/documents/da240bb3-848a-4ab9-8eeb-938e195e922d/binary"
            : "http://dm-store-aat.service.core-compute-aat.internal/documents/5417e28b-d4a0-4c41-8194-d133c50e2297/binary",
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
