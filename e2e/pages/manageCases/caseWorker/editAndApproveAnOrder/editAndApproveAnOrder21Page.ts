import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { EditAndApproveAnOrder21Content } from "../../../../fixtures/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrder21Content.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers.ts";
import { orderTypesMap } from "../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder.ts";
import { OrderType } from "../../../../common/types.ts";

enum UniqueSelectors {
  judgeDirectionsToAdminTextbox = "#judgeDirectionsToAdmin",
}

export class EditAndApproveAnOrder21Page {
  public static async editAndApproveAnOrder21Page(
    page: Page,
    orderType: OrderType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, orderType, accessibilityTest);
    await this.fillInFields(page);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    orderType: OrderType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(`${Selectors.GovukFormLabel}`, {
        hasText: `${EditAndApproveAnOrder21Content.formLabel}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${orderTypesMap.get(orderType)}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${EditAndApproveAnOrder21Content.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${EditAndApproveAnOrder21Content.formHint}")`,
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
    await page.fill(
      `${UniqueSelectors.judgeDirectionsToAdminTextbox}`,
      `${EditAndApproveAnOrder21Content.directionsText}`,
    );
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
