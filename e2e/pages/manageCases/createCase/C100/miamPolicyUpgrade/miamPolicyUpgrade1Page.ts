import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { MiamPolicyUpgrade1Content } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade1Content.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface MiamPolicyUpgrade1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillinFieldsOptions {
  page: Page;
  C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType;
}

export type C100MiamPolicyUpgrade1PageType =
  | "yes"
  | "yesAttendedMiam"
  | "yesExemption";

enum UniqueSelectors {
  invovledInEmergencyProtectionYes = "#mpuChildInvolvedInMiam_Yes",
  invovledInEmergencyProtectionNo = "#mpuChildInvolvedInMiam_No",
  attendedMiamYes = "#mpuApplicantAttendedMiam_Yes",
  attendedMiamNo = "#mpuApplicantAttendedMiam_No",
  applicantExemptionYes = "#mpuClaimingExemptionMiam_Yes",
  applicantExemptionNo = "#mpuClaimingExemptionMiam_No",
}

export class MiamPolicyUpgrade1Page {
  public static async miamPolicyUpgrade1Page({
    page: page,
    accessibilityTest: accessibilityTest,
    C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
  }: MiamPolicyUpgrade1PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({
      page: page,
      C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.p}:text-is("${MiamPolicyUpgrade1Content.p}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${MiamPolicyUpgrade1Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${MiamPolicyUpgrade1Content.formLabel1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}[for="mpuChildInvolvedInMiam_Yes"]:text-is("${MiamPolicyUpgrade1Content.formLabelYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}[for="mpuChildInvolvedInMiam_No"]:text-is("${MiamPolicyUpgrade1Content.formLabelNo}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page: page,
    C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
  }: fillinFieldsOptions): Promise<void> {
    switch (C100MiamPolicyUpgrade1PageType) {
      case "yes":
        await page.click(`${UniqueSelectors.invovledInEmergencyProtectionYes}`);
        break;
      case "yesAttendedMiam":
        await page.click(`${UniqueSelectors.invovledInEmergencyProtectionNo}`);
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}:text-is("${MiamPolicyUpgrade1Content.additionalFormLabel1}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}[for="mpuApplicantAttendedMiam_Yes"]:text-is("${MiamPolicyUpgrade1Content.formLabelYes}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}[for="mpuApplicantAttendedMiam_No"]:text-is("${MiamPolicyUpgrade1Content.formLabelNo}")`,
            1,
          ),
        ]);
        await page.click(`${UniqueSelectors.attendedMiamYes}`);
        break;
      case "yesExemption":
        await page.click(`${UniqueSelectors.invovledInEmergencyProtectionNo}`);
        await page.click(`${UniqueSelectors.attendedMiamNo}`);
        await Helpers.checkGroup(
          page,
          2,
          MiamPolicyUpgrade1Content,
          "additionalFormLabel",
          `${Selectors.GovukFormLabel}`,
        );
        await Promise.all([
          Helpers.checkGroup(
            page,
            2,
            MiamPolicyUpgrade1Content,
            "additionalFormLabel",
            `${Selectors.GovukFormLabel}`,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}[for="mpuApplicantAttendedMiam_Yes"]:text-is("${MiamPolicyUpgrade1Content.formLabelYes}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}[for="mpuClaimingExemptionMiam_Yes"]:text-is("${MiamPolicyUpgrade1Content.formLabelYes}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}[for="mpuApplicantAttendedMiam_No"]:text-is("${MiamPolicyUpgrade1Content.formLabelNo}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}[for="mpuClaimingExemptionMiam_No"]:text-is("${MiamPolicyUpgrade1Content.formLabelNo}")`,
            1,
          ),
        ]);
        await page.click(`${UniqueSelectors.applicantExemptionYes}`);
        break;
    }
    await page.click(
      `${Selectors.button}:text-is("${MiamPolicyUpgrade1Content.continue}")`,
    );
  }
}
