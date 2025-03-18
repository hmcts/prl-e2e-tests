import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { SupportType } from "../../../../common/types.ts";
import { Fl401RequestSupport1SupportForPage } from "../../../../pages/manageCases/caseProgression/caseFlags/fl401/fl401RequestSupport1SupportForPage.ts";
import { Fl401RequestSupport1SupportTypePage } from "../../../../pages/manageCases/caseProgression/caseFlags/fl401/fl401RequestSupport1SupportTypePage.ts";
import { Fl401RequestSupport1ReasonableAdjustmentPage } from "../../../../pages/manageCases/caseProgression/caseFlags/fl401/fl401RequestSupport1ReasonableAdjustmentPage.ts";
import { Fl401RequestSupport1DocumentsInAlternativeFormatPage } from "../../../../pages/manageCases/caseProgression/caseFlags/fl401/fl401RequestSupport1DocumentsInAlternativeFormatPage.ts";
import { Fl401RequestSupport1TellUsMoreAboutTheRequestPage } from "../../../../pages/manageCases/caseProgression/caseFlags/fl401/fl401RequestSupport1TellUsMoreAboutTheRequestPage.ts";
import { Fl401RequestSupport1SubmitPage } from "../../../../pages/manageCases/caseProgression/caseFlags/fl401/fl401RequestSupport1SubmitPage.ts";
import { Fl401RequestSupport1LanguageInterpreterPage } from "../../../../pages/manageCases/caseProgression/caseFlags/fl401/fl401RequestSupport1LanguageInterpreterPage.ts";
import { Selectors } from "../../../../common/selectors.ts";

interface RequestSupportParams {
  page: Page;
  supportType: SupportType;
  accessibilityTest: boolean;
}

// request support journey as a solicitor
export class RequestSupport {
  public static async requestSupport({
    page,
    supportType,
    accessibilityTest,
  }: RequestSupportParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Request support");
    await Fl401RequestSupport1SupportForPage.fl401RequestSupport1SupportForPage(
      page,
      accessibilityTest,
    );
    await Fl401RequestSupport1SupportTypePage.fl401RequestSupport1SupportTypePage(
      page,
      supportType,
      accessibilityTest,
    );
    if (supportType === "reasonableAdjustment") {
      await Fl401RequestSupport1ReasonableAdjustmentPage.fl401RequestSupport1ReasonableAdjustmentPage(
        page,
        accessibilityTest,
      );
      await Fl401RequestSupport1DocumentsInAlternativeFormatPage.fl401RequestSupport1DocumentsInAlternativeFormatPage(
        page,
        accessibilityTest,
      );
    } else {
      await Fl401RequestSupport1LanguageInterpreterPage.fl401RequestSupport1LanguageInterpreterPage(
        page,
        accessibilityTest,
      );
    }
    await Fl401RequestSupport1TellUsMoreAboutTheRequestPage.fl401RequestSupport1TellUsMoreAboutTheRequestPage(
      page,
      accessibilityTest,
    );
    await Fl401RequestSupport1SubmitPage.fl401RequestSupport1SubmitPage(
      page,
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
