import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { MiamPolicyUpgrade8Content } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade8Content";
import { Helpers } from "../../../../../common/helpers";
import config from "../../../../../config";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";

interface MiamPolicyUpgrade8PageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
}

enum UniqueSelectors {
  mediatorRegistrationNumberInput = "#mediatorRegistrationNumber",
  familyMediationServiceNumberInput = "#familyMediatorServiceName",
  soleTraderNameInput = "#soleTraderName",
  uploadFileInput = "#miamCertificationDocumentUpload",
}

export class MiamPolicyUpgrade8Page {
  public static async miamPolicyUpgrade8Page({
    page: page,
    errorMessaging: errorMessaging,
    accessibilityTest: accessibilityTest,
  }: MiamPolicyUpgrade8PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page: page,
      accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${MiamPolicyUpgrade8Content.h2}")`,
    );

    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${MiamPolicyUpgrade8Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${MiamPolicyUpgrade8Content.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${MiamPolicyUpgrade8Content.p2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        MiamPolicyUpgrade8Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    const fileInput = page.locator(`${UniqueSelectors.uploadFileInput}`);
    await fileInput.setInputFiles(config.testOdtFile);
    await page.waitForTimeout(5000);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukErrorMessage}:text-is("${MiamPolicyUpgrade8Content.errorMessageUpload}")`,
      1,
    );
  }

  private static async fillInFields({
    page: page,
  }: fillInFieldsOptions): Promise<void> {
    await page.fill(
      `${UniqueSelectors.mediatorRegistrationNumberInput}`,
      MiamPolicyUpgrade8Content.mediatorRegistrationNumber,
    );
    await page.fill(
      `${UniqueSelectors.familyMediationServiceNumberInput}`,
      MiamPolicyUpgrade8Content.familyMediationServiceNumber,
    );
    await page.fill(
      `${UniqueSelectors.soleTraderNameInput}`,
      MiamPolicyUpgrade8Content.soleTraderName,
    );
    await page.waitForTimeout(1000);
    const fileInput = page.locator(`${UniqueSelectors.uploadFileInput}`);
    await fileInput.setInputFiles(config.testPdfFile);
    await page.waitForTimeout(5000);
    await page.click(
      `${Selectors.button}:text-is("${MiamPolicyUpgrade8Content.continue}")`,
    );
  }
}
