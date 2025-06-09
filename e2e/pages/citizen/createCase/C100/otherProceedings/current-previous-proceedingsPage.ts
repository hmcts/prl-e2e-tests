import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { CurrentPreviousProceedingsContent } from "../../../../../fixtures/citizen/createCase/C100/otherProceedings/current-previous-proceedingsContent.ts";

interface CurrentPreviousProceedingsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoOtherProceedings: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  yesNoOtherProceedings: boolean;
}

enum UniqueSelectors {
  op_childrenInvolvedCourtCaseYes = "#op_childrenInvolvedCourtCase",
  op_childrenInvolvedCourtCaseNo = "#op_childrenInvolvedCourtCase-2",
  op_courtOrderProtectionYes = "#op_courtOrderProtection",
  op_courtOrderProtectionNo = "#op_courtOrderProtection-2",
}

export class CurrentPreviousProceedingsPage {
  public static async currentPreviousProceedingsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoOtherProceedings: yesNoOtherProceedings,
  }: CurrentPreviousProceedingsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
      yesNoOtherProceedings: yesNoOtherProceedings,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${CurrentPreviousProceedingsContent.h11}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${CurrentPreviousProceedingsContent.GovukFieldsetLegend1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${CurrentPreviousProceedingsContent.GovukFieldsetLegend2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.yes}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.no}")`,
        2,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CurrentPreviousProceedingsContent.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${CurrentPreviousProceedingsContent.errorMessageChildrenInvolved}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${CurrentPreviousProceedingsContent.errorMessageChildrenInvolved}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${CurrentPreviousProceedingsContent.errorMessageCourtOrder}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${CurrentPreviousProceedingsContent.errorMessageCourtOrder}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoOtherProceedings: yesNoOtherProceedings,
  }: fillInFieldsOptions): Promise<void> {
    if (yesNoOtherProceedings) {
      await page.click(`${UniqueSelectors.op_childrenInvolvedCourtCaseYes}`);
      await page.click(`${UniqueSelectors.op_courtOrderProtectionYes}`);
    } else {
      await page.click(`${UniqueSelectors.op_childrenInvolvedCourtCaseNo}`);
      await page.click(`${UniqueSelectors.op_courtOrderProtectionNo}`);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
