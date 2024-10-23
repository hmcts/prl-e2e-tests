import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { ReportAbuseCommonContent } from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/reportAbuseCommonContent";

interface SeekHelpOptions {
  page: Page;
  c100ReportAbuseYesNoToAll: boolean;
  inputIDs: Record<string, string>;
  abuseContent: Record<string, string>;
}

interface OngoingBehaviourOptions {
  page: Page;
  c100ReportAbuseYesNoToAll: boolean;
  inputIDs: Record<string, string>;
}

export class ReportAbuseHelpers {
  public static async checkStaticText(page: Page): Promise<void> {
    // There should also be a checkVisibleAndPresent for the child's name, but this is dynamic and not added yet
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${ReportAbuseCommonContent.caption}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${ReportAbuseCommonContent.injunctionLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ReportAbuseCommonContent.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ReportAbuseCommonContent.strong}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        ReportAbuseCommonContent,
        "body",
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        ReportAbuseCommonContent,
        "legend",
        `${Selectors.GovukFieldsetLegend}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        ReportAbuseCommonContent,
        "formHint",
        `${Selectors.GovukFormHint}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        ReportAbuseCommonContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
    ]);
    await this.checkSidebar(page);
  }

  private static async checkSidebar(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        6,
        ReportAbuseCommonContent,
        'sidebarLink',
        `${Selectors.GovukLink}`
      ),
      Helpers.checkGroup(
        page,
        2,
        ReportAbuseCommonContent,
        'sidebarHeadingM',
        `${Selectors.GovukHeadingM}`
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:text-is("${ReportAbuseCommonContent.sidebarBodyM}")`,
        1
      )
    ]);
    await page.click(
      `${Selectors.GovukSummaryText}:text-is("${ReportAbuseCommonContent.detailsSummary}")`
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ReportAbuseCommonContent,
        'detailsLink',
        `${Selectors.GovukLink}`
      ),
      Helpers.checkGroup(
        page,
        5,
        ReportAbuseCommonContent,
        'detailsBody',
        `${Selectors.GovukBody}`
      )
    ]);
  }

  public static async ongoingBehaviourFields({
    page,
    c100ReportAbuseYesNoToAll,
    inputIDs,
  }: OngoingBehaviourOptions): Promise<void> {
    if (c100ReportAbuseYesNoToAll) {
      await page.click(inputIDs.ongoingBehaviorYes);
      await Promise.all([
        Helpers.checkGroup(
          page,
          2,
          ReportAbuseCommonContent,
          "ongoingBehaviourLink",
          `${Selectors.GovukLink}`,
        ),
        Helpers.checkGroup(
          page,
          2,
          ReportAbuseCommonContent,
          "ongoingBehaviourBody",
          `${Selectors.GovukBody}`,
        ),
      ]);
    } else {
      await page.click(inputIDs.ongoingBehaviorNo);
    }
  }

  public static async seekHelpFields({
    page,
    c100ReportAbuseYesNoToAll,
    inputIDs,
    abuseContent,
  }: SeekHelpOptions): Promise<void> {
    if (c100ReportAbuseYesNoToAll) {
      await page.click(inputIDs.seekHelpYes);
      await Helpers.checkGroup(
        page,
        2,
        ReportAbuseCommonContent,
        "seekHelpBody",
        `${Selectors.GovukBody}`,
      );
      await page.fill(inputIDs.seekHelpDetails, abuseContent.seekHelpDetails);
    } else {
      await page.click(inputIDs.seekHelpYes);
      await Promise.all([
        Helpers.checkGroup(
          page,
          2,
          ReportAbuseCommonContent,
          "nspccGuidanceBody",
          `${Selectors.GovukBody}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLink}:text-is("${ReportAbuseCommonContent.nspccGuidanceLink}")`,
          1,
        ),
      ]);
    }
  }
}