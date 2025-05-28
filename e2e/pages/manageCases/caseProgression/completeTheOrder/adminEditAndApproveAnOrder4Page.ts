import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../common/selectors";
import { AdminEditAndApproveAnOrder4Content } from "../../../../fixtures/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder4Content";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { createOrderFL401Options } from "../../../../common/types";

enum UniqueSelectors {
  editOrderNo = "#doYouWantToEditTheOrder_No",
}
export class AdminEditAndApproveAnOrder4Page {
  public static async adminEditAndApproveAnOrder4Page(
    page: Page,
    accessibilityTest: boolean,
    createOrderFL404Options: createOrderFL401Options,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest, createOrderFL404Options);
    await this.fillInFields(page);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    createOrderFL404Options: createOrderFL401Options,
  ): Promise<void> {
    await page
      .locator(`${Selectors.GovukHeadingL}`, {
        hasText: `${AdminEditAndApproveAnOrder4Content.govUkHeadingL}`,
      })
      .waitFor();
    switch (createOrderFL404Options) {
      case "power of arrest":
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.headingH3}:text-is("${AdminEditAndApproveAnOrder4Content.headingH31}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.a}:text-is("${AdminEditAndApproveAnOrder4Content.powerOfArrest}")`,
            1,
          ),
        ]);
        break;
      case "amend discharge varied order":
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.headingH3}:text-is("${AdminEditAndApproveAnOrder4Content.headingH32}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.a}:text-is("${AdminEditAndApproveAnOrder4Content.amendedDischarged}")`,
            1,
          ),
        ]);
        break;
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AdminEditAndApproveAnOrder4Content.formLabel1}")`,
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
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.check(`${UniqueSelectors.editOrderNo}`);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
