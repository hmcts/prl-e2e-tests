import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors";
import { OtherAbuseContent } from "../../../../../../fixtures/citizen/createCase/C100/safetyConcerns/yourselfConcerns/otherAbuseContent";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import { SafetyConcernHelpers } from "../safetyConcernHelpers";
import {
  reportAbuseCheckboxIDs,
  reportAbuseInputIDs,
} from "../../../../../../common/commonUniqueSelectors";

interface OtherAbusePageOptions {
  page: Page;
  accessibilityTest: boolean;
  c100OtherAbuseYesNoToAll: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100OtherAbuseYesNoToAll: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class OtherAbusePage {
  public static async otherAbusePage({
    page,
    accessibilityTest,
    c100OtherAbuseYesNoToAll,
  }: OtherAbusePageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({
      page,
      c100OtherAbuseYesNoToAll,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${OtherAbuseContent.pageTitle}")`,
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
    c100OtherAbuseYesNoToAll,
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
      let contentKey = key as keyof typeof OtherAbuseContent;
      await page.fill(
        reportAbuseInputIDs[inputKey],
        OtherAbuseContent[contentKey],
      );
    }
    await SafetyConcernHelpers.ongoingBehaviourFieldsYourself({
      page: page,
      c100ReportAbuseYesNoToAll: c100OtherAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
    });
    await SafetyConcernHelpers.seekHelpFieldsYourself({
      page: page,
      c100ReportAbuseYesNoToAll: c100OtherAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
      abuseContent: OtherAbuseContent,
    });
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
