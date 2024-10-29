import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../../common/selectors";
import { RespondentDetailsContactDetailsContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/currentBranch/respondentDetailsContactDetailsContent";
import { Helpers } from "../../../../../../common/helpers";
import { CommonStaticText } from "../../../../../../common/commonStaticText";

interface RespondentDetailsContactDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  dontKNowEmailAndTelephone: boolean;
}

enum UniqueSelectors {
  emailInput = "#emailAddress",
  telephoneInput = "#telephoneNumber",
  iDontKnowEmail = "#donKnowEmailAddress",
  iDontKnowTelephone = "#donKnowTelephoneNumber",
}

export class RespondentDetailsAddressManualPage {
  public static async respondentDetailsAddressManualPageOptions({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    dontKNowEmailAndTelephone: dontKNowEmailAndTelephone,
  }: RespondentDetailsContactDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page });
    }
    await this.fillInFields({
      page,
      dontKNowEmailAndTelephone,
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
      `${Selectors.GovukCaptionXL}:has-text("${RespondentDetailsContactDetailsContent.pageTitle}")`,
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
    dontKNowEmailAndTelephone: knowsTheEmailAndTelephone,
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
