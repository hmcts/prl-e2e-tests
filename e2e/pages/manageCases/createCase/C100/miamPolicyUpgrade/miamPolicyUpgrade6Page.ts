import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { MiamPolicyUpgrade6Content } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade6Content.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import config from "../../../../../utils/config.utils.ts";

interface MiamPolicyUpgrade6PageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoMiamPolicyUpgrade: boolean;
  miamSelection: miamSelection;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  yesNoMiamPolicyUpgrade: boolean;
  miamSelection: miamSelection;
}

enum UniqueSelectors {
  attended4MonthsPrior = "#mpuPreviousMiamAttendanceReason-miamPolicyUpgradePreviousAttendance_Value_1",
  uploadFileInput1 = "#mpuDocFromDisputeResolutionProvider",
  uploadFileInput2 = "#mpuCertificateByMediator",
  initiatedMIAMBeforeProceedings = "#mpuPreviousMiamAttendanceReason-miamPolicyUpgradePreviousAttendance_Value_2",
  aMiamCertificate = "#mpuTypeOfPreviousMiamAttendanceEvidence-miamCertificate",
  MiamAttendenceDetails = "#mpuTypeOfPreviousMiamAttendanceEvidence-miamAttendanceDetails",
  miamAttendanceDetailInput = "#mpuMediatorDetails",
}

export type miamSelection =
  | "attended4MonthsPrior"
  | "initiatedMIAMBeforeProceedings_MIAMCertificate"
  | "initiatedMIAMBeforeProceedings_MIAMDetails";

export class MiamPolicyUpgrade6Page {
  public static async miamPolicyUpgrade6Page({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
    miamSelection: miamSelection,
  }: MiamPolicyUpgrade6PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
      yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
      miamSelection: miamSelection,
    });
  }
  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${MiamPolicyUpgrade6Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${MiamPolicyUpgrade6Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${MiamPolicyUpgrade6Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${MiamPolicyUpgrade6Content.formHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        MiamPolicyUpgrade6Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(`${UniqueSelectors.attended4MonthsPrior}`);
    await this.fileUploadContent(page);
    const fileInput1 = page.locator(`${UniqueSelectors.uploadFileInput1}`);
    await fileInput1.setInputFiles(config.testOdtFile);
    await page.waitForSelector(
      `${Selectors.GovukErrorMessage}:text-is("${MiamPolicyUpgrade6Content.uploadingFile}")`,
      { state: "hidden" },
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukErrorMessage}:text-is("${MiamPolicyUpgrade6Content.errorMessageUpload}")`,
      1,
    );
  }

  private static async fillInFields({
    page: page,
    miamSelection: miamSelection,
  }: fillInFieldsOptions): Promise<void> {
    switch (miamSelection) {
      case "attended4MonthsPrior":
        await page.click(`${UniqueSelectors.attended4MonthsPrior}`);
        await this.fileUploadContent(page);
        const fileInput1 = page.locator(`${UniqueSelectors.uploadFileInput1}`);
        await fileInput1.setInputFiles(config.testPdfFile);
        await page.waitForSelector(
          `${Selectors.GovukErrorMessage}:text-is("${MiamPolicyUpgrade6Content.uploadingFile}")`,
          { state: "hidden" },
        );
        await page.waitForTimeout(1000);
        break;

      case "initiatedMIAMBeforeProceedings_MIAMCertificate":
        await page.click(`${UniqueSelectors.initiatedMIAMBeforeProceedings}`);
        await Helpers.checkGroup(
          page,
          3,
          MiamPolicyUpgrade6Content,
          "formLabelEvidence",
          `${Selectors.GovukFormLabel}`,
        );
        await page.click(`${UniqueSelectors.aMiamCertificate}`);
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${MiamPolicyUpgrade6Content.formLabelEvidenceUploadMiam}")`,
          1,
        );
        const fileInput2 = page.locator(`${UniqueSelectors.uploadFileInput2}`);
        await fileInput2.setInputFiles(config.testPdfFile);
        await page.waitForSelector(
          `${Selectors.GovukErrorMessage}:text-is("${MiamPolicyUpgrade6Content.uploadingFile}")`,
          { state: "hidden" },
        );
        break;
      case "initiatedMIAMBeforeProceedings_MIAMDetails":
        await page.click(`${UniqueSelectors.initiatedMIAMBeforeProceedings}`);
        await Helpers.checkGroup(
          page,
          3,
          MiamPolicyUpgrade6Content,
          "formLabelEvidence",
          `${Selectors.GovukFormLabel}`,
        );
        await page.click(`${UniqueSelectors.MiamAttendenceDetails}`);
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}:text-is("${MiamPolicyUpgrade6Content.formLabelEvidenceProvideMediator}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormHint}:text-is("${MiamPolicyUpgrade6Content.formHintEvidence}")`,
            1,
          ),
        ]);
        await page.fill(
          `${UniqueSelectors.miamAttendanceDetailInput}`,
          MiamPolicyUpgrade6Content.loremIpsum,
        );
    }
    await page.click(
      `${Selectors.button}:text-is("${MiamPolicyUpgrade6Content.continue}")`,
    );
  }

  private static async fileUploadContent(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${MiamPolicyUpgrade6Content.formLabelAttended}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${MiamPolicyUpgrade6Content.formPAttended}")`,
        1,
      ),
    ]);
  }
}
