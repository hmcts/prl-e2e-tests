import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { Selectors } from "../../../../../../common/selectors.ts";
import { ApplicantGender } from "../../../../../../common/types.ts";
import { ApplicantPersonalDetailsContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/applicant/applicantPersonalDetailsContent.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface applicantPersonalDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  changeNameYesNo: boolean;
  gender: ApplicantGender;
  under18: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  changeNameYesNo: boolean;
  gender: ApplicantGender;
  under18: boolean;
}

enum inputIds {
  changeNameYes = "#haveYouChangeName",
  changeNameNo = "#haveYouChangeName-2",
  prevName = "#applPreviousName",
  female = "#gender",
  male = "#gender-2",
  identifyOther = "#gender-3",
  day = "#dateOfBirth-day",
  month = "#dateOfBirth-month",
  year = "#dateOfBirth-year",
  placeOfBirth = "#applicantPlaceOfBirth",
}

export class ApplicantPersonalDetailsPage {
  public static async applicantPersonalDetailsPage({
    page,
    accessibilityTest,
    errorMessaging,
    changeNameYesNo,
    gender,
    under18,
  }: applicantPersonalDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page,
      changeNameYesNo,
      gender,
      under18,
    });
  }
  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:has-text("${ApplicantPersonalDetailsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        ApplicantPersonalDetailsContent,
        "legend",
        Selectors.GovukLegendM,
      ),
      Helpers.checkGroup(
        page,
        3,
        ApplicantPersonalDetailsContent,
        "hint",
        Selectors.GovukHint,
      ),
      Helpers.checkGroup(
        page,
        8,
        ApplicantPersonalDetailsContent,
        "label",
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabelM}:text-is("${ApplicantPersonalDetailsContent.legend4}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit({
        exclude: [
        inputIds.changeNameYes,
        inputIds.identifyOther,
      ]}); //false-positive (https://github.com/alphagov/govuk-frontend/issues/979, https://github.com/w3c/aria/issues/1404)
    }
  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await this.checkErrorSummary(page);
    await this.fillInvalidDateOfBirth(page);
  }
  private static async checkErrorSummary(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        ApplicantPersonalDetailsContent,
        "errorMessage",
        `${Selectors.GovukErrorList} ${Selectors.a}`,
      ),
      Helpers.checkGroup(
        page,
        4,
        ApplicantPersonalDetailsContent,
        "errorMessage",
        Selectors.GovukErrorMessageCitizen,
      ),
    ]);
  }
  private static async fillInvalidDateOfBirth(page: Page): Promise<void> {
    await page.fill(inputIds.day, ApplicantPersonalDetailsContent.invalidDob);
    await page.fill(inputIds.month, ApplicantPersonalDetailsContent.invalidDob);
    await page.fill(inputIds.year, ApplicantPersonalDetailsContent.invalidDob);
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
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ApplicantPersonalDetailsContent.dobErrorMessage1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${ApplicantPersonalDetailsContent.dobErrorMessage1}")`,
        1,
      ),
    ]);
  }
  private static async fillInFields({
    page,
    changeNameYesNo,
    gender,
    under18,
  }: fillInFieldsOptions): Promise<void> {
    const [day, month, year] = Helpers.generateDOB(under18);
    await page.click(
      changeNameYesNo ? inputIds.changeNameYes : inputIds.changeNameNo,
    );
    if (changeNameYesNo) {
      await page.fill(
        inputIds.prevName,
        ApplicantPersonalDetailsContent.prevNameText,
      );
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
    await page.fill(inputIds.day, day);
    await page.fill(inputIds.month, month);
    await page.fill(inputIds.year, year);

    await page.fill(
      inputIds.placeOfBirth,
      ApplicantPersonalDetailsContent.placeOfBirthText,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
