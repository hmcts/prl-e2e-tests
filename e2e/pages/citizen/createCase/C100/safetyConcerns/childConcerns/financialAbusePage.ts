import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import {
  reportAbuseCheckboxIDs,
  reportAbuseInputIDs,
} from "../../../../../../common/commonUniqueSelectors";
import { Selectors } from "../../../../../../common/selectors";
import { FinancialAbuseContent } from "../../../../../../fixtures/citizen/createCase/C100/safetyConcerns/childConcerns/financialAbuseContent";
import { SafetyConcernHelpers } from "../safetyConcernHelpers";

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

export class FinancialAbusePage {
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
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${FinancialAbuseContent.pageTitle}")`,
    );
    await SafetyConcernHelpers.checkStaticTextChild(page);
    await SafetyConcernHelpers.checkSidebarChild(page);
    // if (accessibilityTest) {
    //   await AccessibilityTestHelper.run(page); #TODO Commented out until ticket-6593 is complete
    // }
  }

  private static async fillInFields({
    page,
    c100FinancialAbuseYesNoToAll,
  }: FillInFieldsOptions): Promise<void> {
    for (const checkbox of Object.values(reportAbuseCheckboxIDs)) {
      await page.check(checkbox);
    }
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
    await SafetyConcernHelpers.ongoingBehaviourFieldsChild({
      page: page,
      c100ReportAbuseYesNoToAll: c100FinancialAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
    });
    await SafetyConcernHelpers.seekHelpFieldsChild({
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
