import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import {
  PhysicalAbuseContent
} from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/physicalAbuseContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import {
  ReportAbuseCommonContent
} from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/reportAbuseCommonContent";
import { ReportAbuseHelpers } from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/reportAbuseHelpers";

enum checkboxIDs {
  child1 = '#childrenConcernedAbout'
}

enum inputIDs {
  ongoingBehaviorYes = "#isOngoingBehaviour",
  ongoingBehaviorNo = "#isOngoingBehaviour-2",
  seekHelpYes = "#seekHelpFromPersonOrAgency",
  seekHelpNo = "#seekHelpFromPersonOrAgency-2",
  behaviourDetails = '#behaviourDetails',
  behaviourStartDate = '#behaviourStartDate',
  seekHelpDetails = '#seekHelpDetails'
}

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
    c100PhysicalAbuseYesNoToAll
  }: PhysicalAbusePageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest
    });
    await this.fillInFields({
      page,
      c100PhysicalAbuseYesNoToAll
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${PhysicalAbuseContent.pageTitle}")`
    );
    await ReportAbuseHelpers.checkStaticText(page);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page)
    }
  }

  private static async fillInFields({
    page,
    c100PhysicalAbuseYesNoToAll
  }: FillInFieldsOptions): Promise<void> {
    for (let checkbox of Object.values(checkboxIDs)) {
      await page.check(
        checkbox
      );
    }
    const textToFill: [string, string] = [
      'behaviourDetails', 'behaviourStartDate'
    ];
    for (let key of textToFill) {
      let inputKey = key as keyof typeof inputIDs;
      let contentKey = key as keyof typeof PhysicalAbuseContent;
      await page.fill(
        inputIDs[inputKey],
        PhysicalAbuseContent[contentKey]
      )
    }
    await ReportAbuseHelpers.ongoingBehaviourFields({
      page: page,
      c100PhysicalAbuseYesNoToAll: c100PhysicalAbuseYesNoToAll,
      inputIDs: inputIDs,
    });
    await ReportAbuseHelpers.seekHelpFields({
      page: page,
      c100PhysicalAbuseYesNoToAll: c100PhysicalAbuseYesNoToAll,
      inputIDs: inputIDs,
      abuseContent: PhysicalAbuseContent
    });
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`
    )
  }
}