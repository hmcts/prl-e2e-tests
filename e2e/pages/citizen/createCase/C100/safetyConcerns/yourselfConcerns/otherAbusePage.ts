import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { reportAbuseInputIDs } from "../../../../../../common/commonUniqueSelectors.ts";
import { Selectors } from "../../../../../../common/selectors.ts";
import { OtherAbuseContent } from "../../../../../../fixtures/citizen/createCase/C100/safetyConcerns/yourselfConcerns/otherAbuseContent.ts";
import { SafetyConcernHelpers } from "../safetyConcernHelpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

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
    c100OtherAbuseYesNoToAll,
  }: FillInFieldsOptions): Promise<void> {
    const textToFill: [string, string] = [
      "behaviourDetails",
      "behaviourStartDate",
    ];
    for (const key of textToFill) {
      const inputKey = key as keyof typeof reportAbuseInputIDs;
      const contentKey = key as keyof typeof OtherAbuseContent;
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
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
