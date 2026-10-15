import { WelshLanguageRequirementsOptions } from "../../pageObjects/pages/exui/welshLanguageRequirements/welshLanguageRequirements1.po.js";

/** The application PDFs CCD regenerates when the event is saved. */
const FinalDocument = {
  english: "FL401FinalDocument.pdf",
  welsh: "FL401FinalDocumentWelsh.pdf",
} as const;

const snapshotPath: string[] = ["caseProgression", "welshLanguageRequirements"];

export interface WelshLanguageRequirementsScenario extends WelshLanguageRequirementsOptions {
  /**
   * Distinguishes this scenario in the generated test title. Playwright rejects
   * duplicate test titles, so every scenario needs its own.
   */
  description: string;
  /** The documents the case documents tab must list once the event is saved. */
  expectedFinalDocuments: string[];
  snapshotPath: string[];
  snapshotName: string;
}

export const WelshLanguageRequirementsCaseWorkerScenarios: WelshLanguageRequirementsScenario[] =
  [
    {
      description: "no Welsh documents wanted",
      needDocumentsInWelsh: false,
      languageToCompleteApplication: "English",
      doesApplicationNeedTranslating: false,
      expectedFinalDocuments: [FinalDocument.english],
      snapshotPath,
      snapshotName: "welsh-documents-not-wanted",
    },
    {
      description: "English application translated into Welsh",
      needDocumentsInWelsh: true,
      languageToCompleteApplication: "English",
      doesApplicationNeedTranslating: true,
      expectedFinalDocuments: [FinalDocument.welsh, FinalDocument.english],
      snapshotPath,
      snapshotName: "english-application-translated-into-welsh",
    },
    {
      description: "English application not translated",
      needDocumentsInWelsh: true,
      languageToCompleteApplication: "English",
      doesApplicationNeedTranslating: false,
      expectedFinalDocuments: [FinalDocument.english],
      snapshotPath,
      snapshotName: "english-application-not-translated",
    },
    {
      description: "Welsh application translated into English",
      needDocumentsInWelsh: true,
      languageToCompleteApplication: "Welsh",
      doesApplicationNeedTranslating: true,
      expectedFinalDocuments: [FinalDocument.welsh, FinalDocument.english],
      snapshotPath,
      snapshotName: "welsh-application-translated-into-english",
    },
    {
      description: "Welsh application not translated",
      needDocumentsInWelsh: true,
      languageToCompleteApplication: "Welsh",
      doesApplicationNeedTranslating: false,
      expectedFinalDocuments: [FinalDocument.welsh],
      snapshotPath,
      snapshotName: "welsh-application-not-translated",
    },
  ];
