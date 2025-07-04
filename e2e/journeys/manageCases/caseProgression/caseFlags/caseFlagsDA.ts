import { Browser, Page } from "@playwright/test";
import {
  solicitorCaseCreateType,
  SupportType,
} from "../../../../common/types.ts";
import { RequestSupport } from "./requestSupport.ts";
import { ManageFlagsDA } from "./manageFlagsDA.ts";

interface CaseFlagsParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  caseType: solicitorCaseCreateType;
  supportType: SupportType;
  isApproved: boolean;
  withTranslation: boolean;
  accessibilityTest: boolean;
}

// full journey for solicitor requested, court admin managed case flags
// although the pages have different names the contents are extremely similar
export class CaseFlagsDA {
  public static async caseFlagsDA({
    page,
    browser,
    caseRef,
    caseType,
    supportType,
    isApproved,
    withTranslation,
    accessibilityTest,
  }: CaseFlagsParams): Promise<void> {
    await RequestSupport.requestSupport({
      page,
      caseType,
      supportType,
      accessibilityTest,
    });
      //The behaviour between CA and DA case flags differs according to the flag type - Submit/Continue, with/without submission page, etc
      //because this is a common component, a manageFlagsDA file was created to avoid conflicts between them
    await ManageFlagsDA.manageFlagsDA({
      browser,
      caseRef,
      caseType,
      supportType,
      isApproved,
      withTranslation,
      accessibilityTest,
    });
  }
}
