import { Page } from "@playwright/test";
// import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors.ts";
import { AdminEditAndApproveAnOrder1Content } from "../../../../../fixtures/manageCases/caseProgression/manageOrders/completeTheOrder/adminEditAndApproveAnOrder1Content.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { createOrderFL401Options } from "../../../../../common/types.ts";

export class AdminEditAndApproveAnOrder1Page {
  public static async adminEditAndApproveAnOrder1Page(
    page: Page,
    accessibilityTest: boolean,
    createOrderFL401Options: createOrderFL401Options,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, createOrderFL401Options);
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
      // await AccessibilityTestHelper.run(page); //#TODO commented out until ticket resolved EXUI-2723
    }
  }

  private static async fillInFields(
    page: Page,
    createOrderFL401Options: createOrderFL401Options,
  ): Promise<void> {
    switch (createOrderFL401Options) {
      case "power of arrest":
        const optionSelectPower = await page
          .locator("option", { hasText: "Power of arrest (FL406)" })
          .textContent();
        if (optionSelectPower) {
          await page
            .locator("#draftOrdersDynamicList")
            .selectOption({ label: optionSelectPower });
        }
        break;
      case "amend discharge varied order":
        const optionSelectAmend = await page
          .locator("option", {
            hasText: "Amended, discharged or varied order (FL404B)",
          })
          .textContent();
        if (optionSelectAmend) {
          await page
            .locator("#draftOrdersDynamicList")
            .selectOption({ label: optionSelectAmend });
        }
        break;
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
