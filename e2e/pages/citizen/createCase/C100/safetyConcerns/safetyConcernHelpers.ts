import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { SafetyConcernsCommonContent } from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/safetyConcernsCommonContent";

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

export class SafetyConcernHelpers {
  public static async checkStaticText(page: Page): Promise<void> {
    // There should also be a checkVisibleAndPresent for the child's name, but this is dynamic and not added yet
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${SafetyConcernsCommonContent.caption}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${SafetyConcernsCommonContent.injunctionLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${SafetyConcernsCommonContent.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${SafetyConcernsCommonContent.strong}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        SafetyConcernsCommonContent,
        "body",
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        SafetyConcernsCommonContent,
        "legend",
        `${Selectors.GovukFieldsetLegend}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        SafetyConcernsCommonContent,
        "formHint",
        `${Selectors.GovukFormHint}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        SafetyConcernsCommonContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
    ]);
  }

  public static async checkSidebar(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        6,
        SafetyConcernsCommonContent,
        "sidebarLink",
        `${Selectors.GovukLink}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        SafetyConcernsCommonContent,
        "sidebarHeadingM",
        `${Selectors.GovukHeadingM}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:text-is("${SafetyConcernsCommonContent.sidebarBodyM}")`,
        1,
      ),
    ]);
  }

  public static async checkContactDetailsText(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukSummaryText}:text-is("${SafetyConcernsCommonContent.detailsSummary}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        SafetyConcernsCommonContent,
        "detailsLink",
        `${Selectors.GovukLink}`,
      ),
      Helpers.checkGroup(
        page,
        5,
        SafetyConcernsCommonContent,
        "detailsBody",
        `${Selectors.GovukBody}`,
      ),
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
          SafetyConcernsCommonContent,
          "ongoingBehaviourLink",
          `${Selectors.GovukLink}`,
        ),
        Helpers.checkGroup(
          page,
          2,
          SafetyConcernsCommonContent,
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
        SafetyConcernsCommonContent,
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
          SafetyConcernsCommonContent,
          "nspccGuidanceBody",
          `${Selectors.GovukBody}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLink}:text-is("${SafetyConcernsCommonContent.nspccGuidanceLink}")`,
          1,
        ),
      ]);
    }
  }
}
