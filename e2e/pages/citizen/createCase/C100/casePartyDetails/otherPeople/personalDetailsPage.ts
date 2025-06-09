import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { Selectors } from "../../../../../../common/selectors.ts";
import {
  ApplicantGender,
  yesNoDontKnow,
} from "../../../../../../common/types.ts";
import { PersonalDetailsContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/otherPeople/personalDetailsContent.ts";
import { AxeUtils } from "@hmcts/playwright-common";

enum inputIDs {
  yesNameChanged = "#hasNameChanged",
  noNameChanged = "#hasNameChanged-2",
  dontKnowNameChanged = "#hasNameChanged-3",
  male = "#gender",
  female = "#gender-2",
  other = "#gender-3",
  previousNameInput = "#previousFullName",
  otherGenderInput = "#otherGenderDetails",
  dobDay = "#dateOfBirth-day",
  dobMonth = "#dateOfBirth-month",
  dobYear = "#dateOfBirth-year",
  unknownDoB = "#isDateOfBirthUnknown",
  approxDoBDay = "#approxDateOfBirth-day",
  approxDoBMonth = "#approxDateOfBirth-month",
  approxDoBYear = "#approxDateOfBirth-year",
}

enum invalidTextInputs {
  invalidName = "123456789",
}

const invalidDateInputs = {
  noDay: ["", "1", "1990"],
  noMonth: ["1", "", "1990"],
  noYear: ["1", "5", ""],
  invalidDate: ["%", "13", "."],
};

enum uniqueSelectors {
  dateOfBirth = "#dateOfBirth > div > div > ",
  approxDateOfBirth = "#approxDateOfBirth > div > div > ",
}

interface PersonalDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100OtherPeopleGender: ApplicantGender;
  c100OtherPeopleChangedName: yesNoDontKnow;
  c100OtherPeopleDoBKnown: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100OtherPeopleGender: ApplicantGender;
  c100OtherPeopleChangedName: yesNoDontKnow;
  c100OtherPeopleDoBKnown: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class PersonalDetailsPage {
  public static async personalDetailsPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100OtherPeopleChangedName,
    c100OtherPeopleGender,
    c100OtherPeopleDoBKnown,
  }: PersonalDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page: page,
      c100OtherPeopleChangedName: c100OtherPeopleChangedName,
      c100OtherPeopleGender: c100OtherPeopleGender,
      c100OtherPeopleDoBKnown: c100OtherPeopleDoBKnown,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:has-text("${PersonalDetailsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        PersonalDetailsContent,
        "legend",
        Selectors.GovukLegendL,
      ),
      Helpers.checkGroup(
        page,
        4,
        PersonalDetailsContent,
        "formLabel",
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.yes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.no}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.dontKnow}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.dateOfBirth}${Selectors.GovukLabel}:text-is("${CommonStaticText.day}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.dateOfBirth}${Selectors.GovukLabel}:text-is("${CommonStaticText.month}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.dateOfBirth}${Selectors.GovukLabel}:text-is("${CommonStaticText.year}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit({
        exclude: [inputIDs.yesNameChanged, inputIDs.other],
      }); //false-positive (https://github.com/alphagov/govuk-frontend/issues/979, https://github.com/w3c/aria/issues/1404)
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await this.checkNoInputErrors(page);
    await this.checkPreviousNameErrors(page);
    await this.checkDateErrors(page);
    await this.checkApproxDateErrors(page);
    await page.uncheck(inputIDs.unknownDoB);
  }

  private static async checkNoInputErrors(page: Page): Promise<void> {
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
        3,
        PersonalDetailsContent,
        "errorSummaryList",
        `${Selectors.GovukErrorList} ${Selectors.a}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        PersonalDetailsContent,
        "errorMessage",
        `${Selectors.GovukErrorMessageCitizen}`,
      ),
    ]);
  }

  private static async checkPreviousNameErrors(page: Page): Promise<void> {
    await page.click(inputIDs.yesNameChanged);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${PersonalDetailsContent.previousNameErrorList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${PersonalDetailsContent.previousNameErrorMessage}")`,
        1,
      ),
    ]);
    await page.fill(inputIDs.previousNameInput, invalidTextInputs.invalidName);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${PersonalDetailsContent.invalidNameErrorList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${PersonalDetailsContent.invalidNameErrorMessage}")`,
        1,
      ),
    ]);
  }

  private static async checkDateErrors(page: Page): Promise<void> {
    for (const [dateKey, [day, month, year]] of Object.entries(
      invalidDateInputs,
    )) {
      await page.fill(inputIDs.dobDay, day);
      await page.fill(inputIDs.dobMonth, month);
      await page.fill(inputIDs.dobYear, year);
      await page.click(
        `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
      );
      const errorListKey =
        `${dateKey}ErrorList` as keyof typeof PersonalDetailsContent;
      const errorMessageKey =
        `${dateKey}ErrorMessage` as keyof typeof PersonalDetailsContent;
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${PersonalDetailsContent[errorListKey]}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorMessageCitizen}:text-is("${PersonalDetailsContent[errorMessageKey]}")`,
          1,
        ),
      ]);
    }
    await page.fill(inputIDs.dobDay, "");
    await page.fill(inputIDs.dobMonth, "");
    await page.fill(inputIDs.dobYear, "");
  }

  private static async checkApproxDateErrors(page: Page): Promise<void> {
    await page.check(inputIDs.unknownDoB);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${PersonalDetailsContent.approxDateErrorList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${PersonalDetailsContent.approxDateErrorMessage}")`,
        1,
      ),
    ]);
    for (const [dateKey, [day, month, year]] of Object.entries(
      invalidDateInputs,
    )) {
      await page.fill(inputIDs.approxDoBDay, day);
      await page.fill(inputIDs.approxDoBMonth, month);
      await page.fill(inputIDs.approxDoBYear, year);
      await page.click(
        `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
      );
      const errorListKey =
        `${dateKey}ApproxErrorList` as keyof typeof PersonalDetailsContent;
      const errorMessageKey =
        `${dateKey}ApproxErrorMessage` as keyof typeof PersonalDetailsContent;
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${PersonalDetailsContent[errorListKey]}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorMessageCitizen}:text-is("${PersonalDetailsContent[errorMessageKey]}")`,
          1,
        ),
      ]);
    }
    await page.fill(inputIDs.approxDoBDay, "");
    await page.fill(inputIDs.approxDoBMonth, "");
    await page.fill(inputIDs.approxDoBYear, "");
  }

  private static async fillInFields({
    page,
    c100OtherPeopleChangedName,
    c100OtherPeopleGender,
    c100OtherPeopleDoBKnown,
  }: FillInFieldsOptions): Promise<void> {
    const prevNameRadioKey =
      `${c100OtherPeopleChangedName}NameChanged` as keyof typeof inputIDs;
    await page.click(inputIDs[prevNameRadioKey]);
    if (c100OtherPeopleChangedName === "yes") {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLabel}:text-is("${PersonalDetailsContent.previousNameLabel}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukHint}:text-is("${PersonalDetailsContent.previousNameHint}")`,
          1,
        ),
      ]);
      await page.fill(
        inputIDs.previousNameInput,
        PersonalDetailsContent.previousNameInput,
      );
    }
    const genderRadioKey = c100OtherPeopleGender as keyof typeof inputIDs;
    await page.click(inputIDs[genderRadioKey]);
    if (c100OtherPeopleGender === "other") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${PersonalDetailsContent.otherGenderLabel}")`,
        1,
      );
      await page.fill(
        inputIDs.otherGenderInput,
        PersonalDetailsContent.otherGenderInput,
      );
    }
    if (c100OtherPeopleDoBKnown) {
      for (const key of ["dobDay", "dobMonth", "dobYear"]) {
        const contentKey = key as keyof typeof PersonalDetailsContent;
        const inputKey = key as keyof typeof inputIDs;
        await page.fill(inputIDs[inputKey], PersonalDetailsContent[contentKey]);
      }
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLegendS}:text-is("${PersonalDetailsContent.legendS}")`,
        1,
      );
      for (const key of ["approxDoBDay", "approxDoBMonth", "approxDoBYear"]) {
        const contentKey = key as keyof typeof PersonalDetailsContent;
        const inputKey = key as keyof typeof inputIDs;
        await page.fill(inputIDs[inputKey], PersonalDetailsContent[contentKey]);
      }
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
