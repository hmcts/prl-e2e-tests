import { expect, Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../common/selectors";
import { AdminEditAndApproveAnOrderSubmitContent } from "../../../../fixtures/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrderSubmitContent";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";

export class AdminEditAndApproveAnOrderSubmitPage {
  public static async adminEditAndApproveAnOrderSubmitPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.submit(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(`${Selectors.headingH2}`, {
        hasText: `${AdminEditAndApproveAnOrderSubmitContent.headingH2}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AdminEditAndApproveAnOrderSubmitContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${AdminEditAndApproveAnOrderSubmitContent.h21}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${AdminEditAndApproveAnOrderSubmitContent.h22}"):visible`,
        1,
      ),
      Helpers.checkGroup(
        page,
        11,
        AdminEditAndApproveAnOrderSubmitContent,
        `text16`,
        Selectors.GovukText16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${AdminEditAndApproveAnOrderSubmitContent.powerOfArrest}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AdminEditAndApproveAnOrderSubmitContent.No}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AdminEditAndApproveAnOrderSubmitContent.Yes}"):visible`,
        2,
      ),
      // page
      //   .locator(Selectors.p, {
      //     hasText:
      //     AdminEditAndApproveAnOrderSubmitContent.powerOfArrestFL406,
      //   })
      //   .isVisible(),
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
    await expect(
      page.locator("ccd-read-dynamic-list-field span", {
        hasText: AdminEditAndApproveAnOrderSubmitContent.powerOfArrestFL406,
      }),
    ).toBeVisible();

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async submit(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
