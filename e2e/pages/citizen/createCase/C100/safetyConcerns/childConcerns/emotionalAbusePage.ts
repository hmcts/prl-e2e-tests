import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import {
  reportAbuseCheckboxIDs,
  reportAbuseInputIDs,
} from "../../../../../../common/commonUniqueSelectors";
import { Selectors } from "../../../../../../common/selectors";
import { EmotionalAbuseContent } from "../../../../../../fixtures/citizen/createCase/C100/safetyConcerns/childConcerns/emotionalAbuseContent";
import { SafetyConcernHelpers } from "../safetyConcernHelpers";

interface EmotionalAbusePageOptions {
  page: Page;
  accessibilityTest: boolean;
  c100EmotionalAbuseYesNoToAll: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100EmotionalAbuseYesNoToAll: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class EmotionalAbusePage {
  public static async emotionalAbusePage({
    page,
    accessibilityTest,
    c100EmotionalAbuseYesNoToAll,
  }: EmotionalAbusePageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({
      page,
      c100EmotionalAbuseYesNoToAll,
    });
  }

  private static async checkPageLoads({
    page,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${EmotionalAbuseContent.pageTitle}")`,
    );
    await SafetyConcernHelpers.checkStaticTextChild(page);
    await SafetyConcernHelpers.checkSidebarChild(page);
    await SafetyConcernHelpers.checkContactDetailsText(page);
    // if (accessibilityTest) {
    //   await AccessibilityTestHelper.run(page); #TODO Commented out until ticket-6593 is complete
    // }
  }

  private static async fillInFields({
    page,
    c100EmotionalAbuseYesNoToAll,
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
      const contentKey = key as keyof typeof EmotionalAbuseContent;
      await page.fill(
        reportAbuseInputIDs[inputKey],
        EmotionalAbuseContent[contentKey],
      );
    }
    await SafetyConcernHelpers.ongoingBehaviourFieldsChild({
      page: page,
      c100ReportAbuseYesNoToAll: c100EmotionalAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
    });
    await SafetyConcernHelpers.seekHelpFieldsChild({
      page: page,
      c100ReportAbuseYesNoToAll: c100EmotionalAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
      abuseContent: EmotionalAbuseContent,
    });
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
