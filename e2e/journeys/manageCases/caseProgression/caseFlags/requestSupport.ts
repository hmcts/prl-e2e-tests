import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { solicitorCaseCreateType, SupportType } from "../../../../common/types";
import { RequestSupportSupportForPage } from "../../../../pages/manageCases/caseProgression/caseFlags/requestSupportSupportForPage";
import { RequestSupportSupportTypePage } from "../../../../pages/manageCases/caseProgression/caseFlags/requestSupportSupportTypePage";
import { RequestSupportReasonableAdjustmentPage } from "../../../../pages/manageCases/caseProgression/caseFlags/requestSupportReasonableAdjustmentPage";
import { RequestSupportDocumentsInAlternativeFormatPage } from "../../../../pages/manageCases/caseProgression/caseFlags/requestSupportDocumentsInAlternativeFormatPage";
import { RequestSupportTellUsMoreAboutTheRequestPage } from "../../../../pages/manageCases/caseProgression/caseFlags/requestSupportTellUsMoreAboutTheRequestPage";
import { RequestSupportSubmitPage } from "../../../../pages/manageCases/caseProgression/caseFlags/requestSupportSubmitPage";
import { RequestSupportLanguageInterpreterPage } from "../../../../pages/manageCases/caseProgression/caseFlags/requestSupportLanguageInterpreterPage";
import { Selectors } from "../../../../common/selectors";

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
