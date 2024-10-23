import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ReportAbuseHelpers } from "./reportAbuseHelpers";
import {
  reportAbuseCheckboxIDs,
  reportAbuseInputIDs,
} from "../../../../../journeys/citizen/createCase/C100SafetyConcerns/c100SafetyConcerns";
import { SexualAbuseContent } from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/sexualAbuseContent";

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
    await ReportAbuseHelpers.checkStaticText(page);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    c100SexualAbuseYesNoToAll,
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
      let contentKey = key as keyof typeof SexualAbuseContent;
      await page.fill(
        reportAbuseInputIDs[inputKey],
        SexualAbuseContent[contentKey],
      );
    }
    await ReportAbuseHelpers.ongoingBehaviourFields({
      page: page,
      c100ReportAbuseYesNoToAll: c100SexualAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
    });
    await ReportAbuseHelpers.seekHelpFields({
      page: page,
      c100ReportAbuseYesNoToAll: c100SexualAbuseYesNoToAll,
      inputIDs: reportAbuseInputIDs,
      abuseContent: SexualAbuseContent,
    });
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
