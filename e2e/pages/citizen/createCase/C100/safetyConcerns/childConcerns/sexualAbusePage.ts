import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import {
  reportAbuseCheckboxIDs,
  reportAbuseInputIDs,
} from "../../../../../../common/commonUniqueSelectors";
import { Selectors } from "../../../../../../common/selectors";
import { SexualAbuseContent } from "../../../../../../fixtures/citizen/createCase/C100/safetyConcerns/childConcerns/sexualAbuseContent";
import { SafetyConcernHelpers } from "../safetyConcernHelpers";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper.ts";

interface SexualAbusePageOptions {
  page: Page;
  accessibilityTest: boolean;
  c100SexualAbuseYesNoToAll: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100SexualAbuseYesNoToAll: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class SexualAbusePage {
  public static async sexualAbusePage({
    page,
    accessibilityTest,
    c100SexualAbuseYesNoToAll,
  }: SexualAbusePageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({
      page,
      c100SexualAbuseYesNoToAll,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${SexualAbuseContent.pageTitle}")`,
    );
    await SafetyConcernHelpers.checkStaticTextChild(page);
    await SafetyConcernHelpers.checkSidebarChild(page);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page, [
        reportAbuseInputIDs.ongoingBehaviorYes,
        reportAbuseInputIDs.seekHelpYes,
        reportAbuseInputIDs.seekHelpNo,
      ]); //false-positive (https://github.com/alphagov/govuk-frontend/issues/979, https://github.com/w3c/aria/issues/1404)
    }
  }

  private static async fillInFields({
    page,
    c100SexualAbuseYesNoToAll,
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
      const contentKey = key as keyof typeof SexualAbuseContent;
      await page.fill(
        reportAbuseInputIDs[inputKey],
        SexualAbuseContent[contentKey],
      );
    }
    await SafetyConcernHelpers.ongoingBehaviourFieldsChild({
      page: page,
      c100ReportAbuseYesNoToAll: c100SexualAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
    });
    await SafetyConcernHelpers.seekHelpFieldsChild({
      page: page,
      c100ReportAbuseYesNoToAll: c100SexualAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
      abuseContent: SexualAbuseContent,
    });
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
