export class CaseNumberUtils {
  constructor() {}

  getHyphenatedCaseReference(caseNumber?: string): string {
    if (!caseNumber?.trim()) {
      throw new Error(
        "Invalid case number: Expected a non-empty 16-digit string.",
      );
    }
    return caseNumber.match(/.{1,4}/g)!.join("-");
  }
}
