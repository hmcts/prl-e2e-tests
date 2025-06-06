import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { OtherChildNotInTheCase1Content } from "../../../../../fixtures/manageCases/createCase/C100/otherChildrenNotInTheCase/otherChildNotInTheCase1Content.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface C100OtherChildNotInTheCase1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  otherChildPresent: boolean;
  otherChildGender: C100OtherChildGender;
  otherChildDOBKnown: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface ChildPresentOptions {
  page: Page;
  otherChildPresent: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  otherChildGender: C100OtherChildGender;
  otherChildDOBKnown: boolean;
}

enum uniqueSelectors {
  otherChildPresentYes = "#childrenNotPartInTheCaseYesNo_Yes",
  otherChildPresentNo = "#childrenNotPartInTheCaseYesNo_No",
  childFirstNameField = "#childrenNotInTheCase_0_firstName",
  childLastNameField = "#childrenNotInTheCase_0_lastName",
  childGenderDropdown = "#childrenNotInTheCase_0_gender",
  childGenderOtherField = "#childrenNotInTheCase_0_otherGender",
  childDOBYesRadio = "#childrenNotInTheCase_0_isDateOfBirthKnown_Yes",
  childDOBNoRadio = "#childrenNotInTheCase_0_isDateOfBirthKnown_No",
  childDOBDayField = "#dateOfBirth-day",
  childDOBMonthField = "#dateOfBirth-month",
  childDOBYearField = "#dateOfBirth-year",
}

export type C100OtherChildGender =
  | "Female"
  | "Male"
  | "They identify in another way";

export class OtherChildNotInTheCase1Page {
  public static async otherChildNotInTheCase1Page({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    otherChildPresent: otherChildPresent,
    otherChildGender: otherChildGender,
    otherChildDOBKnown: otherChildDOBKnown,
  }: C100OtherChildNotInTheCase1PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.handleChildPresence({ page, otherChildPresent });
    if (otherChildPresent) {
      if (errorMessaging) {
        await this.triggerErrorMessages(page);
      }
      await this.fillInFields({
        page: page,
        otherChildGender: otherChildGender,
        otherChildDOBKnown: otherChildDOBKnown,
      });
    }
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${OtherChildNotInTheCase1Content.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        OtherChildNotInTheCase1Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async handleChildPresence({
    page: page,
    otherChildPresent: otherChildPresent,
  }: ChildPresentOptions): Promise<void> {
    if (otherChildPresent) {
      await page.click(`${uniqueSelectors.otherChildPresentYes}`);
      await page.click(
        `${Selectors.button}:text-is("${OtherChildNotInTheCase1Content.buttonAddNew}")`,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${OtherChildNotInTheCase1Content.h2}")`,
        1,
      );
    } else {
      await page.click(`${uniqueSelectors.otherChildPresentNo}`);
      await page.click(
        `${Selectors.button}:text-is("${OtherChildNotInTheCase1Content.buttonContinue}")`,
      );
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${OtherChildNotInTheCase1Content.buttonContinue}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${OtherChildNotInTheCase1Content.buttonContinue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${OtherChildNotInTheCase1Content.errorMessageSummary}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${OtherChildNotInTheCase1Content.errorMessageFirstName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${OtherChildNotInTheCase1Content.errorMessageFirstName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${OtherChildNotInTheCase1Content.errorMessageLastName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${OtherChildNotInTheCase1Content.errorMessageLastName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${OtherChildNotInTheCase1Content.errorMessageGender}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${OtherChildNotInTheCase1Content.errorMessageGender}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${OtherChildNotInTheCase1Content.errorMessageDOB}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${OtherChildNotInTheCase1Content.errorMessageDOB}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    otherChildGender: otherChildGender,
    otherChildDOBKnown: otherChildDOBKnown,
  }: FillInFieldsOptions): Promise<void> {
    await page.fill(
      `${uniqueSelectors.childFirstNameField}`,
      OtherChildNotInTheCase1Content.otherChildFirstName,
    );
    await page.fill(
      `${uniqueSelectors.childLastNameField}`,
      OtherChildNotInTheCase1Content.otherChildLastName,
    );
    switch (otherChildGender) {
      case "Female":
        await page.selectOption(
          `${uniqueSelectors.childGenderDropdown}`,
          OtherChildNotInTheCase1Content.genderOptionFemale,
        );
        break;
      case "Male":
        await page.selectOption(
          `${uniqueSelectors.childGenderDropdown}`,
          OtherChildNotInTheCase1Content.genderOptionMale,
        );
        break;
      default:
        await page.selectOption(
          `${uniqueSelectors.childGenderDropdown}`,
          OtherChildNotInTheCase1Content.genderOptionOther,
        );
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${OtherChildNotInTheCase1Content.formLabelOtherChildGender}")`,
          1,
        );
        await page.fill(
          `${uniqueSelectors.childGenderOtherField}`,
          OtherChildNotInTheCase1Content.genderOptionOtherValue,
        );
        break;
    }
    if (otherChildDOBKnown) {
      await this.handleDOBYes(page);
    } else {
      await page.click(`${uniqueSelectors.childDOBNoRadio}`);
      await page.click(`${uniqueSelectors.childDOBNoRadio}`);
    }
    await page.click(
      `${Selectors.button}:text-is("${OtherChildNotInTheCase1Content.buttonContinue}")`,
    );
    await new Promise((resolve) => setTimeout(resolve, 5000));
    if (page.url().includes("otherChildNotInTheCase1")) {
      await page.click(
        `${Selectors.button}:text-is("${OtherChildNotInTheCase1Content.buttonContinue}")`,
      );
    }
  }

  private static async handleDOBYes(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.childDOBYesRadio}`);
    await page.click(`${uniqueSelectors.childDOBYesRadio}`);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${OtherChildNotInTheCase1Content.formLabelDateOfBirthTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${OtherChildNotInTheCase1Content.formHintDateOfBirth}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${OtherChildNotInTheCase1Content.formLabelDateOfBirthDay}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${OtherChildNotInTheCase1Content.formLabelDateOfBirthMonth}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${OtherChildNotInTheCase1Content.formLabelDateOfBirthYear}")`,
        1,
      ),
    ]);
    await page.fill(
      `${uniqueSelectors.childDOBDayField}`,
      OtherChildNotInTheCase1Content.dateOfBirthDayValue,
    );
    await page.fill(
      `${uniqueSelectors.childDOBMonthField}`,
      OtherChildNotInTheCase1Content.dateOfBirthMonthValue,
    );
    await page.fill(
      `${uniqueSelectors.childDOBYearField}`,
      OtherChildNotInTheCase1Content.dateOfBirthYearValue,
    );
  }
}
