import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { HearingUrgency1Content } from "../../../../../fixtures/manageCases/createCase/C100/hearingUrgency/hearingUrgency1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

enum pageFields {
  caseUrgentYes = "#isCaseUrgent_Yes",
  caseUrgentNo = "#isCaseUrgent_No",
  caseUrgencyTimeAndReason = "#caseUrgencyTimeAndReason",
  effortsMadeWithRespondent = "#effortsMadeWithRespondents",
  withoutNoticeYes = "#doYouNeedAWithoutNoticeHearing_Yes",
  reasonsForApplicantWithoutNotice = "#reasonsForApplicationWithoutNotice",
  withoutNoticeNo = "#doYouNeedAWithoutNoticeHearing_No",
  reducedNoticeYes = "#doYouRequireAHearingWithReducedNotice_Yes",
  setOutReasonsBelow = "#setOutReasonsBelow",
  reducedNoticeNo = "#doYouRequireAHearingWithReducedNotice_No",
  respondentsAwareYes = "#areRespondentsAwareOfProceedings_Yes",
  respondentsAwareNo = "#areRespondentsAwareOfProceedings_No",
}

export class HearingUrgency1Page {
  public static async hearingUrgency1Page(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    yesNoHearingUrgency: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page, yesNoHearingUrgency);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.p}:text-is("${HearingUrgency1Content.p1}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${HearingUrgency1Content.p2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        HearingUrgency1Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${HearingUrgency1Content.formLabelYes}")`,
        4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${HearingUrgency1Content.formLabelNo}")`,
        4,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${HearingUrgency1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${HearingUrgency1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${HearingUrgency1Content.errorMessageIsCaseUrgent}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${HearingUrgency1Content.errorMessageIsCaseUrgent}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${HearingUrgency1Content.errorMessageWithoutNoticeHearing}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${HearingUrgency1Content.errorMessageWithoutNoticeHearing}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${HearingUrgency1Content.errorMessageReducedNoticeHearing}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${HearingUrgency1Content.errorMessageReducedNoticeHearing}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${HearingUrgency1Content.errorMessageAwareOfProceedings}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${HearingUrgency1Content.errorMessageAwareOfProceedings}")`,
        1,
      ),
    ]);
    await page.click(`${pageFields.caseUrgentYes}`);
    await page.click(`${pageFields.withoutNoticeYes}`);
    await page.click(`${pageFields.reducedNoticeYes}`);
    await page.click(`${pageFields.respondentsAwareYes}`);
    await Promise.all([
      Helpers.checkGroup(
        page,
        4,
        HearingUrgency1Content,
        "additionalFormLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    await page.click(
      `${Selectors.button}:text-is("${HearingUrgency1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${HearingUrgency1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${HearingUrgency1Content.errorMessageHowSoon}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${HearingUrgency1Content.errorMessageHowSoon}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${HearingUrgency1Content.errorMessageReasonsShortNotice}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${HearingUrgency1Content.errorMessageReasonsShortNotice}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${HearingUrgency1Content.errorMessageReasons}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${HearingUrgency1Content.errorMessageReasons}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    yesNoHearingUrgency: boolean,
  ): Promise<void> {
    if (yesNoHearingUrgency) {
      await page.click(`${pageFields.caseUrgentYes}`);
      await page.fill(
        `${pageFields.caseUrgencyTimeAndReason}`,
        HearingUrgency1Content.loremIpsum,
      );
      await page.fill(
        `${pageFields.effortsMadeWithRespondent}`,
        HearingUrgency1Content.loremIpsum,
      );
      await page.click(`${pageFields.withoutNoticeYes}`);
      await page.fill(
        `${pageFields.reasonsForApplicantWithoutNotice}`,
        HearingUrgency1Content.loremIpsum,
      );
      await page.click(`${pageFields.reducedNoticeYes}`);
      await page.fill(
        `${pageFields.setOutReasonsBelow}`,
        HearingUrgency1Content.loremIpsum,
      );
      await page.click(`${pageFields.respondentsAwareYes}`);
      await Promise.all([
        Helpers.checkGroup(
          page,
          4,
          HearingUrgency1Content,
          "additionalFormLabel",
          `${Selectors.GovukFormLabel}`,
        ),
      ]);
    } else {
      await page.click(`${pageFields.caseUrgentNo}`);
      await page.click(`${pageFields.withoutNoticeNo}`);
      await page.click(`${pageFields.reducedNoticeNo}`);
      await page.click(`${pageFields.respondentsAwareNo}`);
    }
    await page.click(
      `${Selectors.button}:text-is("${HearingUrgency1Content.continue}")`,
    );
  }
}
