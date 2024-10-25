import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors";
import { PhysicalAbuseContent } from "../../../../../../fixtures/citizen/createCase/C100/safetyConcerns/childConcerns/physicalAbuseContent";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import { SafetyConcernHelpers } from "../safetyConcernHelpers";
import {
  reportAbuseCheckboxIDs,
  reportAbuseInputIDs,
} from "../../../../../../common/commonUniqueSelectors";

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

export class PhysicalAbusePage {
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
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${PhysicalAbuseContent.pageTitle}")`,
    );
    await SafetyConcernHelpers.checkStaticTextChild(page);
    await SafetyConcernHelpers.checkSidebarChild(page);
    await SafetyConcernHelpers.checkContactDetailsText(page);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    c100PhysicalAbuseYesNoToAll,
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
      let contentKey = key as keyof typeof PhysicalAbuseContent;
      await page.fill(
        reportAbuseInputIDs[inputKey],
        PhysicalAbuseContent[contentKey],
      );
    }
    await SafetyConcernHelpers.ongoingBehaviourFieldsChild({
      page: page,
      c100ReportAbuseYesNoToAll: c100PhysicalAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
    });
    await SafetyConcernHelpers.seekHelpFieldsChild({
      page: page,
      c100ReportAbuseYesNoToAll: c100PhysicalAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
      abuseContent: PhysicalAbuseContent,
    });
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
