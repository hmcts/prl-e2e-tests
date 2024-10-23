import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ReportAbuseHelpers } from "./reportAbuseHelpers";
import {
  reportAbuseCheckboxIDs,
  reportAbuseInputIDs,
} from "../../../../../journeys/citizen/createCase/C100SafetyConcerns/c100SafetyConcerns";
import { EmotionalAbuseContent } from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/emotionalAbuseContent";

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
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${EmotionalAbuseContent.pageTitle}")`,
    );
    await ReportAbuseHelpers.checkStaticText(page);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    c100EmotionalAbuseYesNoToAll,
  }: FillInFieldsOptions): Promise<void> {
    for (let checkbox of Object.values(reportAbuseCheckboxIDs)) {
      await page.check(checkbox);
    }
    const textToFill: [string, string] = [
      "behaviourDetails",
      "behaviourStartDate",
    ];
    for (let key of textToFill) {
      let inputKey = key as keyof typeof reportAbuseInputIDs;
      let contentKey = key as keyof typeof EmotionalAbuseContent;
      await page.fill(
        reportAbuseInputIDs[inputKey],
        EmotionalAbuseContent[contentKey],
      );
    }
    await ReportAbuseHelpers.ongoingBehaviourFields({
      page: page,
      c100ReportAbuseYesNoToAll: c100EmotionalAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
    });
    await ReportAbuseHelpers.seekHelpFields({
      page: page,
      c100ReportAbuseYesNoToAll: c100EmotionalAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
      abuseContent: EmotionalAbuseContent,
    });
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
