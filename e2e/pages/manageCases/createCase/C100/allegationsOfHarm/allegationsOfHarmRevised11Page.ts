import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { AllegationsOfHarmRevised11Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised11Content";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";

interface AllegationsOfHarmRevised11PageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum uniqueSelectors {
  stepsField = "#newAllegationsOfHarmOtherConcernsCourtActions",
  yesUnsupervisedRadio = "#newAgreeChildUnsupervisedTime_Yes",
  yesSupervisedRadio = "#newAgreeChildSupervisedTime_Yes",
  yesOtherRadio = "#newAgreeChildOtherContact_Yes",
}

export class AllegationsOfHarmRevised11Page {
  public static async allegationsOfHarmRevised11Page({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: AllegationsOfHarmRevised11PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${AllegationsOfHarmRevised11Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AllegationsOfHarmRevised11Content.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        AllegationsOfHarmRevised11Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised11Content.formLabelYes}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised11Content.formLabelNo}")`,
        3,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${AllegationsOfHarmRevised11Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${AllegationsOfHarmRevised11Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised11Content.errorMessageStepsCourt}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised11Content.errorMessageStepsCourt}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised11Content.errorMessageUnsupervised}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised11Content.errorMessageUnsupervised}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised11Content.errorMessageSupervised}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised11Content.errorMessageSupervised}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised11Content.errorMessageFormsOfContact}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised11Content.errorMessageFormsOfContact}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.fill(
      `${uniqueSelectors.stepsField}`,
      `${AllegationsOfHarmRevised11Content.stepsForCourt}`,
    );
    await page.click(`${uniqueSelectors.yesUnsupervisedRadio}`);
    await page.click(`${uniqueSelectors.yesSupervisedRadio}`);
    await page.click(`${uniqueSelectors.yesOtherRadio}`);
    await page.click(
      `${Selectors.button}:text-is("${AllegationsOfHarmRevised11Content.continue}")`,
    );
  }
}
