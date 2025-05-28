import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { UploadYourApplicationContent } from "../../../../fixtures/citizen/caseView/requestMoreTime/uploadYourApplicationContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

enum UniqueSelectors {
  completedFormYes = "#awp_completedForm",
  completedFormNo = "#awp_completedForm-2",
}

export class UploadYourApplicationPage {
  public static async uploadYourApplicationPage(
    page: Page,
    accessibilityTest: boolean,
    completedForm: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, completedForm);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukCaptionL, {
        hasText: UploadYourApplicationContent.GovukCaptionL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${UploadYourApplicationContent.GovukHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:text-is("${UploadYourApplicationContent.GovukBodyM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${UploadYourApplicationContent.GovukFieldsetLegend}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    completedForm: boolean,
  ): Promise<void> {
    if (completedForm) {
      await page.check(`${UniqueSelectors.completedFormYes}`);
    } else {
      await page.check(`${UniqueSelectors.completedFormNo}`);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
