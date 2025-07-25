import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../../common/selectors.ts";
import { PermissionContent } from "../../../../../fixtures/citizen/createCase/C100/c100ScreeningSections/permissionContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";

enum inputIDs {
  radioYes = "#sq_courtPermissionRequired",
  radioNo = "#sq_courtPermissionRequired-2",
}

interface PermissionPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100CourtPermissionNeeded: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100CourtPermissionNeeded: boolean;
}

export class PermissionPage {
  public static async permissionPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100CourtPermissionNeeded,
  }: PermissionPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page,
      c100CourtPermissionNeeded,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${PermissionContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        PermissionContent,
        "body",
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkGroup(page, 3, PermissionContent, "list", `${Selectors.li}`),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.yes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.no}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${PermissionContent.aLink}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
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
        `${Selectors.GovukErrorMessageCitizen}:text-is("${PermissionContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${PermissionContent.errorSummaryList}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100CourtPermissionNeeded,
  }: FillInFieldsOptions): Promise<void> {
    if (c100CourtPermissionNeeded) {
      await page.click(inputIDs.radioYes);
    } else {
      await page.click(inputIDs.radioNo);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
