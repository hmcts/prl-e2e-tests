import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { WithoutNoticeHearingDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/urgencyAndWithoutNotice/withoutNoticeHearingDetailsContent.ts";
import { uniqueSelectors } from "./urgentFirstHearingPage.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface WithoutNoticeHearingDetailsPageOptions {
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
}

enum radioIds {
  yes1 = "#hwn_doYouNeedAWithoutNoticeHearing",
  yes2 = "#hwn_doYouRequireAHearingWithReducedNotice",
}

enum inputIds {
  input1 = "#hwn_reasonsForApplicationWithoutNotice",
  input2 = "#hwn_doYouNeedAWithoutNoticeHearingDetails",
  input3 = "#hwn_doYouRequireAHearingWithReducedNoticeDetails",
}

const combinedSelectors = [
  ...Object.values(radioIds).map((selector) => ({ selector, action: "click" })),
  ...Object.values(inputIds).map((selector) => ({ selector, action: "fill" })),
];

export class WithoutNoticeHearingDetailsPage {
  public static async withoutNoticeHearingDetailsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: WithoutNoticeHearingDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${WithoutNoticeHearingDetailsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${WithoutNoticeHearingDetailsContent.heading}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        WithoutNoticeHearingDetailsContent,
        "hint",
        `${Selectors.GovukHint}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        WithoutNoticeHearingDetailsContent,
        "question",
        `${uniqueSelectors.legend}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit({
        exclude: [radioIds.yes1, radioIds.yes2],
      }); //false-positive (https://github.com/alphagov/govuk-frontend/issues/979, https://github.com/w3c/aria/issues/1404)
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
      Helpers.checkGroup(
        page,
        3,
        WithoutNoticeHearingDetailsContent,
        "errorLink",
        `${Selectors.a}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        WithoutNoticeHearingDetailsContent,
        "errorLink",
        `${Selectors.GovukErrorMessageCitizen}`,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
  }: fillInFieldsOptions): Promise<void> {
    for (const { selector, action } of combinedSelectors) {
      if (action === "click") {
        await page.click(selector);
      } else if (action === "fill") {
        await page.fill(
          `${selector}`,
          WithoutNoticeHearingDetailsContent.exampleText,
        );
      }
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
