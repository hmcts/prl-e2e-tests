import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ApplicantKeepingDetailsSafeContent } from "../../../../../fixtures/citizen/createCase/C100/casePartyDetails/applicantKeepingDetailsSafeContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

interface applicantKeepingDetailsSafeOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class ApplicantKeepingDetailsSafePage {
  public static async applicantKeepingDetailsSafePage({
    page: page,
    accessibilityTest: accessibilityTest,
  }: applicantKeepingDetailsSafeOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<applicantKeepingDetailsSafeOptions>): Promise<void> {
    if (!page) {
      throw new Error("Missing the page object.");
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:has-text("${ApplicantKeepingDetailsSafeContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroupHasText(
        page,
        3,
        ApplicantKeepingDetailsSafeContent,
        "p",
        Selectors.p,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page: page,
  }: Partial<applicantKeepingDetailsSafeOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page object not initialised.");
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
