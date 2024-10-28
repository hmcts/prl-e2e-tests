import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { SafetyConcernHelpers } from "./safetyConcernHelpers";
import { Selectors } from "../../../../../common/selectors";
import { CourtActionContent } from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/courtActionContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";

enum inputIDs {
  courtActionStatement = "#c1A_keepingSafeStatement"
}

interface CourtActionPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class CourtActionPage {
  public static async courtActionPage({
    page,
    accessibilityTest,
    errorMessaging
  }: CourtActionPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest
    })
    if (errorMessaging) {
      await this.checkErrorMessaging(page)
    }
    await this.fillInFields(page)
  }

  private static async checkPageLoads({
    page,
    accessibilityTest
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${CourtActionContent.pageTitle}")`
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${CourtActionContent.caption}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyL}:text-is("${CourtActionContent.bodyL}")`,
        1
      ),
    ]);
    await this.checkDetailsText(page)
    await SafetyConcernHelpers.checkContactDetailsText(page)
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page)
    }
  }

  private static async checkDetailsText(
    page: Page
  ): Promise<void> {
    await page.click(
      `${Selectors.GovukSummaryText}:text-is("${CourtActionContent.detailsSummaryText}")`
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        CourtActionContent,
        'detailsStrong',
        Selectors.strong
      ),
      Helpers.checkGroup(
        page,
        3,
        CourtActionContent,
        'detailsP',
        Selectors.p
      ),
    ])
  }

  private static async checkErrorMessaging(
    page: Page
  ): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${CourtActionContent.errorSummaryList}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${CourtActionContent.errorMessage}")`,
        1
      ),
    ])
  }

  private static async fillInFields(
    page: Page
  ): Promise<void> {
    await page.fill(
      inputIDs.courtActionStatement,
      CourtActionContent.courtActionStatement
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`
    );
  }
}