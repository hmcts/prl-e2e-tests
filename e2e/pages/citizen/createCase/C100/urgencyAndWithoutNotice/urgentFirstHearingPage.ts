import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { UrgentFirstHearingContent } from "../../../../../fixtures/citizen/createCase/C100/urgencyAndWithoutNotice/urgentFirstHearingContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";

interface UrgentFirstHearingPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
}

export enum uniqueSelectors {
  warning = ".govuk-warning-text__text",
  legend = ".govuk-fieldset__legend",
}

enum radioIds {
  yes = "#hu_urgentHearingReasons",
  no = "#hu_urgentHearingReasons-2",
}

export class UrgentFirstHearingPage {
  public static async urgentFirstHearingPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    urgencyAndWithoutNoticeAllOptionsYes: urgencyAndWithoutNoticeAllOptionsYes,
  }: UrgentFirstHearingPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
      urgencyAndWithoutNoticeAllOptionsYes:
        urgencyAndWithoutNoticeAllOptionsYes,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${UrgentFirstHearingContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        UrgentFirstHearingContent,
        "p",
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.warning}:text-is("${UrgentFirstHearingContent.warning}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.legend}:text-is("${UrgentFirstHearingContent.question}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${UrgentFirstHearingContent.errorLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${UrgentFirstHearingContent.errorLink}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    urgencyAndWithoutNoticeAllOptionsYes: urgencyAndWithoutNoticeAllOptionsYes,
  }: fillInFieldsOptions): Promise<void> {
    await page.click(
      urgencyAndWithoutNoticeAllOptionsYes ? radioIds.yes : radioIds.no,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
