import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { AmendChildDetailsRevised2Content } from "../../../../../fixtures/manageCases/caseProgression/amendDetails/amendChildDetails/amendChildDetailsRevised2Content";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { yesNoDontKnow } from "../../../../../common/types";

interface AmendChildDetailsRevised2PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoDontKnow: yesNoDontKnow;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  yesNoDontKnow: yesNoDontKnow;
}

enum uniqueSelectors {
  childrenKnownToAuthorityRadio = "#childrenKnownToLocalAuthority-",
  childrenKnownToAuthorityField = "#childrenKnownToLocalAuthorityTextArea",
  childrenProtectionPlanRadio = "#childrenSubjectOfChildProtectionPlan-",
}

export class AmendChildDetailsRevised2Page {
  public static async amendChildDetailsRevised2Page({
    page,
    accessibilityTest,
    yesNoDontKnow,
  }: AmendChildDetailsRevised2PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({
      page,
      yesNoDontKnow,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.strong}:text-is("${AmendChildDetailsRevised2Content.strong}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AmendChildDetailsRevised2Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AmendChildDetailsRevised2Content.p}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        AmendChildDetailsRevised2Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AmendChildDetailsRevised2Content.formLabelYes}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AmendChildDetailsRevised2Content.formLabelNo}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AmendChildDetailsRevised2Content.formLabelDontKnow}")`,
        2,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
    yesNoDontKnow,
  }: fillInFieldsOptions): Promise<void> {
    await page.click(
      `${uniqueSelectors.childrenKnownToAuthorityRadio}${yesNoDontKnow}`,
    );
    if (yesNoDontKnow === "yes") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AmendChildDetailsRevised2Content.formLabelChildrenKnown}")`,
        1,
      );
      await page.fill(
        `${uniqueSelectors.childrenKnownToAuthorityField}`,
        `${AmendChildDetailsRevised2Content.childNameAndLocalAuthority}`,
      );
    }
    await page.click(
      `${uniqueSelectors.childrenProtectionPlanRadio}${yesNoDontKnow}`,
    );
    await page.click(
      `${Selectors.button}:text-is("${AmendChildDetailsRevised2Content.continue}")`,
    );
  }
}
