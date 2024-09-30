import { Page } from "@playwright/test";
import { C100MiamPolicyUpgrade1PageType } from "./miamPolicyUpgrade1Page";
import { miamSelection } from "./miamPolicyUpgrade6Page";
import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { MiamPolicyUpgradeSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgradeSubmitContent";
import { Helpers } from "../../../../../common/helpers";

import { MiamPolicyUpgrade8Content } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade8Content";
import path from "path";
import config from "../../../../../config";

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
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${MiamPolicyUpgradeSubmitContent.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${MiamPolicyUpgradeSubmitContent.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${MiamPolicyUpgradeSubmitContent.text16CheckInfo}")`,
        1,
      ),
    ]);

    switch (C100MiamPolicyUpgrade1PageType) {
      case "yes":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${MiamPolicyUpgradeSubmitContent.text16ChildrenInvolvedInEmergencyProtection}")`,
          1,
        );
        break;

      case "yesAttendedMiam":
        await Helpers.checkGroup(
          page,
          6,
          MiamPolicyUpgradeSubmitContent,
          "text16Attended",
          `${Selectors.GovukText16}`,
        );
        break;

      case "yesExemption":
        await Helpers.checkGroup(
          page,
          6,
          MiamPolicyUpgradeSubmitContent,
          "text16CoreExemption",
          `${Selectors.GovukText16}`,
        );
        if (
          yesNoMiamPolicyUpgrade &&
          miamSelection === "attended4MonthsPrior"
        ) {
          await Helpers.checkGroup(
            page,
            6,
            MiamPolicyUpgradeSubmitContent,
            "text16Exemption",
            `${Selectors.GovukText16}`,
          );
        } else if (
          yesNoMiamPolicyUpgrade &&
          miamSelection === "initiatedMIAMBeforeProceedings_MIAMCertificate"
        ) {
          await Helpers.checkGroup(
            page,
            7,
            MiamPolicyUpgradeSubmitContent,
            "text161Exemption",
            `${Selectors.GovukText16}`,
          );
        } else if (
          miamSelection === "initiatedMIAMBeforeProceedings_MIAMDetails"
        ) {
          await Helpers.checkGroup(
            page,
            8,
            MiamPolicyUpgradeSubmitContent,
            "text162Exemption",
            `${Selectors.GovukText16}`,
          );
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
    switch (C100MiamPolicyUpgrade1PageType) {
      case "yes":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${MiamPolicyUpgradeSubmitContent.text16Yes}")`,
          1,
        );
        break;
      case "yesAttendedMiam":
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${MiamPolicyUpgradeSubmitContent.text16No}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${MiamPolicyUpgradeSubmitContent.text16Yes}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade8Content.mediatorRegistrationNumber}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade8Content.familyMediationServiceNumber}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade8Content.soleTraderName}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.a}:text-is("${path.basename(config.testPdfFile)}")`,
            1,
          ),
        ]);
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
