import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ApplicantPersonalDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/casePartyDetails/applicantPersonalDetailsContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ApplicantGender } from "../../../../../common/types";

interface personalDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  changeName: boolean;
  gender: ApplicantGender;
  under18: boolean;
  placeOfBirth: string;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  changeName: boolean;
  gender: ApplicantGender;
  under18: boolean;
  placeOfBirth: string;
}

enum uniqueSelectors {
  legendSelector1 = '#govuk-fieldset__legend govuk-fieldset__legend--m',
  legendSelector2 = '#govuk-label govuk-label--m',
}

enum inputIds {
  changeNameYes = '#haveYouChangeName',
  changeNameNo = '#haveYouChangeName-2',
  prevName = '#applPreviousName',
  female = '#gender',
  male = '#gender-2',
  identifyOther = '#gender-3',
  day = '#dateOfBirth-day',
  month = '#dateOfBirth-month',
  year = '#dateOfBirth-year',
  placeOfBirth = '#applicantPlaceOfBirth',
}

export class ApplicantPersonalDetailsPage {
  public static async applicantPersonalDetailsPage({
                                            page,
                                            accessibilityTest,
                                            errorMessaging,
                                            changeName,
                                            gender,
                                            under18,
                                            placeOfBirth,
                                          }: personalDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page,
      changeName,
      gender,
      under18,
      placeOfBirth
    });
  }

  private static async checkPageLoads({
                                        page,
                                        accessibilityTest,
                                      }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-has("${ApplicantPersonalDetailsContent.pageTitle}")`
    );

    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        ApplicantPersonalDetailsContent,
        "legend",
        uniqueSelectors.legendSelector1
      ),
      Helpers.checkGroup(
        page,
        3,
        ApplicantPersonalDetailsContent,
        "hint",
        Selectors.GovukHint
      ),
      Helpers.checkGroup(
        page,
        8,
        ApplicantPersonalDetailsContent,
        "label",
        Selectors.GovukHint
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.legendSelector2}:text-is("${ApplicantPersonalDetailsContent.legend4}")`,
        1
      ),
    ]);

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`
    );

    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1
      ),
      Helpers.checkGroup(
        page,
        4,
        ApplicantPersonalDetailsContent,
        "errorMessage",
        Selectors.ErrorSummaryList
      ),
      Helpers.checkGroup(
        page,
        4,
        ApplicantPersonalDetailsContent,
        "errorMessage",
        Selectors.GovukErrorMessage
      ),
    ]);
  }

  private static async fillInFields({
                                      page,
                                      changeName,
                                      gender,
                                      under18,
                                    }: fillInFieldsOptions): Promise<void> {
    const [day, month, year] = Helpers.generateDOB(under18);

    await page.click(changeName ? inputIds.changeNameYes : inputIds.changeNameNo);

    if (changeName) {
      await page.fill(inputIds.prevName, ApplicantPersonalDetailsContent.prevNameText);
    }

    switch (gender) {
      case "male":
        await page.click(inputIds.male);
        break;
      case "female":
        await page.click(inputIds.female);
        break;
      case "other":
        await page.click(inputIds.identifyOther);
        break;
      default:
        throw new Error(`Unexpected value for gender: ${gender}`);
    }
    await Promise.all([
      page.fill(inputIds.day, day),
      page.fill(inputIds.month, month),
      page.fill(inputIds.year, year),
    ]);

    await page.fill(inputIds.placeOfBirth, ApplicantPersonalDetailsContent.placeOfBirthText);

    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
  }
}
