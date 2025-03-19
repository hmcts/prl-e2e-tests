import { Browser, Page } from "@playwright/test";
import { SupportType } from "../../../../common/types.ts";
import { RequestSupport } from "./requestSupport.ts";
import { ManageFlags } from "./manageFlags.ts";

interface CaseFlagsParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  supportType: SupportType;
  isApproved: boolean;
  withTranslation: boolean;
  accessibilityTest: boolean;
}

// full journey for solicitor requested, court admin managed case flags
export class CaseFlags {
  public static async caseFlags({
    page,
    browser,
    caseRef,
    supportType,
    isApproved,
    withTranslation,
    accessibilityTest,
  }: CaseFlagsParams): Promise<void> {
    await RequestSupport.requestSupport({
      page,
      supportType,
      accessibilityTest,
    });
    await ManageFlags.manageFlags({
      browser,
      caseRef,
      supportType,
      isApproved,
      withTranslation,
      accessibilityTest,
    });
  }
}
