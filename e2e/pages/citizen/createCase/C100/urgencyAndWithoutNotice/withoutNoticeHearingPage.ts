import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { WithoutNoticeHearingContent } from "../../../../../fixtures/citizen/createCase/C100/urgencyAndWithoutNotice/withoutNoticeHearingContent";
import { Helpers } from "../../../../../common/helpers";
import { uniqueSelectors } from "./urgentFirstHearingPage";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface WithoutNoticeHearingPageOptions {
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

enum ids {
  yes = "#hwn_hearingPart1",
  no = "#hwn_hearingPart1-2",
}

export class WithoutNoticeHearingPage {
  public static async withoutNoticeHearingPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    urgencyAndWithoutNoticeAllOptionsYes: urgencyAndWithoutNoticeAllOptionsYes,
  }: WithoutNoticeHearingPageOptions): Promise<void> {
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
      `${Selectors.GovukHeadingL}:text-is("${WithoutNoticeHearingContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${WithoutNoticeHearingContent.hint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.warning}:text-is("${WithoutNoticeHearingContent.warning}")`,
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
    await page.waitForSelector(
      `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${WithoutNoticeHearingContent.errorLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${WithoutNoticeHearingContent.errorLink}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    urgencyAndWithoutNoticeAllOptionsYes: urgencyAndWithoutNoticeAllOptionsYes,
  }: fillInFieldsOptions): Promise<void> {
    await page.click(urgencyAndWithoutNoticeAllOptionsYes ? ids.yes : ids.no);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
