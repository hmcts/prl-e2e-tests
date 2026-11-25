export interface Document {
  fileName: string;
  docStoreId: string;
  documentCode: string;
  documentLabel: string;
}

type DocumentType =
  | "applicantApplication"
  | "medicalReport"
  | "otherWitnessStatement"
  | "confidentialWitnessStatement";
type DocumentMap = Record<DocumentType, Document>;

const DOC_STORE_IDS: Record<DocumentType, Record<"aat" | "demo", string>> = {
  applicantApplication: {
    aat: "7e1e3e31-f8c1-4f4c-851a-0145291b47ac",
    demo: "d450f2d5-dbac-4fe5-8288-5698c68f6166",
  },
  medicalReport: {
    aat: "4d858599-215b-4542-a851-947da8d35a8e",
    demo: "87def36d-0b9f-4374-a633-e40f46a35e94",
  },
  otherWitnessStatement: {
    aat: "f105140a-8a49-420b-820f-e7328a47b008",
    demo: "7f5c19a9-9613-4b84-b6c3-25b3752df5d8",
  },
  confidentialWitnessStatement: {
    aat: "2d58b947-9d46-4490-bb74-26cead031093",
    demo: "2bd4d6a5-b304-498a-bab5-ef2e868c1142",
  },
};

export const DOCUMENTS: DocumentMap = {
  applicantApplication: {
    fileName: "Parental_Responsibility_Order_C45A_draft.pdf",
    docStoreId: getDocStoreId("applicantApplication"),
    documentCode: "applicantApplication",
    documentLabel: "Applicant application",
  },
  medicalReport: {
    fileName: "Medical report.docx",
    docStoreId: getDocStoreId("medicalReport"),
    documentCode: "medicalReports",
    documentLabel: "Medical reports",
  },
  otherWitnessStatement: {
    fileName: "non_molestation_order_fl404a_draft.pdf",
    docStoreId: getDocStoreId("otherWitnessStatement"),
    documentCode: "otherWitnessStatements",
    documentLabel: "Other witness statements",
  },
  confidentialWitnessStatement: {
    fileName: "welsh_non_molestation_order_fl404a_draft.pdf",
    docStoreId: getDocStoreId("confidentialWitnessStatement"),
    documentCode: "otherWitnessStatements",
    documentLabel: "Other witness statements",
  },
};

function getDocStoreId(documentType: DocumentType): string {
  const environment = process.env.MANAGE_CASES_TEST_ENV as string;
  return DOC_STORE_IDS[documentType][environment];
}
