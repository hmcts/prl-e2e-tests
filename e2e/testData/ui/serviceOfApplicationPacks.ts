import { OrderTypes, solicitorCaseCreateType } from "../../common/types.js";
import { ServiceOptions } from "../../pageObjects/pages/exui/serviceOfApplication/serviceOfApplication4.po.js";

type PackDocuments = {
  applicantPack: string[];
  respondentPack: string[];
};

const orderDocuments: Partial<Record<OrderTypes, string[]>> = {
  "Child arrangements, specific issue or prohibited steps order (C43)": [
    "ChildArrangements_Specific_Prohibited_Steps_C43.pdf",
    "Welsh_ChildArrangements_Specific_Prohibited_Steps_C43.pdf",
  ],
  "Power of arrest (FL406)": [
    "Power_of_arrest.pdf",
    "Welsh_Power_of_arrest.pdf",
  ],
  "Amended, discharged or varied order (FL404B)": [
    "amended_discharged_or_varied_order_fl404b_final.pdf",
    "welsh_amended_discharged_or_varied_order_fl404b_final.pdf",
  ],
  "Parental responsibility order (C45A)": [
    "Parental_Responsibility_Order_C45A.pdf",
    "Welsh_Parental_Responsibility_Order_C45A.pdf",
  ],
};

export function getPackDocuments(
  caseType: solicitorCaseCreateType,
  orderType: OrderTypes,
  isCitizenCase: boolean,
  isWelshLanguageRequired: boolean,
  serviceOptions: ServiceOptions,
): PackDocuments | undefined {
  if (serviceOptions.personallyServed === "notApplicable") {
    return undefined;
  }

  const caseCategory = isCitizenCase ? "citizen" : "professional";

  const servedBy =
    serviceOptions.personallyServed === "yes"
      ? serviceOptions.servedBy
      : "allParties";

  const packs = SERVICE_PACK_LOOKUP[caseType][caseCategory][servedBy];

  // add order documents to packs
  let expectedOrderDocuments: string[] = orderDocuments[orderType];
  if (!isWelshLanguageRequired) {
    // only get the english order document for cases where welsh language isn't required
    expectedOrderDocuments = [expectedOrderDocuments[0]];
  }

  packs.applicantPack.push(...expectedOrderDocuments);
  packs.respondentPack.push(...expectedOrderDocuments);

  return packs;
}

export const EXPECTED_APPLICANT_C100_PACKS = {
  personallyServedByApplicantSolicitor: [
    "Annex 1 - Confidential contact details notice.pdf",
    "Annex 1 - Confidential contact details notice - welsh.pdf",
    "Privacy_Notice.pdf",
    "Privacy_Notice_Welsh.pdf",
    "Special arrangements letter.docx",
    "C100FinalDocument.pdf",
    "C100FinalDocumentWelsh.pdf",
    "C1A_Document.pdf",
    "C1A_Document_Welsh.pdf",
    "Family Presidents letter to parties.pdf",
    "Family Presidents letter to parties - Welsh.pdf",
    "C9_personal_service.pdf",
  ],
  personallyServedByCourtBailiff: [
    "Annex 1 - Confidential contact details notice.pdf",
    "Annex 1 - Confidential contact details notice - welsh.pdf",
    "Privacy_Notice.pdf",
    "Privacy_Notice_Welsh.pdf",
    "Special arrangements letter.docx",
    "C100FinalDocument.pdf",
    "C100FinalDocumentWelsh.pdf",
    "C1A_Document.pdf",
    "C1A_Document_Welsh.pdf",
    "Family Presidents letter to parties.pdf",
    "Family Presidents letter to parties - Welsh.pdf",
    "C9_personal_service.pdf",
  ],
  personallyServedByCourtAdmin: [
    "Annex 1 - Confidential contact details notice.pdf",
    "Annex 1 - Confidential contact details notice - welsh.pdf",
    "Privacy_Notice.pdf",
    "Privacy_Notice_Welsh.pdf",
    "Special arrangements letter.docx",
    "C100FinalDocument.pdf",
    "C100FinalDocumentWelsh.pdf",
    "C1A_Document.pdf",
    "C1A_Document_Welsh.pdf",
    "Family Presidents letter to parties.pdf",
    "Family Presidents letter to parties - Welsh.pdf",
    "C9_personal_service.pdf",
  ],
  nonPersonallyServedToAllParties: [
    "Annex 1 - Confidential contact details notice.pdf",
    "Annex 1 - Confidential contact details notice - welsh.pdf",
    "Privacy_Notice.pdf",
    "Privacy_Notice_Welsh.pdf",
    "Special arrangements letter.docx",
    "C100FinalDocument.pdf",
    "C100FinalDocumentWelsh.pdf",
    "C1A_Document.pdf",
    "C1A_Document_Welsh.pdf",
    "Family Presidents letter to parties.pdf",
    "Family Presidents letter to parties - Welsh.pdf",
  ],
};

