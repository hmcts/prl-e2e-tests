import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import { reportAbuseInputIDs } from "../../../../../../common/commonUniqueSelectors";
import { Selectors } from "../../../../../../common/selectors";
import { SexualAbuseContent } from "../../../../../../fixtures/citizen/createCase/C100/safetyConcerns/yourselfConcerns/sexualAbuseContent";
import { SafetyConcernHelpers } from "../safetyConcernHelpers";

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

export class SexualAbuseYourselfPage {
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
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${SexualAbuseContent.pageTitle}")`,
    );
    await SafetyConcernHelpers.checkStaticTextYourself(page);
    await SafetyConcernHelpers.checkSidebarYourself(page);
    await SafetyConcernHelpers.checkContactDetailsText(page);
    // if (accessibilityTest) {
    //   await AccessibilityTestHelper.run(page); #TODO Commented out until ticket-6593 is complete
    // }
  }

  private static async fillInFields({
    page,
    c100SexualAbuseYesNoToAll,
  }: FillInFieldsOptions): Promise<void> {
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
    await SafetyConcernHelpers.ongoingBehaviourFieldsYourself({
      page: page,
      c100ReportAbuseYesNoToAll: c100SexualAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
    });
    await SafetyConcernHelpers.seekHelpFieldsYourself({
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
