import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { UploadContent } from "../../../../fixtures/citizen/caseView/uploadDocuments/uploadContent.ts";
import { Helpers } from "../../../../common/helpers.ts";

export class UploadPage {
  public static async uploadPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukCaptionL, {
        hasText: UploadContent.GovukCaptionL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingXL}:text-is("${UploadContent.GovukHeadingXL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${UploadContent.GovukBody}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        UploadContent,
        `GovukHeadingAppTask`,
        `${Selectors.GovukHeadingAppTask}`,
      ),
      Helpers.checkGroup(
        page,
        15,
        UploadContent,
        `GovukLink`,
        `${Selectors.GovukLink}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
}
