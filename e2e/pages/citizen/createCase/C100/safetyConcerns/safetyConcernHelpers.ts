import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { ChildSafetyConcernsCommonContent } from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/childConcerns/childSafetyConcernsCommonContent";
import { PassportSidebarContent } from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/childConcerns/passportSidebarContent";
import {
  YourselfSafetyConcernsCommonContent
} from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/childConcerns/yourselfSafetyConcernsCommonContent";

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
  public static async checkStaticTextYourself(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${YourselfSafetyConcernsCommonContent.caption}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${YourselfSafetyConcernsCommonContent.injunctionLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${YourselfSafetyConcernsCommonContent.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${YourselfSafetyConcernsCommonContent.strong}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        YourselfSafetyConcernsCommonContent,
        "body",
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        YourselfSafetyConcernsCommonContent,
        "legend",
        `${Selectors.GovukFieldsetLegend}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        YourselfSafetyConcernsCommonContent,
        "formHint",
        `${Selectors.GovukFormHint}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        YourselfSafetyConcernsCommonContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
    ]);
  }

  public static async checkStaticTextChild(page: Page): Promise<void> {
    // There should also be a checkVisibleAndPresent for the child's name, but this is dynamic and not added yet
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${ChildSafetyConcernsCommonContent.caption}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${ChildSafetyConcernsCommonContent.injunctionLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ChildSafetyConcernsCommonContent.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ChildSafetyConcernsCommonContent.strong}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        ChildSafetyConcernsCommonContent,
        "body",
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        ChildSafetyConcernsCommonContent,
        "legend",
        `${Selectors.GovukFieldsetLegend}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        ChildSafetyConcernsCommonContent,
        "formHint",
        `${Selectors.GovukFormHint}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildSafetyConcernsCommonContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
    ]);
  }

  public static async checkSidebarYourself(
    page: Page
  ): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        7,
        YourselfSafetyConcernsCommonContent,
        "sidebarLink",
        `${Selectors.GovukLink}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        YourselfSafetyConcernsCommonContent,
        "sidebarHeadingM",
        `${Selectors.GovukHeadingM}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:text-is("${YourselfSafetyConcernsCommonContent.sidebarBodyM}")`,
        1,
      ),
    ]);
  }

  public static async checkSidebarChild(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        6,
        ChildSafetyConcernsCommonContent,
        "sidebarLink",
        `${Selectors.GovukLink}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildSafetyConcernsCommonContent,
        "sidebarHeadingM",
        `${Selectors.GovukHeadingM}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:text-is("${ChildSafetyConcernsCommonContent.sidebarBodyM}")`,
        1,
      ),
    ]);
  }

  public static async checkContactDetailsText(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukSummaryText}:text-is("${ChildSafetyConcernsCommonContent.detailsSummary}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ChildSafetyConcernsCommonContent,
        "detailsLink",
        `${Selectors.GovukLink}`,
      ),
      Helpers.checkGroup(
        page,
        5,
        ChildSafetyConcernsCommonContent,
        "detailsBody",
        `${Selectors.GovukBody}`,
      ),
    ]);
  }

  public static async ongoingBehaviourFieldsYourself({
                                                    page,
                                                    c100ReportAbuseYesNoToAll,
                                                    inputIDs,
                                                  }: OngoingBehaviourOptions): Promise<void> {
    if (c100ReportAbuseYesNoToAll) {
      if (
        !('ongoingBehaviorYes' in Object.keys(inputIDs))
      ) {
        throw new Error(
          `Could not find ongoingBehaviorYes in inputIDs`
        )
      }
      await page.click(inputIDs.ongoingBehaviorYes);
      await Promise.all([
        Helpers.checkGroup(
          page,
          2,
          YourselfSafetyConcernsCommonContent,
          "ongoingBehaviourLink",
          `${Selectors.GovukLink}`,
        ),
        Helpers.checkGroup(
          page,
          3,
          YourselfSafetyConcernsCommonContent,
          "ongoingBehaviourBody",
          `${Selectors.GovukBody}`,
        ),
      ]);
    } else {
      if (
        !('ongoingBehaviorNo' in Object.keys(inputIDs))
      ) {
        throw new Error(
          `Could not find ongoingBehaviorNo in inputIDs`
        )
      }
      await page.click(inputIDs.ongoingBehaviorNo);
    }
  }

  public static async ongoingBehaviourFieldsChild({
    page,
    c100ReportAbuseYesNoToAll,
    inputIDs,
  }: OngoingBehaviourOptions): Promise<void> {
    if (c100ReportAbuseYesNoToAll) {
      if (
        !('ongoingBehaviorYes' in Object.keys(inputIDs))
      ) {
        throw new Error(
          `Could not find ongoingBehaviorYes in inputIDs`
        )
      }
      await page.click(inputIDs.ongoingBehaviorYes);
      await Promise.all([
        Helpers.checkGroup(
          page,
          2,
          ChildSafetyConcernsCommonContent,
          "ongoingBehaviourLink",
          `${Selectors.GovukLink}`,
        ),
        Helpers.checkGroup(
          page,
          2,
          ChildSafetyConcernsCommonContent,
          "ongoingBehaviourBody",
          `${Selectors.GovukBody}`,
        ),
      ]);
    } else {
      if (
        !('ongoingBehaviorNo' in Object.keys(inputIDs))
      ) {
        throw new Error(
          `Could not find ongoingBehaviorNo in inputIDs`
        )
      }
      await page.click(inputIDs.ongoingBehaviorNo);
    }
  }

  public static async seekHelpFieldsYourself({
                                            page,
                                            c100ReportAbuseYesNoToAll,
                                            inputIDs,
                                            abuseContent,
                                          }: SeekHelpOptions): Promise<void> {
    if (c100ReportAbuseYesNoToAll) {
      if (
        !('seekHelpYes' in Object.keys(inputIDs)) ||
        !('seekHelpDetails' in Object.keys(inputIDs))
      ) {
        throw new Error(
          `Could not find seekHelpYes or seekHelpDetails in inputIDs`
        )
      }
      await page.click(inputIDs.seekHelpYes);
      await Helpers.checkGroup(
        page,
        2,
        YourselfSafetyConcernsCommonContent,
        "seekHelpBody",
        `${Selectors.GovukBody}`,
      );
      await page.fill(inputIDs.seekHelpDetails, abuseContent.seekHelpDetails);
    } else {
      if (!('seekHelpNo' in Object.keys(inputIDs))) {
        throw new Error(
          `Could not find seekHelpNo inputIDs`
        )
      }
      await page.click(inputIDs.seekHelpNo);
      await Promise.all([
        Helpers.checkGroup(
          page,
          2,
          YourselfSafetyConcernsCommonContent,
          "govukGuidanceBody",
          `${Selectors.GovukBody}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLink}:text-is("${YourselfSafetyConcernsCommonContent.govukGuidanceLink}")`,
          1,
        ),
      ]);
    }
  }

  public static async seekHelpFieldsChild({
    page,
    c100ReportAbuseYesNoToAll,
    inputIDs,
    abuseContent,
  }: SeekHelpOptions): Promise<void> {
    if (c100ReportAbuseYesNoToAll) {
      if (
        !('seekHelpYes' in Object.keys(inputIDs)) ||
        !('seekHelpDetails' in Object.keys(inputIDs))
      ) {
        throw new Error(
          `Could not find seekHelpYes or seekHelpDetails in inputIDs`
        )
      }
      await page.click(inputIDs.seekHelpYes);
      await Helpers.checkGroup(
        page,
        2,
        ChildSafetyConcernsCommonContent,
        "seekHelpBody",
        `${Selectors.GovukBody}`,
      );
      await page.fill(inputIDs.seekHelpDetails, abuseContent.seekHelpDetails);
    } else {
      if (!('seekHelpNo' in Object.keys(inputIDs))) {
        throw new Error(
          `Could not find seekHelpNo inputIDs`
        )
      }
      await page.click(inputIDs.seekHelpNo);
      await Promise.all([
        Helpers.checkGroup(
          page,
          2,
          ChildSafetyConcernsCommonContent,
          "nspccGuidanceBody",
          `${Selectors.GovukBody}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLink}:text-is("${ChildSafetyConcernsCommonContent.nspccGuidanceLink}")`,
          1,
        ),
      ]);
    }
  }

  public static async checkPassportSidebar(page: Page): Promise<void> {
    await Helpers.checkGroup(
      page,
      3,
      PassportSidebarContent,
      "sidebarLink",
      `${Selectors.GovukLink}`,
    );
  }
}
