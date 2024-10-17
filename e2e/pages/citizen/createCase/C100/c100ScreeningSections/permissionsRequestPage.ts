import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { PermissionsRequestContent } from "../../../../../fixtures/citizen/createCase/C100/c100ScreeningSections/permissionsRequestContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";

enum inputIDs {
  permissionReasoning = "#sq_permissionsRequest",
}

interface PermissionsRequestPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class PermissionsRequestPage {
  public static async permissionsRequestPage({
    page,
    accessibilityTest,
    errorMessaging,
  }: PermissionsRequestPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${PermissionsRequestContent.pageTitle}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukBody}:text-is("${PermissionsRequestContent.body}")`,
      1,
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.paddedContinue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${PermissionsRequestContent.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${PermissionsRequestContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.li}:text-is("${PermissionsRequestContent.errorSummaryList}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.fill(
      inputIDs.permissionReasoning,
      PermissionsRequestContent.permissionReasoning,
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.paddedContinue}")`,
    );
  }
}
