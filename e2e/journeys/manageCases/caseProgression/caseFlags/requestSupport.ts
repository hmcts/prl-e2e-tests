import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import {
  solicitorCaseCreateType,
  SupportType,
} from "../../../../common/types.ts";
import { RequestSupportSupportForPage } from "../../../../pages/manageCases/caseProgression/caseFlags/requestSupportSupportForPage.ts";
import { RequestSupportSupportTypePage } from "../../../../pages/manageCases/caseProgression/caseFlags/requestSupportSupportTypePage.ts";
import { RequestSupportReasonableAdjustmentPage } from "../../../../pages/manageCases/caseProgression/caseFlags/requestSupportReasonableAdjustmentPage.ts";
import { RequestSupportDocumentsInAlternativeFormatPage } from "../../../../pages/manageCases/caseProgression/caseFlags/requestSupportDocumentsInAlternativeFormatPage.ts";
import { RequestSupportTellUsMoreAboutTheRequestPage } from "../../../../pages/manageCases/caseProgression/caseFlags/requestSupportTellUsMoreAboutTheRequestPage.ts";
import { RequestSupportSubmitPage } from "../../../../pages/manageCases/caseProgression/caseFlags/requestSupportSubmitPage.ts";
import { RequestSupportLanguageInterpreterPage } from "../../../../pages/manageCases/caseProgression/caseFlags/requestSupportLanguageInterpreterPage.ts";
import { Selectors } from "../../../../common/selectors.ts";

interface RequestSupportParams {
  page: Page;
  caseType: solicitorCaseCreateType;
  supportType: SupportType;
  accessibilityTest: boolean;
}

// request support journey as a solicitor
export class RequestSupport {
  public static async requestSupport({
    page,
    caseType,
    supportType,
    accessibilityTest,
  }: RequestSupportParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Request support");
    await RequestSupportSupportForPage.requestSupportSupportForPage(
      page,
      caseType,
      accessibilityTest,
    );
    await RequestSupportSupportTypePage.requestSupportSupportTypePage(
      page,
      supportType,
      accessibilityTest,
    );
    if (supportType === "reasonableAdjustment") {
      await RequestSupportReasonableAdjustmentPage.requestSupportReasonableAdjustmentPage(
        page,
        accessibilityTest,
      );
      await RequestSupportDocumentsInAlternativeFormatPage.requestSupportDocumentsInAlternativeFormatPage(
        page,
        accessibilityTest,
      );
    } else {
      await RequestSupportLanguageInterpreterPage.requestSupportLanguageInterpreterPage(
        page,
        accessibilityTest,
      );
    }
    await RequestSupportTellUsMoreAboutTheRequestPage.requestSupportTellUsMoreAboutTheRequestPage(
      page,
      accessibilityTest,
    );
    await RequestSupportSubmitPage.requestSupportSubmitPage(
      page,
      caseType,
      supportType,
      accessibilityTest,
    );
    await this.checkSupportTab(page, supportType);
  }

  private static async checkSupportTab(
    page: Page,
    supportType: SupportType,
  ): Promise<void> {
    await Helpers.clickTab(page, "Support");
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: "Case flags",
      })
      .waitFor();
    let rowFlagText: string = "Documents in a specified colour";
    if (supportType === "languageInterpreter") {
      rowFlagText = "Language Interpreter";
    }
    await page
      .getByRole("row", { name: rowFlagText })
      .getByText("REQUESTED")
      .isVisible();
  }
}
