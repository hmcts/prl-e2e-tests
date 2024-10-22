import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { PermissionsWhyContent } from "../../../../../fixtures/citizen/createCase/C100/c100ScreeningSections/permissionsWhyContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";

enum checkboxIDs {
  permission1 = "#sq_permissionsWhy",
  permission2 = "#sq_permissionsWhy-2",
  permission3 = "#sq_permissionsWhy-3",
}

enum inputIDs {
  parentalResponsibility = "#sq_doNotHaveParentalResponsibility_subfield",
  courtOrder = "#sq_courtOrderPrevent_subfield",
  anotherReason = "#sq_anotherReason_subfield",
}

interface PermissionsWhyPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class PermissionsWhyPage {
  public static async permissionsWhyPage({
    page,
    accessibilityTest,
    errorMessaging,
  }: PermissionsWhyPageOptions): Promise<void> {
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
      `${Selectors.GovukHeadingXL}:text-is("${PermissionsWhyContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        PermissionsWhyContent,
        "body",
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        PermissionsWhyContent,
        "gobHint",
        `${Selectors.GovukHint}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        PermissionsWhyContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${PermissionsWhyContent.govLink}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    for (let checkbox of Object.values(checkboxIDs)) {
      await page.check(checkbox);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        PermissionsWhyContent,
        "errorMessage",
        `${Selectors.ErrorMessage}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        PermissionsWhyContent,
        "errorSummaryList",
        `${Selectors.GovukErrorList} ${Selectors.li}`,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    for (let checkbox of Object.values(checkboxIDs)) {
      await page.check(checkbox);
    }
    await Helpers.checkGroup(
      page,
      3,
      PermissionsWhyContent,
      "details",
      `${Selectors.GovukHint}`,
    );
    for (let [key, textField] of Object.entries(inputIDs)) {
      let contentKey = key as keyof typeof PermissionsWhyContent;
      await page.fill(textField, PermissionsWhyContent[contentKey]);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
  }
}
