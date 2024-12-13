import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { ApplicantGender, yesNoDontKnow } from "../../../../../common/types";
import { RespondentDetailsPersonalDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/casePartyDetails/respondentDetailsPersonalDetailsContent";

enum InputIds {
  changeNameYes = "#hasNameChanged",
  changeNameNo = "#hasNameChanged-2",
  changeNameDontKnow = "#hasNameChanged-3",
  prevName = "#previousFullName",
  female = "#gender",
  male = "#gender-2",
  identifyOther = "#gender-3",
  otherGenderDetails = "#otherGenderDetails",
  dobDay = "#dateOfBirth-day",
  dobMonth = "#dateOfBirth-month",
  dobYear = "#dateOfBirth-year",
  dobUnknownCheck = "#isDateOfBirthUnknown",
  approxDobDay = "#approxDateOfBirth-day",
  approxDobMonth = "#approxDateOfBirth-month",
  approxDobYear = "#approxDateOfBirth-year",
  placeOfBirth = "#respondentPlaceOfBirth",
  unknownPlaceOfBirthCheck = "#respondentPlaceOfBirthUnknown",
}

enum uniqueSelectors {
  h21Selector = "#main-form > div:nth-child(2) > fieldset > legend",
  h22Selector = "#main-form > div:nth-child(3) > fieldset > legend",
  h23Selector = "#main-form > div:nth-child(4) > fieldset > legend",
  dobDaySelector = "#dateOfBirth > div:nth-child(1) > div > label",
  dobMonthSelector = "#dateOfBirth > div:nth-child(2) > div > label",
  dobYearSelector = "#dateOfBirth > div:nth-child(3) > div > label",
  dobUniqueSelector = "#dateOfBirth > div > div > ",
  approxDoBUniqueSelector = "#approxDateOfBirth > div > div > ",
  approxDobDaySelector = "#approxDateOfBirth > div:nth-child(1) > div > label",
  approxDobMonthSelector = "#approxdateOfBirth > div:nth-child(2) > div > label",
  approxDobYearSelector = "#approxdateOfBirth > div:nth-child(3) > div > label",
  approxDobLabelSelector = "#conditional-isDateOfBirthUnknown > div > fieldset > legend",
  errorMessageSelectorChangeName1 = " #main-content > div > div.govuk-grid-column-two-thirds > div > div > div > ul > li:nth-child(1) > a",
}

interface respondentDetailsPersonalDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  changeNameYesNoDontKnow: yesNoDontKnow;
  respondentGender: ApplicantGender;
  knownDob: boolean;
  knownPlaceOfBirth: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  changeNameYesNoDontKnow: yesNoDontKnow;
  respondentGender: ApplicantGender;
  knownDob: boolean;
  knownPlaceOfBirth: boolean;
}

