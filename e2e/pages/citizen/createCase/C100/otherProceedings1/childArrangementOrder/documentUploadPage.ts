import { OrderDetailsContent } from "../../../../../../fixtures/citizen/createCase/C100/otherProceedings1/childArrangementOrder/order-detailsContent";
import { Selectors } from "../../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../../../common/helpers";
import { DocumentUploadContent1 } from "../../../../../../fixtures/citizen/createCase/C100/otherProceedings1/childArrangementOrder/documentUploadContent1";
import config from "../../../../../../config";
import {
  MiamPolicyUpgrade6Content
} from "../../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade6Content";

interface OrderDetailsPagePageOptions {
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
  documentUpload = "#document",
}

export class OrderDetailsPage {
  public static async orderDetailsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: OrderDetailsPagePageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
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
      `${Selectors.p}:text-is("${OrderDetailsContent.p}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h1}:text-is("${DocumentUploadContent1.h1}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        DocumentUploadContent1,
        "p",
        `${Selectors.p}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${DocumentUploadContent1.spanA}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${DocumentUploadContent1.formLabel}")`,
        1,
      ),
    ]);
    await page.click(`${Selectors.Span}:text-is("${DocumentUploadContent1.spanA}")`);
    await Helpers.checkGroup(
      page,
      5,
      DocumentUploadContent1,
      "li",
      `${Selectors.li}`
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DocumentUploadContent1.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${DocumentUploadContent1.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${DocumentUploadContent1.errorMessageChooseFile}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${DocumentUploadContent1.errorMessageChooseFile}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
  }: fillInFieldsOptions): Promise<void> {
    const fileInput = page.locator(`${UniqueSelectors.documentUpload}`);
    await fileInput.setInputFiles(config.testPdfFile);

  }
}