export const EXPECTED_RESPONDENT_C100_PACKS = {
  personallyServedByApplicantSolicitor: [
    "Annex 1 - Confidential contact details notice.pdf",
    "Annex 1 - Confidential contact details notice - welsh.pdf",
    "Privacy_Notice.pdf",
    "Privacy_Notice_Welsh.pdf",
    "Special arrangements letter.docx",
    "C100FinalDocument.pdf",
    "C100FinalDocumentWelsh.pdf",
    "C1A_Document.pdf",
    "C1A_Document_Welsh.pdf",
    "Family Presidents letter to parties.pdf",
    "Family Presidents letter to parties - Welsh.pdf",
    "Blank_C7.pdf",
    "C1A_Blank.pdf",
    "C1A_Blank_Welsh.pdf",
    "cover_letter_re6.pdf",
    "cover_letter_welsh_re6.pdf",
    "cover_letter_re6.pdf",
    "cover_letter_welsh_re6.pdf",
    "cover_letter_re6.pdf",
    "cover_letter_welsh_re6.pdf",
  ],
  personallyServedByCourtBailiff: [
    "Annex 1 - Confidential contact details notice.pdf",
    "Annex 1 - Confidential contact details notice - welsh.pdf",
    "Privacy_Notice.pdf",
    "Privacy_Notice_Welsh.pdf",
    "Special arrangements letter.docx",
    "C100FinalDocument.pdf",
    "C100FinalDocumentWelsh.pdf",
    "C1A_Document.pdf",
    "C1A_Document_Welsh.pdf",
    "Family Presidents letter to parties.pdf",
    "Family Presidents letter to parties - Welsh.pdf",
    "Blank_C7.pdf",
    "C1A_Blank.pdf",
    "C1A_Blank_Welsh.pdf",
    "cover_letter_re5.pdf",
    "cover_letter_welsh_re5.pdf",
    "cover_letter_re5.pdf",
    "cover_letter_welsh_re5.pdf",
    "cover_letter_re5.pdf",
    "cover_letter_welsh_re5.pdf",
  ],
  personallyServedByCourtAdmin: [
    "Annex 1 - Confidential contact details notice.pdf",
    "Annex 1 - Confidential contact details notice - welsh.pdf",
    "Privacy_Notice.pdf",
    "Privacy_Notice_Welsh.pdf",
    "Special arrangements letter.docx",
    "C100FinalDocument.pdf",
    "C100FinalDocumentWelsh.pdf",
    "C1A_Document.pdf",
    "C1A_Document_Welsh.pdf",
    "Family Presidents letter to parties.pdf",
    "Family Presidents letter to parties - Welsh.pdf",
    "Blank_C7.pdf",
    "C1A_Blank.pdf",
    "C1A_Blank_Welsh.pdf",
    "cover_letter_re5.pdf",
    "cover_letter_welsh_re5.pdf",
    "cover_letter_re5.pdf",
    "cover_letter_welsh_re5.pdf",
    "cover_letter_re5.pdf",
    "cover_letter_welsh_re5.pdf",
  ],
  nonPersonallyServedToAllParties: [
    "Annex 1 - Confidential contact details notice.pdf",
    "Annex 1 - Confidential contact details notice - welsh.pdf",
    "Privacy_Notice.pdf",
    "Privacy_Notice_Welsh.pdf",
    "Special arrangements letter.docx",
    "C100FinalDocument.pdf",
    "C100FinalDocumentWelsh.pdf",
    "C1A_Document.pdf",
    "C1A_Document_Welsh.pdf",
    "Family Presidents letter to parties.pdf",
    "Family Presidents letter to parties - Welsh.pdf",
    "Blank_C7.pdf",
    "C1A_Blank.pdf",
    "C1A_Blank_Welsh.pdf",
    "cover_letter_re5.pdf",
    "cover_letter_welsh_re5.pdf",
    "cover_letter_re5.pdf",
    "cover_letter_welsh_re5.pdf",
    "cover_letter_re5.pdf",
    "cover_letter_welsh_re5.pdf",
  ],
};

