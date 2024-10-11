import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { StatementOfTruth1Content } from "../../../../../fixtures/manageCases/createCase/FL401/statementOfTruth/statementOfTruth1Content";
import { Helpers } from "../../../../../common/helpers";

enum inputIDs {
  applicantConsent = "#fl401StmtOfTruth_applicantConsent-fl401Consent",
  day = "#date-day",
  month = "#date-month",
  year = "#date-year",
  fullName = "#fl401StmtOfTruth_fullname",
  nameOfFirm = "#fl401StmtOfTruth_nameOfFirm",
  positionHeld = "#fl401StmtOfTruth_signOnBehalf",
}

enum invalidDate {
  day = "1",
  month = "s",
  year = "k",
}

interface StatementOfTruth1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class StatementOfTruth1Page {
  public static async statementOfTruth1Page({
    page,
    accessibilityTest,
    errorMessaging,
  }: StatementOfTruth1PageOptions): Promise<void> {
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
      `${Selectors.GovukHeadingL}:text-is("${StatementOfTruth1Content.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${StatementOfTruth1Content.p1}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        8,
        StatementOfTruth1Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${StatementOfTruth1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${StatementOfTruth1Content.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        StatementOfTruth1Content,
        "errorValidation",
        `${Selectors.GovukErrorValidation}`,
      ),
      Helpers.checkGroup(
        page,
        5,
        StatementOfTruth1Content,
        "errorMessage",
        `${Selectors.GovukErrorMessage}`,
      ),
    ]);
    for (let [key, value] of Object.entries(invalidDate)) {
      let inputKey = key as keyof typeof inputIDs;
      await page.fill(inputIDs[inputKey], value);
    }
    await page.click(
      `${Selectors.button}:text-is("${StatementOfTruth1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${StatementOfTruth1Content.invalidDateErrorValidation}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${StatementOfTruth1Content.invalidDateErrorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.check(inputIDs.applicantConsent);
    const fieldsToFill: string[] = [
      "day",
      "month",
      "year",
      "fullName",
      "nameOfFirm",
      "positionHeld",
    ];
    for (let key of fieldsToFill) {
      let inputKey = key as keyof typeof inputIDs;
      let contentKey = key as keyof typeof StatementOfTruth1Content;
      await page.fill(inputIDs[inputKey], StatementOfTruth1Content[contentKey]);
    }
    await page.click(
      `${Selectors.button}:text-is("${StatementOfTruth1Content.continue}")`,
    );
  }
}