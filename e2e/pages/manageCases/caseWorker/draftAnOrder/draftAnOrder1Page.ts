import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { DraftAnOrder1Content } from "../../../../fixtures/manageCases/caseWorker/draftAnOrder/draftAnOrder1Content";

enum UniqueSelectors {
  orderTypeRadio = "#draftOrderOptions-draftAnOrder",
}

export class DraftAnOrder1Page {
  public static async draftAnOrder1Page(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${DraftAnOrder1Content.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        1,
        DraftAnOrder1Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrder1Content.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrder1Content.continue}")`,
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
        `${Selectors.GovukErrorSummaryTitle}:text-is("${DraftAnOrder1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${DraftAnOrder1Content.errorMessageWhatDoYouWantToDo}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${DraftAnOrder1Content.errorMessageWhatDoYouWantToDo}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.check(UniqueSelectors.orderTypeRadio);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DraftAnOrder1Content.continue}")`,
    );
  }
}
