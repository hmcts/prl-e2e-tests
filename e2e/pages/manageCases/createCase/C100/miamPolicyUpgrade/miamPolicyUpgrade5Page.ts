import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../../common/selectors";
import { MiamPolicyUpgrade5Content } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade5Content";
import { Helpers } from "../../../../../common/helpers";

interface MiamPolicyUpgrade5PageOptions {
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
  thereIsNoRiskToLife = "#mpuUrgencyReason-miamPolicyUpgradeUrgencyReason_Value_1",
  delayHarmToChild = "#mpuUrgencyReason-miamPolicyUpgradeUrgencyReason_Value_2",
  unlawfulRemovalOfChild = "#mpuUrgencyReason-miamPolicyUpgradeUrgencyReason_Value_3",
  riskOfMiscarriage = "#mpuUrgencyReason-miamPolicyUpgradeUrgencyReason_Value_4",
  financialHardship = "#mpuUrgencyReason-miamPolicyUpgradeUrgencyReason_Value_5",
  irretrievableProblemsWithDispute = "#mpuUrgencyReason-miamPolicyUpgradeUrgencyReason_Value_6",
  SignificantRiskInThePeriod = "#mpuUrgencyReason-miamPolicyUpgradeUrgencyReason_Value_7",
}

export class MiamPolicyUpgrade5Page {
  public static async miamPolicyUpgrade5Page({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
  }: MiamPolicyUpgrade5PageOptions): Promise<void> {
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
      `${Selectors.h2}:text-is("${MiamPolicyUpgrade5Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${MiamPolicyUpgrade5Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${MiamPolicyUpgrade5Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${MiamPolicyUpgrade5Content.formHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        8,
        MiamPolicyUpgrade5Content,
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
      await page.click(`${UniqueSelectors.financialHardship}`);
    } else {
      await page.click(`${UniqueSelectors.delayHarmToChild}`);
    }
    await page.click(
      `${Selectors.button}:text-is("${MiamPolicyUpgrade5Content.continue}")`,
    );
  }
}
