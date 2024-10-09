import { Page } from "@playwright/test";
import accessibilityTestHelper from "../../common/accessibilityTestHelper";
import AccessibilityTestHelper from "../../common/accessibilityTestHelper";
import { Selectors } from "../../common/selectors";
import { LegalRepresentationContent } from "../../fixtures/c100ScreeningSections/legalRepresentationContent";
import { Helpers } from "../../common/helpers";

interface LegalRepresentationPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100LegalRepresentation: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean
}


export class LegalRepresentationPage {
  public static async legalRepresentationPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100LegalRepresentation
  }: LegalRepresentationPageOptions) {
    await this.checkPageLoads({
      page,
      accessibilityTest
    });
    if (errorMessaging) {

    }
  }

  private static async checkPageLoads({
    page,
    accessibilityTest
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${LegalRepresentationContent.pageTitle}")`
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        LegalRepresentationContent,
        'formLabel',
        `${Selectors.GovukLabel}`
      ),
    ])
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(
        page
      );
    }
  }

  private static async checkErrorMessaging(
    page: Page
  ): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${LegalRepresentationContent.continue}")`
    );
    await Promise.all([

    ])
  }
}