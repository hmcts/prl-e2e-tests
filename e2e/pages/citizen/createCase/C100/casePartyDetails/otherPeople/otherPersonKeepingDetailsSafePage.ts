import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors";
import { OtherPersonKeepingDetailsSafeContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonKeepingDetailsSafeContent";
import { Helpers } from "../../../../../../common/helpers";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper";

interface otherPersonKeepingDetailsSafeOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class OtherPersonKeepingDetailsSafePage {
  public static async otherPersonKeepingDetailsSafePage({
    page: page,
    accessibilityTest: accessibilityTest,
  }: otherPersonKeepingDetailsSafeOptions): Promise<void> {
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
  }: Partial<otherPersonKeepingDetailsSafeOptions>): Promise<void> {
    if (!page) {
      throw new Error("Missing the page object.");
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:has-text("${OtherPersonKeepingDetailsSafeContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroupHasText(
        page,
        3,
        OtherPersonKeepingDetailsSafeContent,
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
  }: Partial<otherPersonKeepingDetailsSafeOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page object not initialised.");
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
