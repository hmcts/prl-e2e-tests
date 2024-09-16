import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import accessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { WithoutNoticeOrderDetails3Content } from "../../../../../fixtures/manageCases/createCase/FL401/withoutNoticeOrder/withoutNoticeOrderDetails3Content";
import { bailConditionRadios } from "../../../../../journeys/manageCases/createCase/FL401";

enum withoutNoticeOrderInputIDs {
  radioYes = "#bailDetails_isRespondentAlreadyInBailCondition-yes",
  radioNo = "#bailDetails_isRespondentAlreadyInBailCondition-no",
  radioDK = "#bailDetails_isRespondentAlreadyInBailCondition-dontKnow",
  dayBail = "#bailConditionEndDate-day",
  monthBail = "#bailConditionEndDate-month",
  yearBail = "#bailConditionEndDate-year",
}

enum incompleteBailDate {
  day = "1",
  month = "",
  year = "",
}

export class WithoutNoticeOrder3Page {
  public static async withoutNoticeOrder3Page(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    bailConditions: bailConditionRadios,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page, accessibilityTest, bailConditions);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukFormLabel}:text-is("${WithoutNoticeOrderDetails3Content.pageLoadText}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${WithoutNoticeOrderDetails3Content.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${WithoutNoticeOrderDetails3Content.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        WithoutNoticeOrderDetails3Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await accessibilityTestHelper.run(page);
    }
  }

  private static async checkExpandedFields(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${WithoutNoticeOrderDetails3Content.yesFormHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        WithoutNoticeOrderDetails3Content,
        "yesFormLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await accessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${WithoutNoticeOrderDetails3Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${WithoutNoticeOrderDetails3Content.errorSummary}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${WithoutNoticeOrderDetails3Content.validationError}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${WithoutNoticeOrderDetails3Content.errorMessage}")`,
        1,
      ),
    ]);
    await page.click(withoutNoticeOrderInputIDs.radioYes);
    await this.fillInDates(page, incompleteBailDate);
    await page.click(
      `${Selectors.button}:text-is("${WithoutNoticeOrderDetails3Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${WithoutNoticeOrderDetails3Content.errorSummary}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${WithoutNoticeOrderDetails3Content.incompleteDateValidationError}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${WithoutNoticeOrderDetails3Content.incompleteDateErrorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInDates<E extends Record<string, string>>(
    page: Page,
    file: E,
  ): Promise<void> {
    await page.fill(withoutNoticeOrderInputIDs.dayBail, file.day);
    await page.fill(withoutNoticeOrderInputIDs.monthBail, file.month);
    await page.fill(withoutNoticeOrderInputIDs.yearBail, file.year);
    // Due to potential performance issues, playwright can't click continue after filling in the date fields.
    // Without this command, the browser displays an error associated with the date field, even though it is filled in.
    // I tried using waitForSelector but it didn't work.
    await page.keyboard.press("Escape");
  }

  private static async fillInFields(
    page: Page,
    accessibilityTest: boolean,
    bailConditions: bailConditionRadios,
  ): Promise<void> {
    switch (bailConditions) {
      case "Yes":
        await page.click(withoutNoticeOrderInputIDs.radioYes);
        await this.fillInDates(page, WithoutNoticeOrderDetails3Content);
        await this.checkExpandedFields(page, accessibilityTest);
        break;
      case "No":
        await page.click(withoutNoticeOrderInputIDs.radioNo);
        break;
      case "Don't know":
        await page.click(withoutNoticeOrderInputIDs.radioDK);
        break;
      default:
        console.log("Unexpected value for bailConditions: ", bailConditions);
        break;
    }
    await page.click(
      `${Selectors.button}:text-is("${WithoutNoticeOrderDetails3Content.continue}")`,
    );
  }
}
