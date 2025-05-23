import { Page } from "@playwright/test";
// import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../common/selectors";
import { AdminEditAndApproveAnOrder1Content } from "../../../../fixtures/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder1Content";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";

export class AdminEditAndApproveAnOrder1Page {
  public static async adminEditAndApproveAnOrder1Page(
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
        hasText: `${AdminEditAndApproveAnOrder1Content.govUkHeadingL}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AdminEditAndApproveAnOrder1Content.formLabel1}")`,
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
      // await new AxeUtils(page).audit();
    }
    // #TODO commented out until ticket resolved FPET-1224
  }

  private static async fillInFields(page: Page): Promise<void> {
    const optionSelect = await page
      .locator("option", { hasText: "Non-molestation order (FL404A)" })
      .textContent();
    if (optionSelect) {
      await page
        .locator("#draftOrdersDynamicList")
        .selectOption({ label: optionSelect });
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
