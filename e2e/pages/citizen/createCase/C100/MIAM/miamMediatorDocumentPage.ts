import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { MiamMediatorDocumentContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamMediatorDocumentContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface MediatorDocumentPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  documentSignedByMediator: boolean;
}

enum uniqueSelectors {
  documentSignedYes = "#miam_haveDocSigned",
  documentSignedNo = "#miam_haveDocSigned-2",
}

export class MiamMediatorDocumentPage {
  public static async mediatorDocumentPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    documentSignedByMediator: documentSignedByMediator,
  }: MediatorDocumentPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
      documentSignedByMediator: documentSignedByMediator,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<MediatorDocumentPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page object.");
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${MiamMediatorDocumentContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${MiamMediatorDocumentContent.govukHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        MiamMediatorDocumentContent,
        `govukLabel`,
        Selectors.GovukLabel,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<MediatorDocumentPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page opbject.");
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
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${MiamMediatorDocumentContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${MiamMediatorDocumentContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    documentSignedByMediator: documentSignedByMediator,
  }: Partial<MediatorDocumentPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page object.");
    }
    if (documentSignedByMediator) {
      await page.click(uniqueSelectors.documentSignedYes);
    } else {
      await page.click(uniqueSelectors.documentSignedNo);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
