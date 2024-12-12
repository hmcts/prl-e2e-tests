import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import { reportAbuseInputIDs } from "../../../../../../common/commonUniqueSelectors";
import { Selectors } from "../../../../../../common/selectors";
import { PhysicalAbuseContent } from "../../../../../../fixtures/citizen/createCase/C100/safetyConcerns/yourselfConcerns/physicalAbuseContent";
import { SafetyConcernHelpers } from "../safetyConcernHelpers";

interface PhysicalAbusePageOptions {
  page: Page;
  accessibilityTest: boolean;
  c100PhysicalAbuseYesNoToAll: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100PhysicalAbuseYesNoToAll: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class PhysicalAbuseYourselfPage {
  public static async physicalAbusePage({
    page,
    accessibilityTest,
    c100PhysicalAbuseYesNoToAll,
  }: PhysicalAbusePageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({
      page,
      c100PhysicalAbuseYesNoToAll,
    });
  }

  private static async checkPageLoads({
    page,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${PhysicalAbuseContent.pageTitle}")`,
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
    c100PhysicalAbuseYesNoToAll,
  }: FillInFieldsOptions): Promise<void> {
    const textToFill: [string, string] = [
      "behaviourDetails",
      "behaviourStartDate",
    ];
    for (const key of textToFill) {
      const inputKey = key as keyof typeof reportAbuseInputIDs;
      const contentKey = key as keyof typeof PhysicalAbuseContent;
      await page.fill(
        reportAbuseInputIDs[inputKey],
        PhysicalAbuseContent[contentKey],
      );
    }
    await SafetyConcernHelpers.ongoingBehaviourFieldsYourself({
      page: page,
      c100ReportAbuseYesNoToAll: c100PhysicalAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
    });
    await SafetyConcernHelpers.seekHelpFieldsYourself({
      page: page,
      c100ReportAbuseYesNoToAll: c100PhysicalAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
      abuseContent: PhysicalAbuseContent,
    });
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
