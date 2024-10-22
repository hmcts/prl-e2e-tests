import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { ReportAbuseCommonContent } from "./reportAbuseCommonContent";

export class ReportAbuseHelpers {
  public static async checkStaticText(
    page: Page
  ): Promise<void> {
    // There should also be a checkVisibleAndPresent for the child's name, but this is dynamic and not added yet
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${ReportAbuseCommonContent.caption}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${ReportAbuseCommonContent.injunctionLink}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ReportAbuseCommonContent.span}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ReportAbuseCommonContent.strong}")`,
        1
      ),
      Helpers.checkGroup(
        page,
        4,
        ReportAbuseCommonContent,
        'body',
        `${Selectors.GovukBody}`
      ),
      Helpers.checkGroup(
        page,
        3,
        ReportAbuseCommonContent,
        'legend',
        `${Selectors.GovukFieldsetLegend}`
      ),
      Helpers.checkGroup(
        page,
        3,
        ReportAbuseCommonContent,
        'formHint',
        `${Selectors.GovukFormHint}`
      ),
      Helpers.checkGroup(
        page,
        2,
        ReportAbuseCommonContent,
        'formLabel',
        `${Selectors.GovukLabel}`
      ),
    ])
  }
}