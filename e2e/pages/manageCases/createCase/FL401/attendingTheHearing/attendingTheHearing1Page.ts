import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import {
  AttendingTheHearing1Content
} from "../../../../../fixtures/manageCases/createCase/FL401/attendingTheHearing/attendingTheHearing1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

enum uniqueSelectors {
  welshNeeds = 'div#fl401WelshNeeds > div > ',
  interpreterNeeds = 'div#interpreterNeeds > div > '
}

enum inputIDs {
  welshYes = '#isWelshNeeded_Yes',
  welshNo = '#isWelshNeeded_No',
  interpreterYes = '#isWelshNeeded_Yes',
  interpreterNo = '#isWelshNeeded_No',
  disabilityYes = '#isDisabilityPresent_Yes',
  disabilityNo = '#isDisabilityPresent_No',
  specialArrangementsYes = '#isSpecialArrangementsRequired_Yes',
  specialArrangementsNo = '#isSpecialArrangementsRequired_No',
  intermediaryNeededYes = '#isIntermediaryNeeded_Yes',
  intermediaryNeededNo = '#isIntermediaryNeeded_No',
  whoNeedsWelsh = '#fl401WelshNeeds_0_whoNeedsWelsh',
  spokenWelsh = '#fl401WelshNeeds_0_fl401SpokenOrWritten-spoken',
  writtenWelsh = '#fl401WelshNeeds_0_fl401SpokenOrWritten-written',
  applicantNeedsInterpreter = '#interpreterNeeds_0_party-applicant',
  respondentNeedsInterpreter = '#interpreterNeeds_0_party-respondent',
  otherNeedsInterpreter = '#interpreterNeeds_0_party-other',
  interpreterNeedsName = '#interpreterNeeds_0_name',
  interpreterNeedsLanguage = '#interpreterNeeds_0_language',
  interpreterNeedsAssistance = '#interpreterNeeds_0_otherAssistance',
  specialArrangements = '#specialArrangementsRequired',
  intermediaryReasons = '#reasonsForIntermediary',
}

interface AttendingTheHearing1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  fl401AttendingTheHearingYesNo: boolean
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface FillInFieldsOptions {
  page: Page,
  fl401AttendingTheHearingYesNo: boolean
}

