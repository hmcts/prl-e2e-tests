export interface Document {
  fileName: string;
  docStoreId: string;
  documentCode: string;
  documentLabel: string;
}

type DocumentType = "medicalReport";
type DocumentMap = Record<DocumentType, Document>;

const DOC_STORE_IDS: Record<DocumentType, Record<"aat" | "demo", string>> = {
  medicalReport: {
    aat: "4d858599-215b-4542-a851-947da8d35a8e",
    demo: "87def36d-0b9f-4374-a633-e40f46a35e94",
  },
};

export const DOCUMENTS: DocumentMap = {
  medicalReport: {
    fileName: "Medical report.docx",
    docStoreId: getDocStoreId("medicalReport"),
    documentCode: "medicalReports",
    documentLabel: "Medical reports",
  },
};

function getDocStoreId(documentType: DocumentType): string {
  const environment = process.env.MANAGE_CASES_TEST_ENV as string;
  return DOC_STORE_IDS[documentType][environment];
}
