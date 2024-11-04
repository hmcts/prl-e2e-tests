import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors";
import { PsychologicalAbuseContent } from "../../../../../../fixtures/citizen/createCase/C100/safetyConcerns/yourselfConcerns/psychologicalAbuseContent";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import { SafetyConcernHelpers } from "../safetyConcernHelpers";
import { reportAbuseInputIDs } from "../../../../../../common/commonUniqueSelectors";

interface PsychologicalAbusePageOptions {
  page: Page;
  accessibilityTest: boolean;
  c100PsychologicalAbuseYesNoToAll: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100PsychologicalAbuseYesNoToAll: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class PsychologicalAbuseYourselfPage {
  public static async psychologicalAbusePage({
    page,
    accessibilityTest,
    c100PsychologicalAbuseYesNoToAll,
  }: PsychologicalAbusePageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({
      page,
      c100PsychologicalAbuseYesNoToAll,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${PsychologicalAbuseContent.pageTitle}")`,
    );
    await SafetyConcernHelpers.checkStaticTextYourself(page);
    await SafetyConcernHelpers.checkSidebarYourself(page);
    await SafetyConcernHelpers.checkContactDetailsText(page);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    c100PsychologicalAbuseYesNoToAll,
  }: FillInFieldsOptions): Promise<void> {
    const textToFill: [string, string] = [
      "behaviourDetails",
      "behaviourStartDate",
    ];
    for (let key of textToFill) {
      let inputKey = key as keyof typeof reportAbuseInputIDs;
      let contentKey = key as keyof typeof PsychologicalAbuseContent;
      await page.fill(
        reportAbuseInputIDs[inputKey],
        PsychologicalAbuseContent[contentKey],
      );
    }
    await SafetyConcernHelpers.ongoingBehaviourFieldsYourself({
      page: page,
      c100ReportAbuseYesNoToAll: c100PsychologicalAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
    });
    await SafetyConcernHelpers.seekHelpFieldsYourself({
      page: page,
      c100ReportAbuseYesNoToAll: c100PsychologicalAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
      abuseContent: PsychologicalAbuseContent,
    });
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
