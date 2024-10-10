import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { CaOrderContent } from "../../../../../fixtures/citizen/createCase/C100/typeOfOrder/caOrderContent";
import { SelectCourtOrderContent } from "../../../../../fixtures/citizen/createCase/C100/typeOfOrder/selectCourtOrderContent";
import { Helpers } from "../../../../../common/helpers";

interface SelectCourtOrderPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillinFieldsOptions {
  page: Page;
}

enum UniqueSelectors {
  too_courtOrder = "#too_courtOrder",
  too_courtOrder2 = "#too_courtOrder-2",
  too_courtOrder3 = "#too_courtOrder-3",
  too_courtOrder4 = "#too_courtOrder-4",
}

enum too_courtOrder3SubFields {
  too_stopOtherPeopleDoingSomethingSubField = "#too_stopOtherPeopleDoingSomethingSubField",
  too_stopOtherPeopleDoingSomethingSubField2 = "#too_stopOtherPeopleDoingSomethingSubField-2",
  too_stopOtherPeopleDoingSomethingSubField3 = "#too_stopOtherPeopleDoingSomethingSubField-3",
  too_stopOtherPeopleDoingSomethingSubField4 = "#too_stopOtherPeopleDoingSomethingSubField-4",
  too_stopOtherPeopleDoingSomethingSubField5 = "#too_stopOtherPeopleDoingSomethingSubField-5",
}

enum too_courtOrder4SubFields {
  too_resolveSpecificIssueSubField = "#too_resolveSpecificIssueSubField",
  too_resolveSpecificIssueSubField2 = "#too_resolveSpecificIssueSubField-2",
  too_resolveSpecificIssueSubField3 = "#too_resolveSpecificIssueSubField-3",
  too_resolveSpecificIssueSubField4 = "#too_resolveSpecificIssueSubField-4",
  too_resolveSpecificIssueSubField5 = "#too_resolveSpecificIssueSubField-5",
  too_resolveSpecificIssueSubField6 = "#too_resolveSpecificIssueSubField-6",
  too_resolveSpecificIssueSubField7 = "#too_resolveSpecificIssueSubField-7",
  too_resolveSpecificIssueSubField8 = "#too_resolveSpecificIssueSubField-8",
}

export class SelectCourtOrderPage {
  public static async selectCourtOrderPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: SelectCourtOrderPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${SelectCourtOrderContent.h1}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        SelectCourtOrderContent,
        "formHint",
        `${Selectors.GovukHint}`,
      ),
      Helpers.checkGroup(
        page,
        4,
        SelectCourtOrderContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SelectCourtOrderContent.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${SelectCourtOrderContent.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${SelectCourtOrderContent.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${SelectCourtOrderContent.errorMessageAskingCourtToDo}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${SelectCourtOrderContent.errorMessageAskingCourtToDo}")`,
        1,
      ),
    ]);
    await page.click(`${UniqueSelectors.too_courtOrder3}`);
    await page.click(`${UniqueSelectors.too_courtOrder4}`);
    await page.click(
      `${Selectors.button}:text-is("${SelectCourtOrderContent.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${SelectCourtOrderContent.errorMessageSpecifyForStopOtherPeople}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${SelectCourtOrderContent.errorMessageSpecifyForStopOtherPeople}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${SelectCourtOrderContent.errorMessageSpecifyIssue}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${SelectCourtOrderContent.errorMessageSpecifyIssue}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
  }: fillinFieldsOptions): Promise<void> {
    await page.click(`${UniqueSelectors.too_courtOrder}`);
    await page.click(`${UniqueSelectors.too_courtOrder2}`);
    await page.click(`${UniqueSelectors.too_courtOrder3}`);
    await page.click(`${UniqueSelectors.too_courtOrder4}`);
    await this.hiddenFormLabels(page);
    for (const key in too_courtOrder3SubFields) {
      const selectorCourtOrder3SubFields =
        too_courtOrder3SubFields[key as keyof typeof too_courtOrder3SubFields];
      await page.click(selectorCourtOrder3SubFields);
    }
    await page.waitForTimeout(100);
    for (const key in too_courtOrder4SubFields) {
      const selectorCourtOrder4SubFields =
        too_courtOrder4SubFields[key as keyof typeof too_courtOrder4SubFields];
      await page.click(selectorCourtOrder4SubFields);
    }
    await page.waitForTimeout(100);
    await page.click(
      `${Selectors.button}:text-is("${CaOrderContent.continue}")`,
    );
  }

  private static async hiddenFormLabels(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        SelectCourtOrderContent,
        "formLabelStopOtherPeople",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkGroup(
        page,
        6,
        SelectCourtOrderContent,
        "formLabelResolveSpecificIssue",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${SelectCourtOrderContent.formLabelDuplicateHidden1}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${SelectCourtOrderContent.formLabelDuplicateHidden2}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${SelectCourtOrderContent.formLabelDuplicateHidden3}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${SelectCourtOrderContent.formHintResolveSpecificIssue}")`,
        1,
      ),
    ]);
  }
}
