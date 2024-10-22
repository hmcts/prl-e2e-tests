import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { PersonalDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/casePartyDetails/personalDetailsContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ApplicantGender } from "../../../../../common/types";


interface personalDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
}

enum uniqueSelectors {
  legendSelector1 = '#govuk-fieldset__legend govuk-fieldset__legend--m',
  legendSelector2 = '#govuk-label govuk-label--m',
}

enum inputIds {
  prevName = '#applPreviousName',
  female = '#gender',
  male = '#gender-2',
  identifyOther = '#gender-3',
  day = '#dateOfBirth-day',
  month = '#dateOfBirth-month',
  year = '#dateOfBirth-year',
  placeOfBirth = '#applicantPlaceOfBirth',
}



export class PersonalDetailsPage {
  public static async personalDetailsPage({
                                        page: page,
                                        accessibilityTest: accessibilityTest,
                                        errorMessaging: errorMessaging,
                                      }: personalDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
                                        page: page,
                                        accessibilityTest: accessibilityTest,
                                      }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-has("${PersonalDetailsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        PersonalDetailsContent,
        "legend",
        `${uniqueSelectors.legendSelector1}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        PersonalDetailsContent,
        "hint",
        `${Selectors.GovukHint}`,
      ),
      Helpers.checkGroup(
        page,
        8,
        PersonalDetailsContent,
        "label",
        `${Selectors.GovukHint}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.legendSelector2}:text-is("${PersonalDetailsContent.legend4}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        PersonalDetailsContent,
        "errorSummaryList",
        `${Selectors.ErrorSummaryList}`,
      ),
      Helpers.checkGroup(
        page,
        4,
        PersonalDetailsContent,
        "errorMessage",
        `${Selectors.GovukErrorMessage}`,
      ),
    ]);

  private static async fillInFields({
      page: page,

    }: fillInFieldsOptions): Promise<void> {

      const [day, month, year] = Helpers.generateDOB(false); //over 21 date of birth

    await Promise.all([
        page.fill(`${inputIds.day}`, day),
        page.fill(`${inputIds.month}`, month),
        page.fill(`${inputIds.year}`, year),
      ]);

    }
  }