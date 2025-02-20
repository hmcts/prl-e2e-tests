import { Page } from "@playwright/test";
import {
  AdditionalApplicationType,
  solicitorCaseCreateType,
} from "../../../../common/types.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

export class UploadAdditionalApplicationsSubmitPage {
  public static async uploadAdditionalApplicationsSubmitPage(
    page: Page,
    caseType: solicitorCaseCreateType,
    additionalApplicationType: AdditionalApplicationType,
    withNotice: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    // TODO
  }

  private static async checkPageLoads(): Promise<void> {}

  private static async saveAndContinue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
