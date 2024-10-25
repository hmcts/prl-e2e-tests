import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ApplicantContactDetailContent } from "../../../../../fixtures/citizen/createCase/C100/casePartyDetails/applicantContactDetailContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";

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
      `${Selectors.GovukHeadingL}:has-text("${ApplicantContactDetailContent.pageTitle}")`,
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
        `${Selectors.NotificationBannerTitle}:text-is("${ApplicantContactDetailContent.notifyBannerTitle}")`, // checking that the postcode put in on the previous page is displaying on this page correctly
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerHeading}:text-is("${ApplicantContactDetailContent.notifyBannerHeading}")`, // checking that the postcode put in on the previous page is displaying on this page correctly
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.notificationBody}:text-is("${ApplicantContactDetailContent.notifyBody}")`, // checking that the postcode put in on the previous page is displaying on this page correctly
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
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
        Selectors.GovukErrorSummary,
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
        Selectors.GovukErrorSummary,
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
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ApplicantContactDetailContent,
        "invalidErrorMessage",
        Selectors.GovukErrorSummary,
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
        `${Selectors.GovukErrorSummary}:text-is("${ApplicantContactDetailContent.hiddenErrorMessage3}")`,
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
