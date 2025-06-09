import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { DraftAnOrder3Content } from "../../../../fixtures/manageCases/caseWorker/draftAnOrder/draftAnOrder3Content.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { OrderType } from "../../../../common/types.ts";

// this page is specific for C100 "Blank Order or directions (C21)" type
export class DraftAnOrder3Page {
  public static async draftAnOrder3Page(
    page: Page,
    orderType: OrderType,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page, orderType);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukFormLabel}:text-is("${DraftAnOrder3Content.formLabel1}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${DraftAnOrder3Content.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        DraftAnOrder3Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrder3Content.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrder3Content.continue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await this.continue(page);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${DraftAnOrder3Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${DraftAnOrder3Content.errorMessageWTypeOfOrderIsRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${DraftAnOrder3Content.errorMessageWTypeOfOrderIsRequired}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    orderType: OrderType,
  ): Promise<void> {
    await page.check(`#c21OrderOptions-${orderType}`);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DraftAnOrder3Content.continue}")`,
    );
  }
}
