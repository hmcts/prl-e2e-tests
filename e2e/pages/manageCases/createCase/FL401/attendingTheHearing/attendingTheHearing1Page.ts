import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import {
  AttendingTheHearing1Content
} from "../../../../../fixtures/manageCases/createCase/FL401/attendingTheHearing/attendingTheHearing1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

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
  intermediaryNeededNo = '#isIntermediaryNeeded_No'
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
  }
}