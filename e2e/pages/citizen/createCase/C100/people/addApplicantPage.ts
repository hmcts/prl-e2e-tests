import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { AddApplicantContent } from "../../../../../fixtures/citizen/createCase/C100/people/addApplicantContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface AddApplicantPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
}

enum inputIds {
  firstName = "#applicantFirstName",
  lastName = "#applicantLastName",
}

export class AddApplicantPage {
  public static async addApplicantPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: AddApplicantPageOptions): Promise<void> {
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
      `${Selectors.GovukHeadingXL}:text-is("${AddApplicantContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${AddApplicantContent.heading}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${AddApplicantContent.hint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        AddApplicantContent,
        "insetText",
        `${Selectors.GovukInsetText}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        AddApplicantContent,
        "label",
        `${Selectors.GovukLabel}`,
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
        AddApplicantContent,
        "errorLink",
        `${Selectors.a}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        AddApplicantContent,
        "errorLink",
        `${Selectors.GovukErrorMessageCitizen}`,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
  }: fillInFieldsOptions): Promise<void> {
    for (const selector of Object.values(inputIds)) {
      await page.fill(`${selector}`, AddApplicantContent.exampleText);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