export class RespondentDetailsPersonalDetailsPage {
  public static async respondentDetailsPersonalDetailsPage({
    page,
    accessibilityTest,
    errorMessaging,
    changeNameYesNoDontKnow,
    respondentGender,
    knownDob,
    knownPlaceOfBirth,
  }: respondentDetailsPersonalDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page,
      changeNameYesNoDontKnow,
      respondentGender: respondentGender,
      knownDob,
      knownPlaceOfBirth,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:has-text("${RespondentDetailsPersonalDetailsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        9,
        RespondentDetailsPersonalDetailsContent,
        "label",
        Selectors.GovukLabel,
      ),
      Helpers.checkGroup(
        page,
        2,
        RespondentDetailsPersonalDetailsContent,
        "hint",
        Selectors.GovukHint,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.h21Selector}:text-is("${RespondentDetailsPersonalDetailsContent.h21}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.h22Selector}:text-is("${RespondentDetailsPersonalDetailsContent.h22}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.h23Selector}:text-is("${RespondentDetailsPersonalDetailsContent.h23}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.dobUniqueSelector}${Selectors.GovukLabel}:text-is("${CommonStaticText.day}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.dobUniqueSelector}${Selectors.GovukLabel}:text-is("${CommonStaticText.month}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.dobUniqueSelector}${Selectors.GovukLabel}:text-is("${CommonStaticText.year}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page); Accessibility Issues: PRL-6587
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
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
        RespondentDetailsPersonalDetailsContent,
        "errorMessage",
        Selectors.GovukErrorMessageCitizen,
      ),
      Helpers.checkGroup(
        page,
        4,
        RespondentDetailsPersonalDetailsContent,
        "errorMessage",
        `${Selectors.GovukErrorList} ${Selectors.a}`,
      ),
    ]);
    //Trigger hidden error message
    await page.check(InputIds.dobUnknownCheck);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${RespondentDetailsPersonalDetailsContent.hiddenErrorMessage1}")`,
        1,
      ),
    ]);
    await page.uncheck(InputIds.dobUnknownCheck);
  }

  private static async fillInFields({
    page,
    changeNameYesNoDontKnow,
    respondentGender,
    knownDob,
    knownPlaceOfBirth,
  }: fillInFieldsOptions): Promise<void> {
    const [day, month, year] = Helpers.generateDOB(false);
    switch (changeNameYesNoDontKnow) {
      case "yes":
        await page.click(InputIds.changeNameYes);
        //check hidden content appears and fill in previous name
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukLabel}:text-is("${RespondentDetailsPersonalDetailsContent.hiddenlabel1}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukHint}:text-is("${RespondentDetailsPersonalDetailsContent.hiddenhint1}")`,
            1,
          ),
        ]);
        await page.fill(
          InputIds.prevName,
          RespondentDetailsPersonalDetailsContent.inputPrevName,
        );
        break;
      case "no":
        await page.click(InputIds.changeNameNo);
        break;
      case "dontKnow":
        await page.click(InputIds.changeNameDontKnow);
        break;
      default:
        throw new Error(
          `Unexpected value for changeName: ${changeNameYesNoDontKnow}`,
        );
    }
    switch (respondentGender) {
      case "female":
        await page.click(InputIds.female);
        break;
      case "male":
        await page.click(InputIds.male);
        break;
      case "other":
        await page.click(InputIds.identifyOther);
        //check hidden content appears and fill in details
        await page.waitForSelector(
          `${Selectors.GovukLabel}:text-is("${RespondentDetailsPersonalDetailsContent.hiddenlabel2}")`,
        );
        await page.fill(
          InputIds.otherGenderDetails,
          RespondentDetailsPersonalDetailsContent.inputIdentifyOther,
        );
        break;
      default:
        throw new Error(`Unexpected value for gender: ${respondentGender}`);
    }
    if (knownDob) {
      await page.fill(InputIds.dobDay, day);
      await page.fill(InputIds.dobMonth, month);
      await page.fill(InputIds.dobYear, year);
    } else {
      await page.check(InputIds.dobUnknownCheck);
      //check for hidden content to appear and fill approximate date of birth (dob)
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLegendS}:text-is("${RespondentDetailsPersonalDetailsContent.hiddenlabel3}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.approxDoBUniqueSelector}${Selectors.GovukLabel}:text-is("${CommonStaticText.day}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.approxDoBUniqueSelector}${Selectors.GovukLabel}:text-is("${CommonStaticText.month}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.approxDoBUniqueSelector}${Selectors.GovukLabel}:text-is("${CommonStaticText.year}")`,
          1,
        ),
      ]);
      await page.fill(InputIds.approxDobDay, day);
      await page.fill(InputIds.approxDobMonth, month);
      await page.fill(InputIds.approxDobYear, year);
    }
    if (knownPlaceOfBirth) {
      await page.fill(
        InputIds.placeOfBirth,
        RespondentDetailsPersonalDetailsContent.inputPlaceOfBirth,
      );
    } else {
      await page.check(InputIds.unknownPlaceOfBirthCheck);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
