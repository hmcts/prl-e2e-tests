import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { MiamPolicyUpgrade2Content } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade2Content.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface MiamPolicyUpgrade1PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillinFieldsOptions {
  page: Page;
}

enum UniqueSelectors {
  domesticAbuse = "#mpuExemptionReasons-mpuDomesticAbuse",
  childProtectionConcerns = "#mpuExemptionReasons-mpuChildProtectionConcern",
  urgency = "#mpuExemptionReasons-mpuUrgency",
  previousAttendenceMian = "#mpuExemptionReasons-mpuPreviousMiamAttendance",
  other = "#mpuExemptionReasons-mpuOther",
}

export class MiamPolicyUpgrade2Page {
  public static async miamPolicyUpgrade2Page({
    page: page,
    accessibilityTest: accessibilityTest,
  }: MiamPolicyUpgrade1PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({
      page: page,
    });
  }

  public static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${MiamPolicyUpgrade2Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${MiamPolicyUpgrade2Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${MiamPolicyUpgrade2Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${MiamPolicyUpgrade2Content.formLabelQuestion}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${MiamPolicyUpgrade2Content.formHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        MiamPolicyUpgrade2Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  public static async fillInFields({
    page: page,
  }: fillinFieldsOptions): Promise<void> {
    await page.click(`${UniqueSelectors.domesticAbuse}`);
    await page.click(`${UniqueSelectors.childProtectionConcerns}`);
    await page.click(`${UniqueSelectors.urgency}`);
    await page.click(`${UniqueSelectors.previousAttendenceMian}`);
    await page.click(`${UniqueSelectors.other}`);
    await page.click(
      `${Selectors.button}:text-is("${MiamPolicyUpgrade2Content.continue}")`,
    );
  }
}
