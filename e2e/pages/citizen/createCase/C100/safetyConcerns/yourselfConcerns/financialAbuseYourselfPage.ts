import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { reportAbuseInputIDs } from "../../../../../../common/commonUniqueSelectors.ts";
import { Selectors } from "../../../../../../common/selectors.ts";
import { FinancialAbuseContent } from "../../../../../../fixtures/citizen/createCase/C100/safetyConcerns/yourselfConcerns/financialAbuseContent.ts";
import { SafetyConcernHelpers } from "../safetyConcernHelpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface FinancialAbusePageOptions {
  page: Page;
  accessibilityTest: boolean;
  c100FinancialAbuseYesNoToAll: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100FinancialAbuseYesNoToAll: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class FinancialAbuseYourselfPage {
  public static async financialAbusePage({
    page,
    accessibilityTest,
    c100FinancialAbuseYesNoToAll,
  }: FinancialAbusePageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({
      page,
      c100FinancialAbuseYesNoToAll,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${FinancialAbuseContent.pageTitle}")`,
    );
    await SafetyConcernHelpers.checkStaticTextYourself(page);
    await SafetyConcernHelpers.checkSidebarYourself(page);
    if (accessibilityTest) {
      await new AxeUtils(page).audit({
        exclude: [
          reportAbuseInputIDs.ongoingBehaviorYes,
          reportAbuseInputIDs.seekHelpYes,
          reportAbuseInputIDs.seekHelpNo,
        ],
      }); //false-positive (https://github.com/alphagov/govuk-frontend/issues/979, https://github.com/w3c/aria/issues/1404)
    }
  }

  private static async fillInFields({
    page,
    c100FinancialAbuseYesNoToAll,
  }: FillInFieldsOptions): Promise<void> {
    const textToFill: [string, string] = [
      "behaviourDetails",
      "behaviourStartDate",
    ];
    for (const key of textToFill) {
      const inputKey = key as keyof typeof reportAbuseInputIDs;
      const contentKey = key as keyof typeof FinancialAbuseContent;
      await page.fill(
        reportAbuseInputIDs[inputKey],
        FinancialAbuseContent[contentKey],
      );
    }
    await SafetyConcernHelpers.ongoingBehaviourFieldsYourself({
      page: page,
      c100ReportAbuseYesNoToAll: c100FinancialAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
    });
    await SafetyConcernHelpers.seekHelpFieldsYourself({
      page: page,
      c100ReportAbuseYesNoToAll: c100FinancialAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
      abuseContent: FinancialAbuseContent,
    });
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