export const EXPECTED_APPLICANT_FL401_PACKS = {
  personallyServedByApplicantSolicitor: [
    "FL401FinalDocument.pdf",
    "FL401FinalDocumentWelsh.pdf",
    "Annex 1 - Confidential contact details notice.pdf",
    "Annex 1 - Confidential contact details notice - welsh.pdf",
    "Privacy_Notice.pdf",
    "Privacy_Notice_Welsh.pdf",
    "Special arrangements letter.docx",
    "FL415.pdf",
  ],
  personallyServedByCourtBailiff: [
    "FL401FinalDocument.pdf",
    "FL401FinalDocumentWelsh.pdf",
    "Annex 1 - Confidential contact details notice.pdf",
    "Annex 1 - Confidential contact details notice - welsh.pdf",
    "Privacy_Notice.pdf",
    "Privacy_Notice_Welsh.pdf",
    "Special arrangements letter.docx",
  ],
  personallyServedByCourtAdmin: [
    "FL401FinalDocument.pdf",
    "FL401FinalDocumentWelsh.pdf",
    "Annex 1 - Confidential contact details notice.pdf",
    "Annex 1 - Confidential contact details notice - welsh.pdf",
    "Privacy_Notice.pdf",
    "Privacy_Notice_Welsh.pdf",
    "Special arrangements letter.docx",
  ],
  nonPersonallyServedToAllParties: [
    "FL401FinalDocument.pdf",
    "FL401FinalDocumentWelsh.pdf",
    "Annex 1 - Confidential contact details notice.pdf",
    "Annex 1 - Confidential contact details notice - welsh.pdf",
    "Privacy_Notice.pdf",
    "Privacy_Notice_Welsh.pdf",
    "Special arrangements letter.docx",
  ],
};

export const EXPECTED_RESPONDENT_FL401_PACKS = {
  personallyServedByApplicantSolicitor: [
    "FL401FinalDocument.pdf",
    "FL401FinalDocumentWelsh.pdf",
    "Annex 1 - Confidential contact details notice.pdf",
    "Annex 1 - Confidential contact details notice - welsh.pdf",
    "Privacy_Notice.pdf",
    "Privacy_Notice_Welsh.pdf",
    "Special arrangements letter.docx",
    "cover_letter_re3.pdf",
    "cover_letter_welsh_re3.pdf",
  ],
  personallyServedByCourtBailiff: [
    "FL401FinalDocument.pdf",
    "FL401FinalDocumentWelsh.pdf",
    "Annex 1 - Confidential contact details notice.pdf",
    "Annex 1 - Confidential contact details notice - welsh.pdf",
    "Privacy_Notice.pdf",
    "Privacy_Notice_Welsh.pdf",
    "Special arrangements letter.docx",
    "cover_letter_re1.pdf",
    "cover_letter_welsh_re1.pdf",
  ],
  personallyServedByCourtAdmin: [
    "FL401FinalDocument.pdf",
    "FL401FinalDocumentWelsh.pdf",
    "Annex 1 - Confidential contact details notice.pdf",
    "Annex 1 - Confidential contact details notice - welsh.pdf",
    "Privacy_Notice.pdf",
    "Privacy_Notice_Welsh.pdf",
    "Special arrangements letter.docx",
    "cover_letter_re1.pdf",
    "cover_letter_welsh_re1.pdf",
  ],
  nonPersonallyServedToAllParties: [
    "FL401FinalDocument.pdf",
    "FL401FinalDocumentWelsh.pdf",
    "Annex 1 - Confidential contact details notice.pdf",
    "Annex 1 - Confidential contact details notice - welsh.pdf",
    "Privacy_Notice.pdf",
    "Privacy_Notice_Welsh.pdf",
    "Special arrangements letter.docx",
    "cover_letter_re1.pdf",
    "cover_letter_welsh_re1.pdf",
  ],
};

