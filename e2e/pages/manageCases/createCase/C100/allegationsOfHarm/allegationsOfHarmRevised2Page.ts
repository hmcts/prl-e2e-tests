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
  forcedMarriageOrderCurrentYes = "#newOrdersForcedMarriageProtectionCurrent_Yes",
  forcedMarriageProtectionNameOfCourt = "#newOrdersForcedMarriageProtectionCourtName",
  forcedMarriageProtectionCaseNumber = "#newOrdersForcedMarriageProtectionCaseNumber",
  forcedMarriageFileUpload = "#newOrdersForcedMarriageProtectionDocument",
  restrainingYes = "#newOrdersRestraining_Yes",
  restrainingOrderDayIssued = "#newOrdersRestrainingDateIssued-day",
  restrainingOrderMonthIssued = "#newOrdersRestrainingDateIssued-month",
  restrainingOrderYearIssued = "#newOrdersRestrainingDateIssued-year",
  restrainingOrderDayEnded = "#newOrdersRestrainingEndDate-day",
  restrainingOrderMonthEnded = "#newOrdersRestrainingEndDate-month",
  restrainingOrderYearEnded = "#newOrdersRestrainingEndDate-year",
  restrainingOrderCurrentYes = "#newOrdersRestrainingCurrent_Yes",
  restrainingOrderNameOfCourt = "#newOrdersRestrainingCourtName",
  restrainingOrderCaseNumber = "#newOrdersRestrainingCaseNumber",
  restrainingOrderFileUpload = "#newOrdersRestrainingDocument",
  otherInjunctiveYes = "#newOrdersOtherInjunctive_Yes",
  otherInjunctiveDayIssued = "#newOrdersOtherInjunctiveDateIssued-day",
  otherInjunctiveMonthIssued = "#newOrdersOtherInjunctiveDateIssued-month",
  otherInjunctiveYearIssued = "#newOrdersOtherInjunctiveDateIssued-year",
  otherInjunctiveDayEnded = "#newOrdersOtherInjunctiveEndDate-day",
  otherInjunctiveMonthEnded = "#newOrdersOtherInjunctiveEndDate-month",
  otherInjunctiveYearEnded = "#newOrdersOtherInjunctiveEndDate-year",
  otherInjunctiveOrderCurrentYes = "#newOrdersOtherInjunctiveCurrent_Yes",
  otherInjunctiveNameOfCourt = "#newOrdersOtherInjunctiveCourtName",
  otherInjunctiveCaseNumber = "#newOrdersOtherInjunctiveCaseNumber",
  otherInjunctiveFileUpload = "#newOrdersOtherInjunctiveDocument",
  undertakingYes = "#newOrdersUndertakingInPlace_Yes",
  undertakingDayIssued = "#newOrdersUndertakingInPlaceDateIssued-day",
  undertakingMonthIssued = "#newOrdersUndertakingInPlaceDateIssued-month",
  undertakingYearIssued = "#newOrdersUndertakingInPlaceDateIssued-year",
  undertakingDayEnded = "#newOrdersUndertakingInPlaceEndDate-day",
  undertakingMonthEnded = "#newOrdersUndertakingInPlaceEndDate-month",
  undertakingYearEnded = "#newOrdersUndertakingInPlaceEndDate-year",
  undertakingOrderCurrentYes = "#newOrdersUndertakingInPlaceCurrent_Yes",
  undertakingNameOfCourt = "#newOrdersUndertakingInPlaceCourtName",
  undertakingCaseNumber = "#newOrdersUndertakingInPlaceCaseNumber",
  undertakingFileUpload = "#newOrdersUndertakingInPlaceDocument",
}