export class AttendingTheHearing1Page {
  public static async attendingTheHearing1Page({
    page,
    accessibilityTest,
    errorMessaging,
    fl401AttendingTheHearingYesNo
  }: AttendingTheHearing1PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    })
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page,
      fl401AttendingTheHearingYesNo
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${AttendingTheHearing1Content.pageTitle}")`
    );
    await Promise.all(
      [
        await Helpers.checkGroup(
          page,
          5,
          AttendingTheHearing1Content,
          'formLabel',
          `${Selectors.GovukFormLabel}`
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${AttendingTheHearing1Content.yes}")`,
          5
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${AttendingTheHearing1Content.no}")`,
          5
        ),
        Helpers.checkGroup(
          page,
          5,
          AttendingTheHearing1Content,
          'p',
          `${Selectors.p}`
        ),
      ]
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page)
    }
  }

  private static async checkErrorMessaging(
    page: Page
  ): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${AttendingTheHearing1Content.continue}")`
    );
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorSummaryTitle}:text-is("${AttendingTheHearing1Content.errorSummaryTitle}")`,
          1
        ),
        Helpers.checkGroup(
          page,
          5,
          AttendingTheHearing1Content,
          'inputValidationError',
          `${Selectors.GovukErrorValidation}`
        ),
        Helpers.checkGroup(
          page,
          5,
          AttendingTheHearing1Content,
          'inputErrorMessage',
          `${Selectors.GovukErrorMessage}`
        ),
      ]
    );
    await this.checkAdditionalErrorMessaging(page)
  }

  private static async checkAdditionalErrorMessaging(
    page: Page
  ): Promise<void> {
    const radioSections: string[] = [
      'welsh',
      'interpreter',
      'disabled',
      'specialArrangements',
      'intermediaryNeeded'
    ];
    for (let section of radioSections) {
      let sectionKey = `${section}Yes` as keyof typeof inputIDs;
      await page.click(
        inputIDs[sectionKey]
      );
    }
    await page.click(
      `${Selectors.button}:text-is("${AttendingTheHearing1Content.continue}")`
    );
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorSummaryTitle}:text-is("${AttendingTheHearing1Content.errorSummaryTitle}")`,
          1
        ),
        Helpers.checkGroup(
          page,
          3,
          AttendingTheHearing1Content,
          'secondValidationError',
          `${Selectors.GovukErrorValidation}`
        ),
        Helpers.checkGroup(
          page,
          3,
          AttendingTheHearing1Content,
          'secondErrorMessage',
          `${Selectors.GovukErrorMessage}`
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorValidation}:text-is("${AttendingTheHearing1Content.fieldIsRequiredValidation}")`,
          4
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorMessage}:text-is("${AttendingTheHearing1Content.fieldISRequiredMessage}")`,
          4
        ),
      ]
    )
  }

  private static async fillInFields({
    page,
    fl401AttendingTheHearingYesNo
  }: FillInFieldsOptions): Promise<void> {
    const keySuffix: string = (fl401AttendingTheHearingYesNo) ? 'Yes' : 'No';
    const radioSections: string[] = [
      'welsh',
      'interpreter',
      'disabled',
      'specialArrangements',
      'intermediaryNeeded'
    ];
    for (let section of radioSections) {
      let sectionKey = `${section}${keySuffix}` as keyof typeof inputIDs;
      await page.click(
        inputIDs[sectionKey]
      );
    }
    if (fl401AttendingTheHearingYesNo) {
      await Promise.all(
        [
          Helpers.checkGroup(
            page,
            2,
            AttendingTheHearing1Content,
            'sectionHeading',
            `${Selectors.h2}`
          ),
          Helpers.checkGroup(
            page,
            4,
            AttendingTheHearing1Content,
            'subP',
            `${Selectors.p}`
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}:text-is("${AttendingTheHearing1Content.intermediaryFormLabel}")`,
            1
          )
        ]
      );
      await this.welshNeedsFields(page);
      await this.interpreterNeedsFields(page);
      const textAreas = ['specialArrangements', 'intermediaryReasons'];
      for (let text of textAreas) {
        let inputKey = text as keyof typeof inputIDs;
        let contentKey = text as keyof typeof AttendingTheHearing1Content
        await page.fill(
          inputIDs[inputKey],
          AttendingTheHearing1Content[contentKey]
        );
      }
    }
    await page.click(
      `${Selectors.button}:text-is("${AttendingTheHearing1Content.continue}")`
    )
  }

  private static async welshNeedsFields(
    page: Page
  ): Promise<void> {
    await page.click(
      `${uniqueSelectors.welshNeeds}${Selectors.button}:text-is("${AttendingTheHearing1Content.addNew}")`
    );
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h3}:text-is("${AttendingTheHearing1Content.welshNeedsSubHeading}")`,
          1
        ),
        Helpers.checkGroup(
          page,
          3,
          AttendingTheHearing1Content,
          'welshLabel',
          `${Selectors.GovukFormLabel}`
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h2}:text-is("${AttendingTheHearing1Content.newWelshNeed}")`,
          1
        )
      ]
    );
    await page.fill(
      `${inputIDs.whoNeedsWelsh}`,
      `${AttendingTheHearing1Content.automatedTester}`
    );
    await page.check(
      inputIDs.spokenWelsh
    );
    await page.check(
      inputIDs.writtenWelsh
    );
  }

  private static async interpreterNeedsFields(
    page: Page
  ): Promise<void> {
    await page.click(
      `${uniqueSelectors.interpreterNeeds}${Selectors.button}:text-is("${AttendingTheHearing1Content.addNew}")`
    );
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h3}:text-is("${AttendingTheHearing1Content.interpreterNeedsSubHeading}")`,
          1
        ),
        Helpers.checkGroup(
          page,
          6,
          AttendingTheHearing1Content,
          'interpreterLabel',
          `${Selectors.GovukFormLabel}`
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h2}:text-is("${AttendingTheHearing1Content.newInterpreterNeed}")`,
          1
        )
      ]
    );
    const partyOptions: string[] = ['applicant', 'respondent', 'other']
    for (let party of partyOptions) {
      let checkboxKey = `${party}NeedsInterpreter` as keyof typeof inputIDs;
      await page.check(
        inputIDs[checkboxKey]
      );
    }
    const interpreterSuffix: string[] = ['Name', 'Language', 'Assistance']
    for (let suffix of interpreterSuffix) {
      let inputKey = `interpreterNeeds${suffix}` as keyof typeof inputIDs;
      let contentKey = `interpreterNeeds${suffix}` as keyof typeof AttendingTheHearing1Content;
      await page.fill(
        inputIDs[inputKey],
        AttendingTheHearing1Content[contentKey]
      );
    }
  }
}