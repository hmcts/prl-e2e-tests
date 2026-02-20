import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { StatementOfTruth2Content } from "../../../../../fixtures/manageCases/createCase/FL401/statementOfTruth/statementOfTruth2Content";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../../common/helpers";

interface StatementOfTruth2PageOptions {
  page: Page;
  isResubmit: boolean;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum inputIDs {
  consent = "#fl401ConfidentialityCheck_confidentialityConsent-fl401ConfidentialConsent",
  consentResubmit = "#fl401ConfidentialityCheckResubmit_confidentialityConsent-fl401ConfidentialConsent",
}

export class StatementOfTruth2Page {
  public static async statementOfTruth2Page({
    page,
    isResubmit,
    accessibilityTest,
    errorMessaging,
  }: StatementOfTruth2PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page, isResubmit);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukFormLabel}:text-is("${StatementOfTruth2Content.formLabel}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        StatementOfTruth2Content,
        "li",
        `${Selectors.li}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        StatementOfTruth2Content,
        "p",
        `${Selectors.p}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${StatementOfTruth2Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${StatementOfTruth2Content.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${StatementOfTruth2Content.errorValidation}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${StatementOfTruth2Content.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    isResubmit: boolean,
  ): Promise<void> {
    await page.check(isResubmit ? inputIDs.consentResubmit : inputIDs.consent);
    await page.click(
      `${Selectors.button}:text-is("${isResubmit ? StatementOfTruth2Content.submit : StatementOfTruth2Content.continue}")`,
    );
  }
}