export class AllegationsOfHarmRevised2Page {
  public static async allegationsOfHarmRevised2Page({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: AllegationsOfHarmRevised2Options): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields(page);
  }

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
    await page.click(`${uniqueSelectors.domesticAbuseYes}`);
    await page.click(`${uniqueSelectors.childAbuseYes}`);
    await page.click(`${uniqueSelectors.childAbuseYes}`);
    await page.click(`${uniqueSelectors.childAbductionYes}`);
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
    await this.fillInFM(page);
    await this.fillInR(page);
    await this.fillInOI(page);
    await this.fillInUI(page);
    await this.checkFilledDataFields(page);
    await page.click(
      `${Selectors.button}:text-is("${AllegationsOfHarmRevised2Content.continue}")`,
    );
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
    await expect(
      page.locator(`.error-message:text-is("Uploading...")`),
    ).toHaveCount(0);
  }

  private static async fillInO(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.occupationYes}`);
    await page.fill(
      `${uniqueSelectors.occupationDayIssued}`,
      `${AllegationsOfHarmRevised2Content.dayIssuedOOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.occupationMonthIssued}`,
      `${AllegationsOfHarmRevised2Content.monthIssuedOOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.occupationYearIssued}`,
      `${AllegationsOfHarmRevised2Content.yearIssuedOOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.occupationDayEnded}`,
      `${AllegationsOfHarmRevised2Content.dayEndOOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.occupationMonthEnded}`,
      `${AllegationsOfHarmRevised2Content.monthEndOOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.occupationYearEnded}`,
      `${AllegationsOfHarmRevised2Content.yearEndOOrder}`,
    );
    await page.click(`${uniqueSelectors.occupationOrderCurrentYes}`);
    await page.click(`${uniqueSelectors.occupationOrderCurrentYes}`);
    await page.fill(
      `${uniqueSelectors.occupationNameOfCourt}`,
      `${AllegationsOfHarmRevised2Content.nameOfCourtOOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.occupationCaseNumber}`,
      `${AllegationsOfHarmRevised2Content.caseNumberOOrder}`,
    );
    await page.waitForTimeout(5000);
    const fileInput: Locator = page.locator(
      `${uniqueSelectors.occupationFileUpload}`,
    );
    await fileInput.setInputFiles(config.testPdfFile);
    await expect(
      page.locator(`.error-message:text-is("Uploading...")`),
    ).toHaveCount(0);
  }

  private static async fillInFM(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.forcedMarriageYes}`);
    await page.fill(
      `${uniqueSelectors.forcedMarriageProtectionDayIssued}`,
      `${AllegationsOfHarmRevised2Content.dayIssuedFMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.forcedMarriageProtectionMonthIssued}`,
      `${AllegationsOfHarmRevised2Content.monthIssuedFMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.forcedMarriageProtectionYearIssued}`,
      `${AllegationsOfHarmRevised2Content.yearIssuedFMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.forcedMarriageProtectionDayEnded}`,
      `${AllegationsOfHarmRevised2Content.dayEndFMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.forcedMarriageProtectionMonthEnded}`,
      `${AllegationsOfHarmRevised2Content.monthEndFMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.forcedMarriageProtectionYearEnded}`,
      `${AllegationsOfHarmRevised2Content.yearEndFMOrder}`,
    );
    await page.click(`${uniqueSelectors.forcedMarriageOrderCurrentYes}`);
    await page.click(`${uniqueSelectors.forcedMarriageOrderCurrentYes}`);
    await page.fill(
      `${uniqueSelectors.forcedMarriageProtectionNameOfCourt}`,
      `${AllegationsOfHarmRevised2Content.nameOfCourtFMOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.forcedMarriageProtectionCaseNumber}`,
      `${AllegationsOfHarmRevised2Content.caseNumberFMOrder}`,
    );
    await page.waitForTimeout(5000);
    const fileInput: Locator = page.locator(
      `${uniqueSelectors.forcedMarriageFileUpload}`,
    );
    await fileInput.setInputFiles(config.testPdfFile);
    await expect(
      page.locator(`.error-message:text-is("Uploading...")`),
    ).toHaveCount(0);
  }

  private static async fillInR(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.restrainingYes}`);
    await page.fill(
      `${uniqueSelectors.restrainingOrderDayIssued}`,
      `${AllegationsOfHarmRevised2Content.dayIssuedROrder}`,
    );
    await page.fill(
      `${uniqueSelectors.restrainingOrderMonthIssued}`,
      `${AllegationsOfHarmRevised2Content.monthIssuedROrder}`,
    );
    await page.fill(
      `${uniqueSelectors.restrainingOrderYearIssued}`,
      `${AllegationsOfHarmRevised2Content.yearIssuedROrder}`,
    );
    await page.fill(
      `${uniqueSelectors.restrainingOrderDayEnded}`,
      `${AllegationsOfHarmRevised2Content.dayEndROrder}`,
    );
    await page.fill(
      `${uniqueSelectors.restrainingOrderMonthEnded}`,
      `${AllegationsOfHarmRevised2Content.monthEndROrder}`,
    );
    await page.fill(
      `${uniqueSelectors.restrainingOrderYearEnded}`,
      `${AllegationsOfHarmRevised2Content.yearEndROrder}`,
    );
    await page.click(`${uniqueSelectors.restrainingOrderCurrentYes}`);
    await page.click(`${uniqueSelectors.restrainingOrderCurrentYes}`);
    await page.fill(
      `${uniqueSelectors.restrainingOrderNameOfCourt}`,
      `${AllegationsOfHarmRevised2Content.nameOfCourtROrder}`,
    );
    await page.fill(
      `${uniqueSelectors.restrainingOrderCaseNumber}`,
      `${AllegationsOfHarmRevised2Content.caseNumberROrder}`,
    );
    await page.waitForTimeout(5000);
    const fileInput: Locator = page.locator(
      `${uniqueSelectors.restrainingOrderFileUpload}`,
    );
    await fileInput.setInputFiles(config.testPdfFile);
    await expect(
      page.locator(`.error-message:text-is("Uploading...")`),
    ).toHaveCount(0);
  }

  private static async fillInOI(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.otherInjunctiveYes}`);
    await page.fill(
      `${uniqueSelectors.otherInjunctiveDayIssued}`,
      `${AllegationsOfHarmRevised2Content.dayIssuedOIOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.otherInjunctiveMonthIssued}`,
      `${AllegationsOfHarmRevised2Content.monthIssuedOIOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.otherInjunctiveYearIssued}`,
      `${AllegationsOfHarmRevised2Content.yearIssuedOIOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.otherInjunctiveDayEnded}`,
      `${AllegationsOfHarmRevised2Content.dayEndOIOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.otherInjunctiveMonthEnded}`,
      `${AllegationsOfHarmRevised2Content.monthEndOIOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.otherInjunctiveYearEnded}`,
      `${AllegationsOfHarmRevised2Content.yearEndOIOrder}`,
    );
    await page.click(`${uniqueSelectors.otherInjunctiveOrderCurrentYes}`);
    await page.click(`${uniqueSelectors.otherInjunctiveOrderCurrentYes}`);
    await page.fill(
      `${uniqueSelectors.otherInjunctiveNameOfCourt}`,
      `${AllegationsOfHarmRevised2Content.nameOfCourtOIOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.otherInjunctiveCaseNumber}`,
      `${AllegationsOfHarmRevised2Content.caseNumberOIOrder}`,
    );
    await page.waitForTimeout(5000);
    const fileInput: Locator = page.locator(
      `${uniqueSelectors.otherInjunctiveFileUpload}`,
    );
    await fileInput.setInputFiles(config.testPdfFile);
    await expect(
      page.locator(`.error-message:text-is("Uploading...")`),
    ).toHaveCount(0);
  }

  private static async fillInUI(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.undertakingYes}`);
    await page.fill(
      `${uniqueSelectors.undertakingDayIssued}`,
      `${AllegationsOfHarmRevised2Content.dayIssuedUIPOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.undertakingMonthIssued}`,
      `${AllegationsOfHarmRevised2Content.monthIssuedUIPOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.undertakingYearIssued}`,
      `${AllegationsOfHarmRevised2Content.yearIssuedUIPOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.undertakingDayEnded}`,
      `${AllegationsOfHarmRevised2Content.dayEndUIPOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.undertakingMonthEnded}`,
      `${AllegationsOfHarmRevised2Content.monthEndUIPOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.undertakingYearEnded}`,
      `${AllegationsOfHarmRevised2Content.yearEndUIPOrder}`,
    );
    await page.click(`${uniqueSelectors.undertakingOrderCurrentYes}`);
    await page.click(`${uniqueSelectors.undertakingOrderCurrentYes}`);
    await page.fill(
      `${uniqueSelectors.undertakingNameOfCourt}`,
      `${AllegationsOfHarmRevised2Content.nameOfCourtUIPOrder}`,
    );
    await page.fill(
      `${uniqueSelectors.undertakingCaseNumber}`,
      `${AllegationsOfHarmRevised2Content.caseNumberUIPOrder}`,
    );
    await page.waitForTimeout(5000);
    const fileInput: Locator = page.locator(
      `${uniqueSelectors.undertakingFileUpload}`,
    );
    await fileInput.setInputFiles(config.testPdfFile);
    await expect(
      page.locator(`.error-message:text-is("Uploading...")`),
    ).toHaveCount(0);
  }

  private static async checkFilledDataFields(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised2Content.formLabelYes}")`,
        17,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised2Content.formLabelNo}")`,
        17,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised2Content.formLabelYesFields}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised2Content.formLabelYesFields}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised2Content.formLabelDateIssued}")`,
        6,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised2Content.formLabelEndDate}")`,
        6,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised2Content.formLabelDay}")`,
        12,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised2Content.formLabelMonth}")`,
        12,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised2Content.formLabelYear}")`,
        12,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised2Content.formLabelOrderCurrent}")`,
        6,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised2Content.formLabelNameOfCourt}")`,
        6,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised2Content.formLabelCaseNumber}")`,
        6,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised2Content.formLabelUploadRelevantOrders}")`,
        6,
      ),
    ]);
  }
}
