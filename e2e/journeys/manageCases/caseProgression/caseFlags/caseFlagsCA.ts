import { Browser, Page } from "@playwright/test";
import {
  solicitorCaseCreateType,
  SupportType,
} from "../../../../common/types.ts";
import { RequestSupport } from "./requestSupport.ts";
import { ManageFlagsCA } from "./manageFlagsCA.ts";

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
export class CaseFlagsCA {
  public static async caseFlagsCA({
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
    await ManageFlagsCA.manageFlagsCA({
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
