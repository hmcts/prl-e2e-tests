import { Page } from "@playwright/test";
import { C100MiamPolicyUpgrade1PageType } from "./miamPolicyUpgrade1Page";
import { miamSelection } from "./miamPolicyUpgrade6Page";
import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { MiamPolicyUpgradeSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgradeSubmitContent";

interface MiamPolicyUpgradeSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType;
  yesNoMiamPolicyUpgrade: boolean;
  miamSelection: miamSelection;
}

interface checkFieldsOptions {
  page: Page;
  C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType;
  yesNoMiamPolicyUpgrade: boolean;
  miamSelection: miamSelection;
}

interface checkFilledDataOptions {
  page: Page;
  C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType;
  yesNoMiamPolicyUpgrade: boolean;
  miamSelection: miamSelection;
}

export class MiamPolicyUpgradeSubmitPage {
  public static async miamPolicyUpgradeSubmitPage({
    page: page,
    accessibilityTest: accessibilityTest,
    C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
    yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
    miamSelection: miamSelection,
  }: MiamPolicyUpgradeSubmitPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
      C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
      yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
      miamSelection: miamSelection,
    });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
    C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
    yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
    miamSelection: miamSelection,
  }: MiamPolicyUpgradeSubmitPageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${MiamPolicyUpgradeSubmitContent.h2}")`,
    );
    await Promise.all([
      this.checkPageFields({
        page: page,
        C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
        yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
        miamSelection: miamSelection,
      }),
      this.checkPageData({
        page: page,
        C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
        yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
        miamSelection: miamSelection,
      }),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkPageFields({
    page: page,
    C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
    yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
    miamSelection: miamSelection,
  }: checkFieldsOptions): Promise<void> {
    await page.waitForTimeout(1000);
    switch (C100MiamPolicyUpgrade1PageType) {
      case "yes":
        break;

      case "yesAttendedMiam":
        break;

      case "yesExemption":
        if (
          yesNoMiamPolicyUpgrade &&
          miamSelection === "attended4MonthsPrior"
        ) {
        } else if (
          yesNoMiamPolicyUpgrade &&
          miamSelection === "initiatedMIAMBeforeProceedings_MIAMCertificate"
        ) {
        } else if (
          miamSelection === "initiatedMIAMBeforeProceedings_MIAMDetails"
        ) {
        } else {
          console.log("Need to select at least one miamSelection option");
        }
        break;
    }
  }

  private static async checkPageData({
    page: page,
    C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
    yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
    miamSelection: miamSelection,
  }: checkFilledDataOptions): Promise<void> {
    await page.waitForTimeout(1000);
    switch (C100MiamPolicyUpgrade1PageType) {
      case "yes":
        break;

      case "yesAttendedMiam":
        break;

      case "yesExemption":
        if (
          yesNoMiamPolicyUpgrade &&
          miamSelection === "attended4MonthsPrior"
        ) {
        } else if (
          yesNoMiamPolicyUpgrade &&
          miamSelection === "initiatedMIAMBeforeProceedings_MIAMCertificate"
        ) {
        } else if (
          miamSelection === "initiatedMIAMBeforeProceedings_MIAMDetails"
        ) {
        } else {
          console.log("Need to select at least one miamSelection option");
        }
        break;
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${MiamPolicyUpgradeSubmitContent.continue}")`,
    );
  }
}
