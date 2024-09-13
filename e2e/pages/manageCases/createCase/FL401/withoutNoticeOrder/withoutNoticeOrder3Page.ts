import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import {
  WithoutNoticeOrderDetails2Content
} from "../../../../../fixtures/manageCases/createCase/FL401/withoutNoticeOrder/withoutNoticeOrderDetails2Content";
import { Helpers } from "../../../../../common/helpers";
import accessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import {
  WithoutNoticeOrderDetails3Content
} from "../../../../../fixtures/manageCases/createCase/FL401/withoutNoticeOrder/withoutNoticeOrderDetails3Content";

enum withoutNoticeOrderInputIDs {
  radioYes = '#bailDetails_isRespondentAlreadyInBailCondition-yes',
  dayBail = '#bailConditionEndDate-day',
  monthBail = '#bailConditionEndDate-month',
  yearBail = '#bailConditionEndDate-year'
}

export enum bailEndDate {
  day = '1',
  month = '6',
  year = '2028'
}

enum incompleteBailDate {
  day = '1',
  month = '',
  year = '',
}

export class WithoutNoticeOrder3Page{
  public static async withoutNoticeOrder3Page(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page, accessibilityTest);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${WithoutNoticeOrderDetails2Content.pageTitle}")`
    );
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${WithoutNoticeOrderDetails2Content.p1}")`,
          1
        ),
        Helpers.checkGroup(
          page,
          4,
          WithoutNoticeOrderDetails2Content,
          'formLabel',
          `${Selectors.GovukFormLabel}`
        ),
      ]
    );
    if (accessibilityTest) {
      await accessibilityTestHelper.run(page)
    }
  }

  private static async checkExpandedFields(
    page: Page,
    accessibilityTest: boolean
  ): Promise<void> {
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormHint}:text-is("${WithoutNoticeOrderDetails3Content.yesFormHint}")`,
          1
        ),
        Helpers.checkGroup(
          page,
          3,
          WithoutNoticeOrderDetails3Content,
          'yesFormLabel',
          `${Selectors.GovukFormLabel}`
        )
      ]
    );
    if (accessibilityTest) {
      await accessibilityTestHelper.run(page)
    }
  }

  private static async checkErrorMessaging(
    page: Page
  ): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${WithoutNoticeOrderDetails3Content.continue}")`
    );
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorSummaryTitle}:text-is("${WithoutNoticeOrderDetails3Content.errorSummary}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorValidation}:text-is("${WithoutNoticeOrderDetails3Content.validationError}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorMessage}:text-is("${WithoutNoticeOrderDetails3Content.errorMessage}")`,
          1
        ),
      ]
    );
    await this.fillInDates(
      page,
      incompleteBailDate
    );
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorSummaryTitle}:text-is("${WithoutNoticeOrderDetails3Content.errorSummary}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorValidation}:text-is("${WithoutNoticeOrderDetails3Content.incompleteDateValidationError}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorMessage}:text-is("${WithoutNoticeOrderDetails3Content.incompleteDateErrorMessage}")`,
          1
        ),
      ]
    );
  }

  private static async fillInDates<E extends Record<string, string>> (
    page: Page,
    file: E
  ): Promise<void> {
    for (let [key, inputValue] of Object.entries(file)) {
      let keyID = `${key}Bail` as keyof typeof withoutNoticeOrderInputIDs;
      await page.fill(
        withoutNoticeOrderInputIDs[keyID],
        ''
      );
      await page.fill(
        withoutNoticeOrderInputIDs[keyID],
        inputValue
      );
    }
  }

  private static async fillInFields(
    page: Page,
    accessibilityTest: boolean
  ): Promise<void> {
    await page.click(
      withoutNoticeOrderInputIDs.radioYes
    );
    await this.checkExpandedFields(
      page,
      accessibilityTest
    );
    await this.fillInDates(
      page,
      bailEndDate
    )
    await page.click(
      `${Selectors.button}:text-is("${WithoutNoticeOrderDetails3Content.continue}")`
    );
  }
}