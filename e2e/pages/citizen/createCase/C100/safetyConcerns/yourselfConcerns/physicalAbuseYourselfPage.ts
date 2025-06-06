import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { reportAbuseInputIDs } from "../../../../../../common/commonUniqueSelectors.ts";
import { Selectors } from "../../../../../../common/selectors.ts";
import { PhysicalAbuseContent } from "../../../../../../fixtures/citizen/createCase/C100/safetyConcerns/yourselfConcerns/physicalAbuseContent.ts";
import { SafetyConcernHelpers } from "../safetyConcernHelpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

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
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${PhysicalAbuseContent.pageTitle}")`,
    );
    await SafetyConcernHelpers.checkStaticTextYourself(page);
    await SafetyConcernHelpers.checkSidebarYourself(page);
    if (accessibilityTest) {
      await new AxeUtils(page).audit({
        exclude: [
          reportAbuseInputIDs.ongoingBehaviorYes,
          reportAbuseInputIDs.seekHelpYes,
          reportAbuseInputIDs.seekHelpNo,
        ],
      }); //false-positive (https://github.com/alphagov/govuk-frontend/issues/979, https://github.com/w3c/aria/issues/1404)
    }
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
