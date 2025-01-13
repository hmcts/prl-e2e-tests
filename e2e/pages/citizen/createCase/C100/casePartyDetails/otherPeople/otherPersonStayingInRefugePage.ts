import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors";
import { OtherPersonStayingInRefugeContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonStayingInRefugeContent";
import { Helpers } from "../../../../../../common/helpers";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper";

interface otherPersonStayingInRefugeOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  otherPersonLivesInRefuge: boolean;
}

enum uniqueSelectors {
  livesInRefugeYes = "#isCitizenLivingInRefuge",
  livesInRefugeNo = "#isCitizenLivingInRefuge-2",
}

export class OtherPersonStayingInRefugePage {
  public static async otherPersonStayingInRefugePage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    otherPersonLivesInRefuge: otherPersonLivesInRefuge,
  }: otherPersonStayingInRefugeOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
      otherPersonLivesInRefuge: otherPersonLivesInRefuge,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<otherPersonStayingInRefugeOptions>): Promise<void> {
    if (!page) {
      throw new Error("Missing the page object.");
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${OtherPersonStayingInRefugeContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${OtherPersonStayingInRefugeContent.link}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        OtherPersonStayingInRefugeContent,
        "p",
        Selectors.p,
      ),
      Helpers.checkGroup(
        page,
        2,
        OtherPersonStayingInRefugeContent,
        `govukLabel`,
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${OtherPersonStayingInRefugeContent.link}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<otherPersonStayingInRefugeOptions>): Promise<void> {
    if (!page) {
      throw new Error("Missing the page object.");
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
        `${Selectors.a}:text-is("${OtherPersonStayingInRefugeContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${OtherPersonStayingInRefugeContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    otherPersonLivesInRefuge: otherPersonLivesInRefuge,
  }: Partial<otherPersonStayingInRefugeOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page object not initialised.");
    }
    if (otherPersonLivesInRefuge) {
      await page.click(`${uniqueSelectors.livesInRefugeYes}`);
    } else {
      await page.click(`${uniqueSelectors.livesInRefugeNo}`);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
