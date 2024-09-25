import { Page, expect, Locator } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { AllegationsOfHarmRevised2Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised2Content";
import { Helpers } from "../../../../../common/helpers";
import config from "../../../../../config";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

interface AllegationsOfHarmRevised2Options {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface checkPageLoads {
  page: Page;
  accessibilityTest: boolean;
}

enum uniqueSelectors {
  domesticAbuseYes = "#newAllegationsOfHarmDomesticAbuseYesNo_Yes",
  childAbuseYes = "#newAllegationsOfHarmChildAbuseYesNo_Yes",
  childAbductionYes = "#newAllegationsOfHarmChildAbductionYesNo_Yes",
  substanceAbuseYes = "#newAllegationsOfHarmSubstanceAbuseYesNo_Yes",
  substanceAbuseField = "#newAllegationsOfHarmSubstanceAbuseDetails",
  welfareYes = "#newAllegationsOfHarmOtherConcerns_Yes",
  welfareField = "#newAllegationsOfHarmOtherConcernsDetails",
  nonMolestationYes = "#newOrdersNonMolestation_Yes",
  nonMolestationDayIssued = "#newOrdersNonMolestationDateIssued-day",
  nonMolestationMonthIssued = "#newOrdersNonMolestationDateIssued-month",
  nonMolestationYearIssued = "#newOrdersNonMolestationDateIssued-year",
  nonMolestationDayEnded = "#newOrdersNonMolestationEndDate-day",
  nonMolestationMonthEnded = "#newOrdersNonMolestationEndDate-month",
  nonMolestationYearEnded = "#newOrdersNonMolestationEndDate-year",
  nonMolestationOrderCurrentYes = "#newOrdersNonMolestationCurrent_Yes",
  nonMolestationNameOfCourt = "#newOrdersNonMolestationCourtName",
  nonMolestationCaseNumber = "#newOrdersNonMolestationCaseNumber",
  nonMolestationFileUpload = "#newOrdersNonMolestationDocument",
  occupationYes = "#newOrdersOccupation_Yes",
  occupationDayIssued = "#newOrdersOccupationDateIssued-day",
  occupationMonthIssued = "#newOrdersOccupationDateIssued-month",
  occupationYearIssued = "#newOrdersOccupationDateIssued-year",
  occupationDayEnded = "#newOrdersOccupationEndDate-day",
  occupationMonthEnded = "#newOrdersOccupationEndDate-month",
  occupationYearEnded = "#newOrdersOccupationEndDate-year",
  occupationOrderCurrentYes = "#newOrdersOccupationCurrent_Yes",
  occupationNameOfCourt = "#newOrdersOccupationCourtName",
  occupationCaseNumber = "#newOrdersOccupationCaseNumber",
  occupationFileUpload = "#newOrdersOccupationDocument",
  forcedMarriageYes = "#newOrdersForcedMarriageProtection_Yes",
  forcedMarriageProtectionDayIssued = "#newOrdersForcedMarriageProtectionDateIssued-day",
  forcedMarriageProtectionMonthIssued = "#newOrdersForcedMarriageProtectionDateIssued-month",
  forcedMarriageProtectionYearIssued = "#newOrdersForcedMarriageProtectionDateIssued-year",
  forcedMarriageProtectionDayEnded = "#newOrdersForcedMarriageProtectionEndDate-day",
  forcedMarriageProtectionMonthEnded = "#newOrdersForcedMarriageProtectionEndDate-month",
  forcedMarriageProtectionYearEnded = "#newOrdersForcedMarriageProtectionEndDate-year",
  forcedMarriageProtectionNameOfCourt = "#newOrdersForcedMarriageProtectionCourtName",
  forcedMarriageProtectionCaseNumber = "#newOrdersForcedMarriageProtectionCaseNumber",
  restrainingYes = "#newOrdersRestraining_Yes",
  restrainingOrderDayIssued = "#newOrdersRestrainingDateIssued-day",
  restrainingOrderMonthIssued = "#newOrdersRestrainingDateIssued-month",
  restrainingOrderYearIssued = "#newOrdersRestrainingDateIssued-year",
  restrainingOrderDayEnded = "#newOrdersRestrainingEndDate-day",
  restrainingOrderMonthEnded = "#newOrdersRestrainingEndDate-month",
  restrainingOrderYearEnded = "#newOrdersRestrainingEndDate-year",
  restrainingOrderNameOfCourt = "#newOrdersRestrainingCourtName",
  restrainingOrderCaseNumber = "#newOrdersRestrainingCaseNumber",
  otherInjunctiveYes = "#newOrdersOtherInjunctive_Yes",
  otherInjunctiveDayIssued = "#newOrdersOtherInjunctiveDateIssued-day",
  otherInjunctiveMonthIssued = "#newOrdersOtherInjunctiveDateIssued-month",
  otherInjunctiveYearIssued = "#newOrdersOtherInjunctiveDateIssued-year",
  otherInjunctiveDayEnded = "#newOrdersOtherInjunctiveEndDate-day",
  otherInjunctiveMonthEnded = "#newOrdersOtherInjunctiveEndDate-month",
  otherInjunctiveYearEnded = "#newOrdersOtherInjunctiveEndDate-year",
  otherInjunctiveNameOfCourt = "#newOrdersOtherInjunctiveCourtName",
  otherInjunctiveCaseNumber = "#newOrdersOtherInjunctiveCaseNumber",
  undertakingYes = "#newOrdersUndertakingInPlace_Yes",
  undertakingDayIssued = "#newOrdersUndertakingDateIssued-day",
  undertakingMonthIssued = "#newOrdersUndertakingDateIssued-month",
  undertakingYearIssued = "#newOrdersUndertakingDateIssued-year",
  undertakingDayEnded = "#newOrdersUndertakingEndDate-day",
  undertakingMonthEnded = "#newOrdersUndertakingEndDate-month",
  undertakingYearEnded = "#newOrdersUndertakingEndDate-year",
  undertakingNameOfCourt = "#newOrdersUndertakingCourtName",
  undertakingCaseNumber = "#newOrdersUndertakingCaseNumber",
}

export class AllegationsOfHarmRevised2Page {
  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoads): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h3}:text-is("${AllegationsOfHarmRevised2Content.h3}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        AllegationsOfHarmRevised2Content,
        `p`,
        `${Selectors.p}`,
      ),
      Helpers.checkGroup(
        page,
        11,
        AllegationsOfHarmRevised2Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${AllegationsOfHarmRevised2Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${AllegationsOfHarmRevised2Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised2Content.errorMessageDomesticAbuse}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised2Content.errorMessageDomesticAbuse}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised2Content.errorMessageAbuseToChildren}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised2Content.errorMessageAbuseToChildren}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised2Content.errorMessageAbduction}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised2Content.errorMessageAbduction}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised2Content.errorMessageDrugsAlcoholSubstance}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised2Content.errorMessageDrugsAlcoholSubstance}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised2Content.errorMessageSafetyAndWelfare}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised2Content.errorMessageSafetyAndWelfare}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised2Content.errorMessageNonMolestation}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised2Content.errorMessageNonMolestation}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised2Content.errorMessageOccupationOrder}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised2Content.errorMessageOccupationOrder}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised2Content.errorMessageForcedMarriage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised2Content.errorMessageForcedMarriage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised2Content.errorMessageRestrainingOrder}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised2Content.errorMessageRestrainingOrder}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised2Content.errorMessageOtherInjunctive}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised2Content.errorMessageOtherInjunctive}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised2Content.errorMessageUndertakingInPlace}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised2Content.errorMessageUndertakingInPlace}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.domesticAbuseYes}`);
    await page.click(`${uniqueSelectors.childAbuseYes}`);
    await page.click(`${uniqueSelectors.childAbductionYes}`);
    await page.click(`${uniqueSelectors.substanceAbuseYes}`);
    await page.fill(
      `${uniqueSelectors.substanceAbuseField}`,
      `${AllegationsOfHarmRevised2Content.detailsAbuse}`,
    );
    await page.click(`${uniqueSelectors.welfareYes}`);
    await page.fill(
      `${uniqueSelectors.welfareField}`,
      `${AllegationsOfHarmRevised2Content.detailsWelfare}`,
    );
    await this.fillInNM(page);
    await this.fillInO(page);
  }

  private static async fillInNM(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.nonMolestationYes}`);
    await page.fill(
      `${uniqueSelectors.nonMolestationDayIssued}`,
      `${AllegationsOfHarmRevised2Content.dayIssuedNMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.nonMolestationMonthIssued}`,
      `${AllegationsOfHarmRevised2Content.monthIssuedNMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.nonMolestationYearIssued}`,
      `${AllegationsOfHarmRevised2Content.yearIssuedNMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.nonMolestationDayEnded}`,
      `${AllegationsOfHarmRevised2Content.dayEndNMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.nonMolestationMonthEnded}`,
      `${AllegationsOfHarmRevised2Content.monthEndNMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.nonMolestationYearEnded}`,
      `${AllegationsOfHarmRevised2Content.yearEndNMOrder}`,
    );
    await page.click(`${uniqueSelectors.nonMolestationOrderCurrentYes}`);
    await page.fill(
      `${uniqueSelectors.nonMolestationNameOfCourt}`,
      `${AllegationsOfHarmRevised2Content.nameOfCourtNMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.nonMolestationCaseNumber}`,
      `${AllegationsOfHarmRevised2Content.caseNumberNMOrder}`,
    );
    await page.waitForTimeout(5000);
    const fileInput: Locator = page.locator(
      `${uniqueSelectors.nonMolestationFileUpload}`,
    );
    await fileInput.setInputFiles(config.testPdfFile);
    await expect(page.locator(".error-message")).toHaveCount(0);
  }

  private static async fillInO(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.occupationYes}`);
    await page.fill(
      `${uniqueSelectors.occupationDayIssued}`,
      `${AllegationsOfHarmRevised2Content.dayIssuedNMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.occupationMonthIssued}`,
      `${AllegationsOfHarmRevised2Content.monthIssuedNMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.occupationYearIssued}`,
      `${AllegationsOfHarmRevised2Content.yearIssuedNMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.occupationDayEnded}`,
      `${AllegationsOfHarmRevised2Content.dayEndNMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.occupationMonthEnded}`,
      `${AllegationsOfHarmRevised2Content.monthEndNMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.occupationYearEnded}`,
      `${AllegationsOfHarmRevised2Content.yearEndNMOrder}`,
    );
    await page.click(`${uniqueSelectors.occupationOrderCurrentYes}`);
    await page.fill(
      `${uniqueSelectors.occupationNameOfCourt}`,
      `${AllegationsOfHarmRevised2Content.nameOfCourtNMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.occupationCaseNumber}`,
      `${AllegationsOfHarmRevised2Content.caseNumberNMOrder}`,
    );
    await page.waitForTimeout(5000);
    const fileInput: Locator = page.locator(
      `${uniqueSelectors.occupationFileUpload}`,
    );
    await fileInput.setInputFiles(config.testPdfFile);
    await expect(page.locator(".error-message")).toHaveCount(0);
  }
}
