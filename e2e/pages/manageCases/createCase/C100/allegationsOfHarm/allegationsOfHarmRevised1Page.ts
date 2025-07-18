import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { AllegationsOfHarmRevised1Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised1Content.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface AllegationsOfHarmRevised1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100YesNoAllegationsOfHarm: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  c100YesNoAllegationsOfHarm: boolean;
}

enum uniqueSelectors {
  allegationsOfHarmYes = "#newAllegationsOfHarmYesNo_Yes",
  allegationsOfHarmNo = "#newAllegationsOfHarmYesNo_No",
}

export class AllegationsOfHarmRevised1Page {
  public static async allegationsOfHarmRevised1Page({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    c100YesNoAllegationsOfHarm: c100YesNoAllegationsOfHarm,
  }: AllegationsOfHarmRevised1PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
      c100YesNoAllegationsOfHarm: c100YesNoAllegationsOfHarm,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${AllegationsOfHarmRevised1Content.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        AllegationsOfHarmRevised1Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${AllegationsOfHarmRevised1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${AllegationsOfHarmRevised1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised1Content.errorMessageAllegationsOfHarm}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised1Content.errorMessageAllegationsOfHarm}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    c100YesNoAllegationsOfHarm: c100YesNoAllegationsOfHarm,
  }: fillInFieldsOptions): Promise<void> {
    if (c100YesNoAllegationsOfHarm) {
      await page.click(`${uniqueSelectors.allegationsOfHarmYes}`);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AllegationsOfHarmRevised1Content.pYes}")`,
        1,
      );
    } else {
      await page.click(`${uniqueSelectors.allegationsOfHarmNo}`);
    }
    await page.click(
      `${Selectors.button}:text-is("${AllegationsOfHarmRevised1Content.continue}")`,
    );
  }
}
