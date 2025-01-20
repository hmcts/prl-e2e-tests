import { Page } from "@playwright/test";
import { MiamChildProtectionConcernsType } from "./miamChildProtectionPage";
import { MiamUrgencyType } from "./miamUrgencyPage";
import { MiamAttendanceType } from "./miamPreviousAttendancePage";
import { MiamOtherReasonForNotAttending } from "./miamMiamOtherPage";
import { MiamReasonForNoAccessToMediator } from "./miamNoAccessToMediatorPage";
import { Selectors } from "../../../../../common/selectors";
import { MiamMiamExemptionsSummaryContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamMiamExemptionsSummaryContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";

interface MiamMiamExemptionsSummaryPageOptions {
  page: Page;
  accessibilityTest: boolean;
  miamDomesticAbuse: boolean; // Decides whether there are all domestic abuse reasons listed.
  miamChildProtectionConcernsType: MiamChildProtectionConcernsType; // Decides which child protection concern is listed.
  miamUrgencyType: MiamUrgencyType; // Decides which reason there is for urgency.
  miamAttendanceType: MiamAttendanceType; // Decides which reason there is for previous MIAM attendance.
  miamOtherReasonForNotAttending: MiamOtherReasonForNotAttending; // Decides which Other reason there is for not attending
  miamReasonForNoAccessToMediator: MiamReasonForNoAccessToMediator; // If other reason === "No access to mediator", this decides which reason for no access is used.
}

export class MiamMiamExemptionsSummaryPage {
  public static async miamMiamExemptionsSummaryPage({
    page: page,
    accessibilityTest: accessibilityTest,
    miamDomesticAbuse: miamDomesticAbuse,
    miamChildProtectionConcernsType: miamChildProtectionConcernsType,
    miamUrgencyType: miamUrgencyType,
    miamAttendanceType: miamAttendanceType,
    miamOtherReasonForNotAttending: miamOtherReasonForNotAttending,
    miamReasonForNoAccessToMediator: miamReasonForNoAccessToMediator,
  }: MiamMiamExemptionsSummaryPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
      miamDomesticAbuse: miamDomesticAbuse,
      miamChildProtectionConcernsType: miamChildProtectionConcernsType,
      miamUrgencyType: miamUrgencyType,
      miamAttendanceType: miamAttendanceType,
      miamOtherReasonForNotAttending: miamOtherReasonForNotAttending,
      miamReasonForNoAccessToMediator: miamReasonForNoAccessToMediator,
    });
    await this.fillInFields({ page: page });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
    miamDomesticAbuse: miamDomesticAbuse,
    miamChildProtectionConcernsType: miamChildProtectionConcernsType,
    miamUrgencyType: miamUrgencyType,
    miamAttendanceType: miamAttendanceType,
    miamOtherReasonForNotAttending: miamOtherReasonForNotAttending,
    miamReasonForNoAccessToMediator: miamReasonForNoAccessToMediator,
  }: MiamMiamExemptionsSummaryPageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${MiamMiamExemptionsSummaryContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        MiamMiamExemptionsSummaryContent,
        `govukBodyM`,
        Selectors.GovukBodyM,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${MiamMiamExemptionsSummaryContent.govukHeadingM1}")`,
        1,
      ),
    ]);
    if (miamDomesticAbuse) {
      await this.handleDomesticAbuse({ page: page });
    }
    await this.handleChildDomesticAbuse({
      page: page,
      miamChildProtectionConcernsType: miamChildProtectionConcernsType,
    });
    await this.handleUrgency({ page: page, miamUrgencyType: miamUrgencyType });
    await this.handlePreviousAttendance({
      page: page,
      miamAttendanceType: miamAttendanceType,
    });
    await this.handleOtherReason({
      page: page,
      miamOtherReasonForNotAttending: miamOtherReasonForNotAttending,
      miamReasonForNoAccessToMediator: miamReasonForNoAccessToMediator,
    });
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page); //#TODO: Re-enable when PRL-6520 is completed
    }
  }

  private static async handleDomesticAbuse({
    page: page,
  }: Partial<MiamMiamExemptionsSummaryPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${MiamMiamExemptionsSummaryContent.govukHeadingM2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        27,
        MiamMiamExemptionsSummaryContent,
        `liDomesticAbuse`,
        Selectors.li,
      ),
    ]);
  }

  private static async handleChildDomesticAbuse({
    page: page,
    miamChildProtectionConcernsType: miamChildProtectionConcernsType,
  }: Partial<MiamMiamExemptionsSummaryPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (miamChildProtectionConcernsType === "None of the above") {
      return;
    }
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukHeadingM}:text-is("${MiamMiamExemptionsSummaryContent.govukHeadingM3}")`,
      1,
    );
    if (miamChildProtectionConcernsType === "Child protection plan") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liChildProtectionConcernsProtectionPlan}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liChildProtectionConcernsSection47}")`,
        1,
      );
    }
  }

  private static async handleUrgency({
    page: page,
    miamUrgencyType: miamUrgencyType,
  }: Partial<MiamMiamExemptionsSummaryPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (miamUrgencyType === "None of these") {
      return;
    }
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukHeadingM}:text-is("${MiamMiamExemptionsSummaryContent.govukHeadingM4}")`,
      1,
    );
    switch (miamUrgencyType) {
      case "Risk to life":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liRiskToYourLife}")`,
          1,
        );
        break;
      case "Risk to family life":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liRiskToYourFamily}")`,
          1,
        );
        break;
      case "Risk to safety of home":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liRiskToHomeSafety}")`,
          1,
        );
        break;
      case "Delay causing risk of harm":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liRiskToChildren}")`,
          1,
        );
        break;
      case "Delay causing risk of removal":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liRiskOfUnlawfulRemoval}")`,
          1,
        );
        break;
      case "Delay causing risk of unfair court decision":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liRiskOfUnfairDecision}")`,
          1,
        );
        break;
      case "Delay causing risk of financial hardship":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liRiskOfFinancialHardship}")`,
          1,
        );
        break;
      case "Delay causing risk of irretrievable problems":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liRiskOfLossOfEvidence}")`,
          1,
        );
        break;
      case "Delay dispute starting in another country":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liRiskOfInternationalProceedings}")`,
          1,
        );
        break;
    }
  }

  private static async handlePreviousAttendance({
    page: page,
    miamAttendanceType: miamAttendanceType,
  }: Partial<MiamMiamExemptionsSummaryPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (miamAttendanceType === "None of these") {
      return;
    }
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukHeadingM}:text-is("${MiamMiamExemptionsSummaryContent.govukHeadingM5}")`,
      1,
    );
    if (miamAttendanceType === "Application made in existing proceedings") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liPreviousAttendance2}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liPreviousAttendance1}")`,
        1,
      );
    }
  }

  private static async handleOtherReason({
    page: page,
    miamOtherReasonForNotAttending: miamOtherReasonForNotAttending,
    miamReasonForNoAccessToMediator: miamReasonForNoAccessToMediator,
  }: Partial<MiamMiamExemptionsSummaryPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (miamOtherReasonForNotAttending === "None of the above") {
      return;
    }
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukHeadingM}:text-is("${MiamMiamExemptionsSummaryContent.govukHeadingM6}")`,
      1,
    );
    switch (miamOtherReasonForNotAttending) {
      case "Applying for without notice":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liOtherReasons1}")`,
          1,
        );
        break;
      case "Under 18":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liOtherReasons2}")`,
          1,
        );
        break;
      case "Cannot access mediator":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liOtherReasons3}")`,
          1,
        );
        await this.handleNoMediator({
          page: page,
          miamReasonForNoAccessToMediator: miamReasonForNoAccessToMediator,
        });
        break;
    }
  }

  private static async handleNoMediator({
    page: page,
    miamReasonForNoAccessToMediator: miamReasonForNoAccessToMediator,
  }: Partial<MiamMiamExemptionsSummaryPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (miamReasonForNoAccessToMediator === "None of these") {
      return;
    }
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.lieNoMediatorCommon}")`,
      1,
    );
    switch (miamReasonForNoAccessToMediator) {
      case "Unable to conduct within 15 days":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liNoMediator1}")`,
          1,
        );
        break;
      case "Disability":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liNoMediator2}")`,
          1,
        );
        break;
      case "No mediator within 15 miles":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liNoMediator3}")`,
          1,
        );
        break;
      case "Prison or institution":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liNoMediator4}")`,
          1,
        );
        break;
      case "Subject to bail":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liNoMediator5}")`,
          1,
        );
        break;
      case "Released from prison on license":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.li}:text-is("${MiamMiamExemptionsSummaryContent.liNoMediator6}")`,
          1,
        );
        break;
    }
  }

  private static async fillInFields({
    page: page,
  }: Partial<MiamMiamExemptionsSummaryPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
