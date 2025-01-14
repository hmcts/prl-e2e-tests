import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { RespondentDetailsAddRespondentsContent } from "../../../../../fixtures/citizen/createCase/C100/casePartyDetails/respondentDetailsAddRespondentsContent";

enum InputIds {
  firstName = "#c100TempFirstName",
  lastName = "#c100TempLastName",
}

enum UniqueSelectors {
  firstNameErrorSelector = "a[href='#c100TempFirstName']",
  lastNameErrorSelector = "a[href='#c100TempLastName']",
}

interface RespondentDetailsAddRespondentsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface FillInFieldsOptions {
  page: Page;
}

export class RespondentDetailsAddRespondentsPage {
  public static async respondentDetailsAddRespondentsPage({
    page,
    accessibilityTest,
    errorMessaging,
  }: RespondentDetailsAddRespondentsOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({ page });
  }
  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${RespondentDetailsAddRespondentsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        RespondentDetailsAddRespondentsContent,
        "label",
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${RespondentDetailsAddRespondentsContent.body}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${RespondentDetailsAddRespondentsContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${RespondentDetailsAddRespondentsContent.hint}")`,
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
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        RespondentDetailsAddRespondentsContent,
        "errorMessage",
        Selectors.GovukErrorMessageCitizen,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.firstNameErrorSelector}:text-is("${RespondentDetailsAddRespondentsContent.errorMessage1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.lastNameErrorSelector}:text-is("${RespondentDetailsAddRespondentsContent.errorMessage2}")`,
        1,
      ),
    ]);
  }
  private static async fillInFields({
    page,
  }: FillInFieldsOptions): Promise<void> {
    await page.fill(
      InputIds.firstName,
      RespondentDetailsAddRespondentsContent.inputFirstName,
    );
    await page.fill(
      InputIds.lastName,
      RespondentDetailsAddRespondentsContent.inputLastName,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
