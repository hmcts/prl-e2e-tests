import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { WithoutNoticeOrderDetails1Content } from "../../../../../fixtures/manageCases/createCase/FL401/withoutNoticeOrder/withoutNoticeOrderDetails1Content.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

enum WithoutNoticeOrderRadioIDs {
  radioYes = "#orderWithoutGivingNoticeToRespondent_orderWithoutGivingNotice_Yes",
  radioNo = "#orderWithoutGivingNoticeToRespondent_orderWithoutGivingNotice_No",
}

export class WithoutNoticeOrder1Page {
  public static async withoutOrderNotice1Page(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    isWithoutNoticeDetailsYes: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page, isWithoutNoticeDetailsYes);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${WithoutNoticeOrderDetails1Content.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${WithoutNoticeOrderDetails1Content.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${WithoutNoticeOrderDetails1Content.formLabel}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        WithoutNoticeOrderDetails1Content,
        "formControl",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${WithoutNoticeOrderDetails1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${WithoutNoticeOrderDetails1Content.errorSummary}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${WithoutNoticeOrderDetails1Content.validationError}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${WithoutNoticeOrderDetails1Content.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    isWithoutNotice: boolean,
  ): Promise<void> {
    if (isWithoutNotice) {
      await page.click(WithoutNoticeOrderRadioIDs.radioYes);
    } else {
      await page.click(WithoutNoticeOrderRadioIDs.radioNo);
    }
    await page.click(
      `${Selectors.button}:text-is("${WithoutNoticeOrderDetails1Content.continue}")`,
    );
  }
}
