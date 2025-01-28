import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper.ts";
import { Selectors } from "../../../../../../common/selectors.ts";
import { RespondentDetailsContactDetailsContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/respondent/respondentDetailsContactDetailsContent.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";

interface RespondentDetailsContactDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  dontKnowEmailAndTelephone: boolean;
}

enum UniqueSelectors {
  emailInput = "#emailAddress",
  telephoneInput = "#telephoneNumber",
  iDontKnowEmail = "#donKnowEmailAddress",
  iDontKnowTelephone = "#donKnowTelephoneNumber",
}

export class RespondentDetailsContactDetailsPage {
  public static async respondentDetailsContactDetailsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    dontKnowEmailAndTelephone: dontKNowEmailAndTelephone,
  }: RespondentDetailsContactDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page });
    }
    await this.fillInFields({
      page,
      dontKnowEmailAndTelephone: dontKNowEmailAndTelephone,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<RespondentDetailsContactDetailsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error(
        "Page object is undefined. Ensure that a valid Playwright Page instance is passed to the function.",
      );
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:has-text("${RespondentDetailsContactDetailsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${RespondentDetailsContactDetailsContent.govukInsetText}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        RespondentDetailsContactDetailsContent,
        "govukLabel",
        Selectors.GovukLabel,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<RespondentDetailsContactDetailsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error(
        "Page object is undefined. Ensure that a valid Playwright Page instance is passed to the function.",
      );
    }
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
        `${Selectors.a}:text-is("${RespondentDetailsContactDetailsContent.errorMessageEmailAddress}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${RespondentDetailsContactDetailsContent.errorMessageEmailAddress}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${RespondentDetailsContactDetailsContent.errorMessageTelephoneNumber}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${RespondentDetailsContactDetailsContent.errorMessageTelephoneNumber}")`,
        1,
      ),
    ]);
    await page.fill(
      UniqueSelectors.emailInput,
      RespondentDetailsContactDetailsContent.invalidEmail,
    );
    await page.fill(
      UniqueSelectors.telephoneInput,
      RespondentDetailsContactDetailsContent.invalidTelephone,
    );
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
        `${Selectors.a}:text-is("${RespondentDetailsContactDetailsContent.errorMessageEmailAddress}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${RespondentDetailsContactDetailsContent.errorMessageEmailAddress}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${RespondentDetailsContactDetailsContent.errorInvalidTelephoneNumber}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${RespondentDetailsContactDetailsContent.errorInvalidTelephoneNumber}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    dontKnowEmailAndTelephone: knowsTheEmailAndTelephone,
  }: Partial<RespondentDetailsContactDetailsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error(
        "Page object is undefined. Ensure that a valid Playwright Page instance is passed to the function.",
      );
    }
    if (knowsTheEmailAndTelephone) {
      await page.fill(
        UniqueSelectors.emailInput,
        RespondentDetailsContactDetailsContent.email,
      );
      await page.fill(
        UniqueSelectors.telephoneInput,
        RespondentDetailsContactDetailsContent.telephone,
      );
    } else {
      await page.click(UniqueSelectors.iDontKnowEmail);
      await page.click(UniqueSelectors.iDontKnowTelephone);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
