import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper";
import { Selectors } from "../../../common/selectors";
import { CommonStaticText } from "../../../common/commonStaticText";
import { Helpers } from "../../../common/helpers";
import { IssueAndSendToLocalCourtCallback1Content } from "../../../fixtures/manageCases/caseWorker/issueAndSendToLocalCourtCallback1Content";

export class IssueAndSendToLocalCourtCallback1Page {
  public static async issueAndSendToLocalCourtCallback1Page(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(`${Selectors.GovukHeadingL}`, {
        hasText: `${IssueAndSendToLocalCourtCallback1Content.heading}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${IssueAndSendToLocalCourtCallback1Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${IssueAndSendToLocalCourtCallback1Content.formLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.selectOption(
      "#courtList",
      `${IssueAndSendToLocalCourtCallback1Content.selectedCourt}`,
    );
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
