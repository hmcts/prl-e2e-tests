import { Page } from "@playwright/test";
import { C100MiamPolicyUpgrade1PageType } from "./miamPolicyUpgrade1Page";
import { miamSelection } from "./miamPolicyUpgrade6Page";
import { Selectors } from "../../../../../common/selectors";
import { AxeUtils } from "@hmcts/playwright-common";
import { MiamPolicyUpgradeSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgradeSubmitContent";
import { Helpers } from "../../../../../common/helpers";

import { MiamPolicyUpgrade8Content } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade8Content";
import path from "path";
import config from "../../../../../utils/config.utils";
import { MiamPolicyUpgrade2Content } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade2Content";
import { MiamPolicyUpgrade3Content } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade3Content";
import { MiamPolicyUpgrade4Content } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade4Content";
import { MiamPolicyUpgrade5Content } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade5Content";
import { MiamPolicyUpgrade6Content } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade6Content";
import { MiamPolicyUpgrade7Content } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade7Content";

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
      await new AxeUtils(page).audit();
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
            2,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade8Content.soleTraderName}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovLink}:text-is("${path.basename(config.testPdfFile)}")`,
            1,
          ),
        ]);
        break;

      case "yesExemption":
        await Promise.all([
          Helpers.checkGroup(
            page,
            5,
            MiamPolicyUpgrade2Content,
            "formLabel",
            `${Selectors.GovukText16}`,
          ),
          Helpers.checkGroup(
            page,
            22,
            MiamPolicyUpgrade3Content,
            "formLabel",
            `${Selectors.GovukText16}`,
          ),
        ]);
        if (
          yesNoMiamPolicyUpgrade &&
          miamSelection === "attended4MonthsPrior"
        ) {
          await Promise.all([
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgradeSubmitContent.text16No}")`,
              2,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgradeSubmitContent.text16Yes}")`,
              2,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovLink}:text-is("${path.basename(config.testPdfFile)}")`,
              2,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade4Content.formLabel2}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade5Content.formLabel6}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade6Content.formLabel2}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade7Content.formLabel2}")`,
              1,
            ),
          ]);
        } else if (
          yesNoMiamPolicyUpgrade &&
          miamSelection === "initiatedMIAMBeforeProceedings_MIAMCertificate"
        ) {
          await Promise.all([
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgradeSubmitContent.text16No}")`,
              2,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgradeSubmitContent.text16Yes}")`,
              2,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovLink}:text-is("${path.basename(config.testPdfFile)}")`,
              2,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade4Content.formLabel2}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade5Content.formLabel6}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade6Content.formLabel3}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade6Content.formLabelEvidence2}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade7Content.formLabel2}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgradeSubmitContent.text16Change}")`,
              13,
            ),
          ]);
        } else if (
          miamSelection === "initiatedMIAMBeforeProceedings_MIAMDetails"
        ) {
          await Promise.all([
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgradeSubmitContent.text16No}")`,
              3,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgradeSubmitContent.text16Yes}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.Span}:text-is("${MiamPolicyUpgrade7Content.loremIpsum}")`,
              3,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade4Content.formLabel3}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade5Content.formLabel3}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade6Content.formLabel3}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade6Content.formLabelEvidence3}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgrade7Content.formLabel4}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${MiamPolicyUpgradeSubmitContent.text16Change}")`,
              14,
            ),
          ]);
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
