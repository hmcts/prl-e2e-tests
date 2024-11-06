import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ApplicantContactPreferenceContent } from "../../../../../fixtures/citizen/createCase/C100/casePartyDetails/applicantContactPreferenceContent";
enum inputIds {
  digitalPreference = "#applicantContactPreferences",
  postPreference = "#applicantContactPreferences-2",
}

enum uniqueSelectors {
  listSelector1 = "ul[class='govuk-list govuk-list--bullet'] li:nth-child(1)",
  listSelector2 = "ul[class='govuk-list govuk-list--bullet'] li:nth-child(2)",
  listSelector3 = "main[id='main-content'] li:nth-child(3)",
  legendSelector = ".govuk-fieldset__legend.govuk-fieldset__legend--m",
  errorSelector = ".govuk-error-summary__body",
}

interface applicantContactPreferenceOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  digitalPreference: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  digitalPreference: boolean;
}

export class ApplicantContactPreferencePage {
  public static async applicantContactPreferencePage({
    page,
    accessibilityTest,
    errorMessaging,
    digitalPreference,
  }: applicantContactPreferenceOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page,
      digitalPreference,
    });
  }
  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:has-text("${ApplicantContactPreferenceContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        ApplicantContactPreferenceContent,
        "body",
        Selectors.GovukBody,
      ),
      Helpers.checkGroup(
        page,
        3,
        ApplicantContactPreferenceContent,
        "hint",
        Selectors.GovukHint,
      ),
      Helpers.checkGroup(
        page,
        2,
        ApplicantContactPreferenceContent,
        "label",
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.listSelector1}:text-is("${ApplicantContactPreferenceContent.li1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.listSelector2}:text-is("${ApplicantContactPreferenceContent.li2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.listSelector3}:text-is("${ApplicantContactPreferenceContent.li3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.legendSelector}:text-is("${ApplicantContactPreferenceContent.legend}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page); PRL-6591 Axe Issues
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
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${ApplicantContactPreferenceContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ApplicantContactPreferenceContent.errorMessage}")`,
        1,
      ),
    ]);
  }
  private static async fillInFields({
    page,
    digitalPreference,
  }: fillInFieldsOptions): Promise<void> {
    if (digitalPreference) {
      await page.click(inputIds.digitalPreference);
    } else {
      await page.click(inputIds.postPreference);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
