import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors.ts";
import { ApplicantStayingInRefugeContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/applicant/applicantStayingInRefugeContent.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper.ts";

interface applicantStayingInRefugeOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  applicantLivesInRefuge: boolean;
}

enum uniqueSelectors {
  livesInRefugeYes = "#isCitizenLivingInRefuge",
  livesInRefugeNo = "#isCitizenLivingInRefuge-2",
}

export class ApplicantStayingInRefugePage {
  public static async applicantStayingInRefugePage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    applicantLivesInRefuge: applicantLivesInRefuge,
  }: applicantStayingInRefugeOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
      applicantLivesInRefuge: applicantLivesInRefuge,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<applicantStayingInRefugeOptions>): Promise<void> {
    if (!page) {
      throw new Error("Missing the page object.");
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ApplicantStayingInRefugeContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${ApplicantStayingInRefugeContent.link}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ApplicantStayingInRefugeContent,
        "p",
        Selectors.p,
      ),
      Helpers.checkGroup(
        page,
        2,
        ApplicantStayingInRefugeContent,
        `govukLabel`,
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${ApplicantStayingInRefugeContent.link}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<applicantStayingInRefugeOptions>): Promise<void> {
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
        `${Selectors.a}:text-is("${ApplicantStayingInRefugeContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ApplicantStayingInRefugeContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    applicantLivesInRefuge: applicantLivesInRefuge,
  }: Partial<applicantStayingInRefugeOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page object not initialised.");
    }
    if (applicantLivesInRefuge) {
      await page.click(`${uniqueSelectors.livesInRefugeYes}`);
    } else {
      await page.click(`${uniqueSelectors.livesInRefugeNo}`);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
