import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { RespondentDetailsContent } from "../../../../../fixtures/manageCases/createCase/FL401/respondentDetails/respondentDetailsContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { solicitorCaseCreateType } from "../../../../../common/types";

enum fieldIds {
  firstName = "respondentsFL401_firstName",
  lastName = "respondentsFL401_lastName",
}

export class RespondentDetailsCreatePage {
  public static async respondentDetailsCreatePage(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.headingH2}:text-is("${RespondentDetailsContent.subTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${RespondentDetailsContent.title}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${RespondentDetailsContent.textOnPage}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${RespondentDetailsContent.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${RespondentDetailsContent.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${RespondentDetailsContent.errorText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${RespondentDetailsContent.errorText}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page
  ): Promise<void> {
    await page.fill(`${fieldIds.firstName}`, 'firstName');
    await page.fill(`${fieldIds.lastName}`, 'lastName');

    // await page.selectOption(fieldIds.jurisdiction, options.familyPrivateLaw);
    // await page.selectOption(fieldIds.caseType, options.caseType);
    // await page.selectOption(fieldIds.event, options.solicitorApplication);

    await page.click(
      `${Selectors.button}:text-is("${RespondentDetailsContent.continue}")`,
    );
  }
}
