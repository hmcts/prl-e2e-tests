import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { AttendingTheHearing1Content } from "../../../../../fixtures/manageCases/createCase/FL401/attendingTheHearing/attendingTheHearing1Content";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { solicitorCaseCreateType } from "../../../../../common/types";

enum uniqueSelectors {
  fl401WelshNeeds = "div#fl401WelshNeeds > div > ",
  fl401WelshNeedsFields = "div#fl401WelshNeeds_0_fl401SpokenOrWritten > fieldset > div > ",
  c100WelshNeeds = "div#welshNeeds > div > ",
  c100WelshNeedsFields = "div#welshNeeds_0_spokenOrWritten > fieldset > div > ",
  interpreterNeeds = "div#interpreterNeeds > div > ",
}

enum inputIDs {
  welshYes = "#isWelshNeeded_Yes",
  welshNo = "#isWelshNeeded_No",
  interpreterYes = "#isInterpreterNeeded_Yes",
  interpreterNo = "#isInterpreterNeeded_No",
  disabilityYes = "#isDisabilityPresent_Yes",
  disabilityNo = "#isDisabilityPresent_No",
  specialArrangementsYes = "#isSpecialArrangementsRequired_Yes",
  specialArrangementsNo = "#isSpecialArrangementsRequired_No",
  intermediaryNeededYes = "#isIntermediaryNeeded_Yes",
  intermediaryNeededNo = "#isIntermediaryNeeded_No",
  fl401WhoNeedsWelsh = "#fl401WelshNeeds_0_whoNeedsWelsh",
  fl401SpokenWelsh = "#fl401WelshNeeds_0_fl401SpokenOrWritten-spoken",
  fl401WrittenWelsh = "#fl401WelshNeeds_0_fl401SpokenOrWritten-written",
  fl401SpokenAndWritten = "#fl401WelshNeeds_0_fl401SpokenOrWritten-both",
  c100WhoNeedsWelsh = "#welshNeeds_0_whoNeedsWelsh",
  c100SpokenWelsh = "#welshNeeds_0_spokenOrWritten-spoken",
  c100WrittenWelsh = "#welshNeeds_0_spokenOrWritten-written",
  c100SpokenAndWritten = "#welshNeeds_0_spokenOrWritten-both",
  applicantNeedsInterpreter = "#interpreterNeeds_0_party-applicant",
  respondentNeedsInterpreter = "#interpreterNeeds_0_party-respondent",
  otherNeedsInterpreter = "#interpreterNeeds_0_party-other",
  interpreterNeedsName = "#interpreterNeeds_0_name",
  interpreterNeedsLanguage = "#interpreterNeeds_0_language",
  interpreterNeedsAssistance = "#interpreterNeeds_0_otherAssistance",
  specialArrangements = "#specialArrangementsRequired",
  intermediaryReasons = "#reasonsForIntermediary",
  adjustmentsRequired = "#adjustmentsRequired",
}

interface AttendingTheHearing1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  attendingTheHearingYesNo: boolean;
  caseType: solicitorCaseCreateType;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface CheckErrorMessagingOptions {
  page: Page;
  caseType: solicitorCaseCreateType;
}

interface WelshNeedsFieldsOptions {
  page: Page;
  errorMessaging: boolean;
  caseType: solicitorCaseCreateType;
}

interface InterpreterNeedsFieldsOptions {
  page: Page;
  errorMessaging: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  errorMessaging: boolean;
  attendingTheHearingYesNo: boolean;
  caseType: solicitorCaseCreateType;
}