export const EXPECTED_APPLICANT_COURTNAV_PACKS = {
  personallyServedByCourtBailiff: [
    "FL401FinalDocument.pdf",
    "Privacy_Notice.pdf",
    "Special arrangements letter.docx",
    "cover_letter_ap2.pdf",
    "coversheet.pdf",
  ],
  nonPersonallyServedToAllParties: [
    "FL401FinalDocument.pdf",
    "Privacy_Notice.pdf",
    "Special arrangements letter.docx",
    "cover_letter_ap2.pdf",
    "coversheet.pdf",
  ],
};

export const EXPECTED_RESPONDENT_COURTNAV_PACKS = {
  personallyServedByCourtBailiff: [
    "FL401FinalDocument.pdf",
    "Privacy_Notice.pdf",
    "Special arrangements letter.docx",
    "cover_letter_re1.pdf",
  ],
  nonPersonallyServedToAllParties: [
    "FL401FinalDocument.pdf",
    "Privacy_Notice.pdf",
    "Special arrangements letter.docx",
    "cover_letter_re1.pdf",
    "coversheet.pdf",
  ],
};

const SERVICE_PACK_LOOKUP = {
  FL401: {
    professional: {
      applicantsSolicitor: {
        applicantPack:
          EXPECTED_APPLICANT_FL401_PACKS.personallyServedByApplicantSolicitor,
        respondentPack:
          EXPECTED_RESPONDENT_FL401_PACKS.personallyServedByApplicantSolicitor,
      },
      courtBailiff: {
        applicantPack:
          EXPECTED_APPLICANT_FL401_PACKS.personallyServedByCourtBailiff,
        respondentPack:
          EXPECTED_RESPONDENT_FL401_PACKS.personallyServedByCourtBailiff,
      },
      courtAdmin: {
        applicantPack:
          EXPECTED_APPLICANT_FL401_PACKS.personallyServedByCourtAdmin,
        respondentPack:
          EXPECTED_RESPONDENT_FL401_PACKS.personallyServedByCourtAdmin,
      },
      allParties: {
        applicantPack:
          EXPECTED_APPLICANT_FL401_PACKS.nonPersonallyServedToAllParties,
        respondentPack:
          EXPECTED_RESPONDENT_FL401_PACKS.nonPersonallyServedToAllParties,
      },
    },

    citizen: {
      courtBailiff: {
        applicantPack:
          EXPECTED_APPLICANT_COURTNAV_PACKS.personallyServedByCourtBailiff,
        respondentPack:
          EXPECTED_RESPONDENT_COURTNAV_PACKS.personallyServedByCourtBailiff,
      },
      allParties: {
        applicantPack:
          EXPECTED_APPLICANT_COURTNAV_PACKS.nonPersonallyServedToAllParties,
        respondentPack:
          EXPECTED_RESPONDENT_COURTNAV_PACKS.nonPersonallyServedToAllParties,
      },
    },
  },
  C100: {
    professional: {
      applicantsSolicitor: {
        applicantPack:
          EXPECTED_APPLICANT_C100_PACKS.personallyServedByApplicantSolicitor,
        respondentPack:
          EXPECTED_RESPONDENT_C100_PACKS.personallyServedByApplicantSolicitor,
      },
      courtBailiff: {
        applicantPack:
          EXPECTED_APPLICANT_C100_PACKS.personallyServedByCourtBailiff,
        respondentPack:
          EXPECTED_RESPONDENT_C100_PACKS.personallyServedByCourtBailiff,
      },
      courtAdmin: {
        applicantPack:
          EXPECTED_APPLICANT_C100_PACKS.personallyServedByCourtAdmin,
        respondentPack:
          EXPECTED_RESPONDENT_C100_PACKS.personallyServedByCourtAdmin,
      },
      allParties: {
        applicantPack:
          EXPECTED_APPLICANT_C100_PACKS.nonPersonallyServedToAllParties,
        respondentPack:
          EXPECTED_RESPONDENT_C100_PACKS.nonPersonallyServedToAllParties,
      },
    },
  },
};
