import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { WithoutNoticeHearingDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/urgencyAndWithoutNotice/withoutNoticeHearingDetailsContent";
import { Helpers } from "../../../../../common/helpers";
import { uniqueSelectors } from "./urgentFirstHearingPage";
import { CommonStaticText } from "../../../../../common/commonStaticText";

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
  yes1 = "hwn_doYouNeedAWithoutNoticeHearing",
  yes2 = "hwn_doYouRequireAHearingWithReducedNotice",
}

enum inputIds {
  input1 = "hwn_reasonsForApplicationWithoutNotice",
  input2 = "hwn_doYouNeedAWithoutNoticeHearingDetails",
  input3 = "hwn_doYouRequireAHearingWithReducedNoticeDetails",
}

// Untested, don't know if this works yet
const combinedSelectors = [
  ...Object.values(radioIds).map((selector) => ({ selector, action: "click" })),
  ...Object.values(inputIds).map((selector) => ({ selector, action: "fill" })),
];

export class WithoutNoticeHearingDetailsPage {
  public static async withoutNoticeHearingDetailsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    urgencyAndWithoutNoticeAllOptionsYes: urgencyAndWithoutNoticeAllOptionsYes,
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
        `${Selectors.GovukHeadingM}:text-is("${WithoutNoticeHearingDetailsContent.heading}")`,
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
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
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
        `${Selectors.ErrorMessage}`,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
  }: fillInFieldsOptions): Promise<void> {
    // Untested, don't know if this works yet
    // The alternative is to just use two separate loops
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
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