export class AttendingTheHearing1Page {
  public static async attendingTheHearing1Page({
    page,
    accessibilityTest,
    errorMessaging,
    attendingTheHearingYesNo,
    caseType,
  }: AttendingTheHearing1PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging({
        page,
        caseType,
      });
    }
    await this.fillInFields({
      page: page,
      errorMessaging: errorMessaging,
      attendingTheHearingYesNo: attendingTheHearingYesNo,
      caseType: caseType,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${AttendingTheHearing1Content.pageTitle}")`,
    );
    await Promise.all([
      await Helpers.checkGroup(
        page,
        5,
        AttendingTheHearing1Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AttendingTheHearing1Content.yes}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AttendingTheHearing1Content.no}")`,
        5,
      ),
      Helpers.checkGroup(
        page,
        5,
        AttendingTheHearing1Content,
        "p",
        `${Selectors.p}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkErrorMessaging({
    page,
    caseType,
  }: CheckErrorMessagingOptions): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${AttendingTheHearing1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${AttendingTheHearing1Content.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        AttendingTheHearing1Content,
        "inputValidationError",
        `${Selectors.GovukErrorValidation}`,
      ),
      Helpers.checkGroup(
        page,
        5,
        AttendingTheHearing1Content,
        "inputErrorMessage",
        `${Selectors.GovukErrorMessage}`,
      ),
    ]);
    await this.checkAdditionalErrorMessaging(page, caseType);
  }

  private static async checkAdditionalErrorMessaging(
    page: Page,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    const radioSections: string[] = [
      "welsh",
      "interpreter",
      "disability",
      "specialArrangements",
      "intermediaryNeeded",
    ];
    for (const section of radioSections) {
      const sectionKey = `${section}Yes` as keyof typeof inputIDs;
      await page.click(inputIDs[sectionKey]);
    }
    let welshNeedsSelector: keyof typeof uniqueSelectors;
    switch (caseType) {
      case "FL401":
        welshNeedsSelector = "fl401WelshNeeds";
        break;
      case "C100":
        welshNeedsSelector = "c100WelshNeeds";
        break;
      default:
        throw new Error(`Unrecognised solicitor case type: ${caseType}`);
    }
    await page.click(
      `${uniqueSelectors[welshNeedsSelector]}${Selectors.button}:text-is("${AttendingTheHearing1Content.addNew}")`,
    );
    await page.click(
      `${uniqueSelectors.interpreterNeeds}${Selectors.button}:text-is("${AttendingTheHearing1Content.addNew}")`,
    );
    await page.click(
      `${uniqueSelectors.interpreterNeeds}${Selectors.button}:text-is("${AttendingTheHearing1Content.addNew}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${AttendingTheHearing1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${AttendingTheHearing1Content.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        AttendingTheHearing1Content,
        "secondValidationError",
        `${Selectors.GovukErrorValidation}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        AttendingTheHearing1Content,
        "secondErrorMessage",
        `${Selectors.GovukErrorMessage}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AttendingTheHearing1Content.fieldIsRequiredValidation}")`,
        4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AttendingTheHearing1Content.fieldISRequiredMessage}")`,
        4,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    errorMessaging,
    attendingTheHearingYesNo,
    caseType,
  }: FillInFieldsOptions): Promise<void> {
    const keySuffix: string = attendingTheHearingYesNo ? "Yes" : "No";
    const radioSections: string[] = [
      "welsh",
      "interpreter",
      "disability",
      "specialArrangements",
      "intermediaryNeeded",
    ];
    for (const section of radioSections) {
      const sectionKey = `${section}${keySuffix}` as keyof typeof inputIDs;
      await page.click(inputIDs[sectionKey]);
    }
    let welshNeedsSelector: keyof typeof uniqueSelectors;
    switch (caseType) {
      case "FL401":
        welshNeedsSelector = "fl401WelshNeeds";
        break;
      case "C100":
        welshNeedsSelector = "c100WelshNeeds";
        break;
      default:
        throw new Error(`Unrecognised solicitor case type: ${caseType}`);
    }
    if (attendingTheHearingYesNo) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors[welshNeedsSelector]}${Selectors.h2}:text-is("${AttendingTheHearing1Content.welshHeading}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.interpreterNeeds}${Selectors.h2}:text-is("${AttendingTheHearing1Content.interpreterHeading}")`,
          1,
        ),
        Helpers.checkGroup(
          page,
          4,
          AttendingTheHearing1Content,
          "subP",
          `${Selectors.p}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${AttendingTheHearing1Content.intermediaryFormLabel}")`,
          1,
        ),
      ]);
      await this.welshNeedsFields({ page, errorMessaging, caseType });
      await this.interpreterNeedsFields({ page, errorMessaging });
      const textAreas = [
        "specialArrangements",
        "intermediaryReasons",
        "adjustmentsRequired",
      ];
      for (const text of textAreas) {
        const inputKey = text as keyof typeof inputIDs;
        const contentKey = text as keyof typeof AttendingTheHearing1Content;
        await page.fill(
          inputIDs[inputKey],
          AttendingTheHearing1Content[contentKey],
        );
      }
    }
    await page.click(
      `${Selectors.button}:text-is("${AttendingTheHearing1Content.continue}")`,
    );
  }

  private static async welshNeedsFields({
    page,
    errorMessaging,
    caseType,
  }: WelshNeedsFieldsOptions): Promise<void> {
    let welshNeedsSelector: keyof typeof uniqueSelectors;
    let welshNeedsFieldsSelector: keyof typeof uniqueSelectors;
    let whoNeedsWelshKey: keyof typeof inputIDs;
    let spokenWelshKey: keyof typeof inputIDs;
    let writtenWelshKey: keyof typeof inputIDs;
    let spokenAndWrittenKey: keyof typeof inputIDs | null;
    switch (caseType) {
      case "FL401":
        welshNeedsSelector = "fl401WelshNeeds";
        welshNeedsFieldsSelector = "fl401WelshNeedsFields";
        whoNeedsWelshKey = "fl401WhoNeedsWelsh";
        spokenWelshKey = "fl401SpokenWelsh";
        writtenWelshKey = "fl401WrittenWelsh";
        spokenAndWrittenKey = null;
        break;
      case "C100":
        welshNeedsSelector = "c100WelshNeeds";
        welshNeedsFieldsSelector = "c100WelshNeedsFields";
        whoNeedsWelshKey = "c100WhoNeedsWelsh";
        spokenWelshKey = "c100SpokenWelsh";
        writtenWelshKey = "c100WrittenWelsh";
        spokenAndWrittenKey = "c100SpokenAndWritten";
        break;
      default:
        throw new Error(`Unrecognised solicitor case type: ${caseType}`);
    }
    if (!errorMessaging) {
      await page.click(
        `${uniqueSelectors[welshNeedsSelector]}${Selectors.button}:text-is("${AttendingTheHearing1Content.addNew}")`,
      );
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${AttendingTheHearing1Content.welshNeedsSubHeading}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        AttendingTheHearing1Content,
        "welshLabel",
        `${uniqueSelectors[welshNeedsFieldsSelector]}${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AttendingTheHearing1Content.peopleInvolved}")`,
        1,
      ),
    ]);
    await page.fill(
      `${inputIDs[whoNeedsWelshKey]}`,
      `${AttendingTheHearing1Content.automatedTester}`,
    );
    await page.check(inputIDs[spokenWelshKey]);
    await page.check(inputIDs[writtenWelshKey]);
    if (spokenAndWrittenKey) {
      await page.check(inputIDs[spokenAndWrittenKey]);
    }
  }

  private static async interpreterNeedsFields({
    page,
    errorMessaging,
  }: InterpreterNeedsFieldsOptions): Promise<void> {
    if (!errorMessaging) {
      await page.click(
        `${uniqueSelectors.interpreterNeeds}${Selectors.button}:text-is("${AttendingTheHearing1Content.addNew}")`,
      );
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${AttendingTheHearing1Content.interpreterNeedsSubHeading}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        6,
        AttendingTheHearing1Content,
        "interpreterLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    const partyOptions: string[] = ["applicant", "respondent", "other"];
    for (const party of partyOptions) {
      const checkboxKey = `${party}NeedsInterpreter` as keyof typeof inputIDs;
      await page.check(inputIDs[checkboxKey]);
    }
    const interpreterSuffix: string[] = ["Name", "Language", "Assistance"];
    for (const suffix of interpreterSuffix) {
      const inputKey = `interpreterNeeds${suffix}` as keyof typeof inputIDs;
      const contentKey =
        `interpreterNeeds${suffix}` as keyof typeof AttendingTheHearing1Content;
      await page.fill(
        inputIDs[inputKey],
        AttendingTheHearing1Content[contentKey],
      );
    }
  }
}
