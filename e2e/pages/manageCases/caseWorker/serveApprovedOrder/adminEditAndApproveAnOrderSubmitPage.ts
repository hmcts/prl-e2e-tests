import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../common/selectors";
import { AdminEditAndApproveAnOrderSubmitContent } from "../../../../fixtures/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrderSubmitContent";
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
        `${Selectors.h2}:text-is("${AdminEditAndApproveAnOrderSubmitContent.h22}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        12,
        AdminEditAndApproveAnOrderSubmitContent,
        `text16`,
        Selectors.GovukText16,
      ),
      page  .locator(Selectors.GovukText16, { hasText: AdminEditAndApproveAnOrderSubmitContent.nonMolestationOrderFL404A })  .isVisible(),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${AdminEditAndApproveAnOrderSubmitContent.pdflink1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${AdminEditAndApproveAnOrderSubmitContent.pdflink2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AdminEditAndApproveAnOrderSubmitContent.Yes}"):visible`,
        3,
      ),
      page  .locator(Selectors.p, { hasText: AdminEditAndApproveAnOrderSubmitContent.nonMolestationOrderFL404A })  .isVisible(),

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
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async submit(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
