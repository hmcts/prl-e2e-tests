import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { MiamPolicyUpgrade4Content } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade4Content";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";

interface MiamPolicyUpgrade4PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoMiamPolicyUpgrade: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  yesNoMiamPolicyUpgrade: boolean;
}

enum UniqueSelectors {
  subjectOfEnquiries = "#mpuChildProtectionConcernReason-mpuChildProtectionConcern_value_1",
  subjectOfChildProtection = "#mpuChildProtectionConcernReason-mpuChildProtectionConcern_value_2",
}

export class MiamPolicyUpgrade4Page {
  public static async miamPolicyUpgrade4Page({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
  }: MiamPolicyUpgrade4PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({
      page: page,
      yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
    });
  }
  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${MiamPolicyUpgrade4Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${MiamPolicyUpgrade4Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${MiamPolicyUpgrade4Content.p}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        MiamPolicyUpgrade4Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page: page,
    yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
  }: fillInFieldsOptions): Promise<void> {
    if (yesNoMiamPolicyUpgrade) {
      await page.click(`${UniqueSelectors.subjectOfEnquiries}`);
    } else {
      await page.click(`${UniqueSelectors.subjectOfChildProtection}`);
    }
    await page.click(
      `${Selectors.button}:text-is("${MiamPolicyUpgrade4Content.continue}")`,
    );
  }
}
