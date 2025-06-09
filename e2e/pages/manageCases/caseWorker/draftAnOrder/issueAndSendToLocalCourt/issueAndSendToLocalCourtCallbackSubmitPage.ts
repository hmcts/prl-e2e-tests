import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { IssueAndSendToLocalCourtCallbackSubmitContent } from "../../../../../fixtures/manageCases/caseWorker/draftAnOrder/issueAndSendToLocalCourt/issueAndSendToLocalCourtCallbackSubmitContent.ts";

export class IssueAndSendToLocalCourtCallbackSubmitPage {
  public static async issueAndSendToLocalCourtCallbackSubmitPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.submit(page);
    await this.checkSubmissionSuccessful(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(`${Selectors.headingH2}`, {
        hasText: `${IssueAndSendToLocalCourtCallbackSubmitContent.headingH2}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${IssueAndSendToLocalCourtCallbackSubmitContent.headingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${IssueAndSendToLocalCourtCallbackSubmitContent.p}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        IssueAndSendToLocalCourtCallbackSubmitContent,
        `text16`,
        Selectors.GovukText16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async submit(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }

  private static async checkSubmissionSuccessful(page: Page): Promise<void> {
    await page
      .locator(`.alert-message`, {
        hasText: `Issue and send to local court`,
      })
      .waitFor();
  }
}
