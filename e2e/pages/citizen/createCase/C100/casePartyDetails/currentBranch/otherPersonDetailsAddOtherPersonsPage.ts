import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors";
import { OtherPersonDetailsAddOtherPersonsContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/currentBranch/otherPersonDetailsAddOtherPersonsContent";
import { Helpers } from "../../../../../../common/helpers";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper";

interface OtherPersonDetailsAddOtherPersonsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

enum UniqueSelectors {
  firstName = "#c100TempFirstName",
  lastName = "#c100TempLastName",
}

export class OtherPersonDetailsAddOtherPersonsPage {
  public static async otherPersonDetailsAddOtherPersonsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: OtherPersonDetailsAddOtherPersonsPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page });
    }
    await this.fillInFields({
      page,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<OtherPersonDetailsAddOtherPersonsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error(
        "Page object is undefined. Ensure that a valid Playwright Page instance is passed to the function.",
      );
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${OtherPersonDetailsAddOtherPersonsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetHeading}:text-is("${OtherPersonDetailsAddOtherPersonsContent.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        OtherPersonDetailsAddOtherPersonsContent,
        "govukLabel",
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${OtherPersonDetailsAddOtherPersonsContent.govukHint}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<OtherPersonDetailsAddOtherPersonsPageOptions>): Promise<void> {
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
        `${Selectors.a}:text-is("${OtherPersonDetailsAddOtherPersonsContent.errorMessageFirstName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${OtherPersonDetailsAddOtherPersonsContent.errorMessageFirstName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${OtherPersonDetailsAddOtherPersonsContent.errorMessageLastName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${OtherPersonDetailsAddOtherPersonsContent.errorMessageLastName}")`,
        1,
      ),
    ]);
    await page.fill(
      UniqueSelectors.firstName,
      OtherPersonDetailsAddOtherPersonsContent.invalidFirstName,
    );
    await page.fill(
      UniqueSelectors.lastName,
      OtherPersonDetailsAddOtherPersonsContent.invalidLastName,
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
        `${Selectors.a}:text-is("${OtherPersonDetailsAddOtherPersonsContent.errorMessageInvalidName}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${OtherPersonDetailsAddOtherPersonsContent.errorMessageInvalidName}")`,
        2,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
  }: Partial<OtherPersonDetailsAddOtherPersonsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error(
        "Page object is undefined. Ensure that a valid Playwright Page instance is passed to the function.",
      );
    }
    await page.fill(
      UniqueSelectors.firstName,
      OtherPersonDetailsAddOtherPersonsContent.firstName,
    );
    await page.fill(
      UniqueSelectors.lastName,
      OtherPersonDetailsAddOtherPersonsContent.lastName,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
