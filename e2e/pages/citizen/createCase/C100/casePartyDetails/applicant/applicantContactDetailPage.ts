import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { Selectors } from "../../../../../../common/selectors.ts";
import { ApplicantContactDetailContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/applicant/applicantContactDetailContent.ts";
import { AxeUtils } from "@hmcts/playwright-common";

enum inputIds {
  provideEmailYes = "#canProvideEmail",
  provideEmailNo = "#canProvideEmail-2",
  enterEmail = "#emailAddress",
  provideTelYes = "#canProvideTelephoneNumber",
  provideTelNo = "#canProvideTelephoneNumber-2",
  enterTel = "#telephoneNumber",
  reasonNoTel = "#canNotProvideTelephoneNumberReason",
  leaveVoicemailYes = "#canLeaveVoiceMail",
  leaveVoicemailNo = "#canLeaveVoiceMail-2",
}

enum uniqueSelectors {
  notificationBody = `p[class="govuk-body govuk-!-margin-bottom-2"]`,
}

interface applicantContactDetailOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  provideEmailTelephoneVoicemail: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  provideEmailTelephoneVoicemail: boolean;
}

export class ApplicantContactDetailPage {
  public static async applicantContactDetailPage({
    page,
    accessibilityTest,
    errorMessaging,
    provideEmailTelephoneVoicemail,
  }: applicantContactDetailOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page,
      provideEmailTelephoneVoicemail,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:has-text("${ApplicantContactDetailContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        6,
        ApplicantContactDetailContent,
        "label",
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerTitle}:text-is("${ApplicantContactDetailContent.notifyBannerTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerHeading}:text-is("${ApplicantContactDetailContent.notifyBannerHeading}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.notificationBody}:text-is("${ApplicantContactDetailContent.notifyBody}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit({
        exclude: [
          inputIds.provideEmailYes,
          inputIds.provideTelYes,
          inputIds.provideTelNo,
        ],
      }); //false-positive (https://github.com/alphagov/govuk-frontend/issues/979, https://github.com/w3c/aria/issues/1404)
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    // Validate that the error messages are correctly displayed
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        ApplicantContactDetailContent,
        "errorMessage",
        `${Selectors.GovukErrorList} ${Selectors.a}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        ApplicantContactDetailContent,
        "errorMessage",
        Selectors.GovukErrorMessageCitizen,
      ),
    ]);
    // Validate that hidden error messages are correctly displayed
    // Fails to enter anything into field boxes ("Your email address", "your telephone number")
    await page.click(inputIds.provideEmailYes);
    await page.click(inputIds.provideTelYes);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ApplicantContactDetailContent,
        "hiddenErrorMessage",
        `${Selectors.GovukErrorList} ${Selectors.a}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        ApplicantContactDetailContent,
        "hiddenErrorMessage",
        Selectors.GovukErrorMessageCitizen,
      ),
    ]);
    // Enters invalid entries into field boxes ("Your email address", "your telephone number")
    await page.fill(
      inputIds.enterEmail,
      ApplicantContactDetailContent.inputInvalidEmail,
    );
    await page.fill(
      inputIds.enterTel,
      ApplicantContactDetailContent.inputInvalidTel,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ApplicantContactDetailContent,
        "invalidErrorMessage",
        `${Selectors.GovukErrorList} ${Selectors.a}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        ApplicantContactDetailContent,
        "invalidErrorMessage",
        Selectors.GovukErrorMessageCitizen,
      ),
    ]);
    // Fails to enter anything into why you can't provide a telephone number
    await page.click(inputIds.provideTelNo);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${ApplicantContactDetailContent.hiddenErrorMessage3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ApplicantContactDetailContent.hiddenErrorMessage3}")`,
        1,
      ),
    ]);
    await page.fill(
      inputIds.enterEmail,
      ApplicantContactDetailContent.inputInvalidEmail,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }

  private static async fillInFields({
    page,
    provideEmailTelephoneVoicemail,
  }: fillInFieldsOptions): Promise<void> {
    if (provideEmailTelephoneVoicemail) {
      // Answer 'yes' to options
      await page.click(inputIds.provideEmailYes);
      await page.fill(
        inputIds.enterEmail,
        ApplicantContactDetailContent.inputEmail,
      );
      await page.click(inputIds.provideTelYes);
      await page.fill(
        inputIds.enterTel,
        ApplicantContactDetailContent.inputTel,
      );
      await page.click(inputIds.leaveVoicemailYes);
    } else {
      // Answer 'no' to options
      await page.click(inputIds.provideEmailNo);
      await page.click(inputIds.provideTelNo);
      await page.fill(
        inputIds.reasonNoTel,
        ApplicantContactDetailContent.inputNoTelReason,
      );
      await page.click(inputIds.leaveVoicemailNo);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
