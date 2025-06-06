import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../../common/selectors.ts";
import { PermissionsWhyContent } from "../../../../../fixtures/citizen/createCase/C100/c100ScreeningSections/permissionsWhyContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";

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
        "govHint",
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
      await new AxeUtils(page).audit();
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    for (const checkbox of Object.values(checkboxIDs)) {
      await page.check(checkbox);
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
      Helpers.checkGroup(
        page,
        3,
        PermissionsWhyContent,
        "errorMessage",
        `${Selectors.GovukErrorMessageCitizen}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        PermissionsWhyContent,
        "errorSummaryList",
        `${Selectors.a}`,
      ),
    ]);
    for (const checkbox of Object.values(checkboxIDs)) {
      await page.check(checkbox);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    for (const checkbox of Object.values(checkboxIDs)) {
      await page.check(checkbox);
    }
    await Helpers.checkGroup(
      page,
      3,
      PermissionsWhyContent,
      "details",
      `${Selectors.GovukLabel}`,
    );
    for (const [key, textField] of Object.entries(inputIDs)) {
      const contentKey = key as keyof typeof PermissionsWhyContent;
      await page.fill(textField, PermissionsWhyContent[contentKey]);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
