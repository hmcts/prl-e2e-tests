import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../../../common/selectors.ts";
import { PassportOfficeNotifiedContent } from "../../../../../../fixtures/citizen/createCase/C100/safetyConcerns/childConcerns/passportOfficeNotifiedContent.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { SafetyConcernHelpers } from "../safetyConcernHelpers.ts";

enum radioIDs {
  radioYes = "#c1A_abductionPassportOfficeNotified",
  radioNo = "#c1A_abductionPassportOfficeNotifiedNotified-2",
}

interface PassportOfficeNotifiedPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100PassportOfficeNotified: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100PassportOfficeNotified: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class PassportOfficeNotifiedPage {
  public static async passportOfficeNotifiedPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100PassportOfficeNotified,
  }: PassportOfficeNotifiedPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page: page,
      c100PassportOfficeNotified: c100PassportOfficeNotified,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${PassportOfficeNotifiedContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${PassportOfficeNotifiedContent.caption}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.yes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.no}")`,
        1,
      ),
    ]);
    await SafetyConcernHelpers.checkPassportSidebar(page);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${PassportOfficeNotifiedContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${PassportOfficeNotifiedContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100PassportOfficeNotified,
  }: FillInFieldsOptions): Promise<void> {
    if (c100PassportOfficeNotified) {
      await page.click(radioIDs.radioYes);
    } else {
      await page.click(radioIDs.radioNo);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
