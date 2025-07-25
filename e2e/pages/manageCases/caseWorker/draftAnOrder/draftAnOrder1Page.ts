import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { DraftAnOrder1Content } from "../../../../fixtures/manageCases/caseWorker/draftAnOrder/draftAnOrder1Content.ts";

enum UniqueSelectors {
  orderTypeRadio = "#draftOrderOptions-draftAnOrder",
}

enum UniqueSelectorUpload {
  uploadRadioOption = "#draftOrderOptions-uploadAnOrder",
}

export class DraftAnOrder1Page {
  public static async draftAnOrder1Page(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    isUploadOrder: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    if (!isUploadOrder) {
      await this.fillInFields(page);
    } else {
      await this.fillInFieldsUpload(page);
    }
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

  private static async fillInFieldsUpload(page: Page): Promise<void> {
    await page.check(UniqueSelectorUpload.uploadRadioOption);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DraftAnOrder1Content.continue}")`,
    );
  }
}
