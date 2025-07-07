import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { MiamPolicyUpgrade7Content } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade7Content.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface MiamPolicyUpgrade7PageOptions {
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
  input1 = "#mpuOtherExemptionReasons-miamPolicyUpgradeOtherGrounds_Value_1",
  input2 = "#mpuOtherExemptionReasons-miamPolicyUpgradeOtherGrounds_Value_2",
  input3 = "#mpuOtherExemptionReasons-miamPolicyUpgradeOtherGrounds_Value_3",
  input4 = "#mpuOtherExemptionReasons-miamPolicyUpgradeOtherGrounds_Value_4",
  input5 = "#mpuOtherExemptionReasons-miamPolicyUpgradeOtherGrounds_Value_5",
  input6 = "#mpuOtherExemptionReasons-miamPolicyUpgradeOtherGrounds_Value_6",
  unableToAttendInput = "#mpuApplicantUnableToAttendMiamReason1",
}

export class MiamPolicyUpgrade7Page {
  public static async miamPolicyUpgrade7Page({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
  }: MiamPolicyUpgrade7PageOptions): Promise<void> {
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
      `${Selectors.h2}:text-is("${MiamPolicyUpgrade7Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${MiamPolicyUpgrade7Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${MiamPolicyUpgrade7Content.p}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        7,
        MiamPolicyUpgrade7Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${MiamPolicyUpgrade7Content.formHint}")`,
        1,
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
      await page.click(`${UniqueSelectors.input1}`);
    } else {
      await page.click(`${UniqueSelectors.input3}`);
      await page.fill(
        `${UniqueSelectors.unableToAttendInput}`,
        MiamPolicyUpgrade7Content.loremIpsum,
      );
    }
    await page.click(
      `${Selectors.button}:text-is("${MiamPolicyUpgrade7Content.continue}")`,
    );
  }
}
