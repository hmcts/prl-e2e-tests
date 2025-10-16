import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../../common/selectors.ts";
import { UploadDocumentsSubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/uploadDocuments/uploadDocumentsSubmitContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";

interface UploadDocumentsSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface CheckPageContentOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class UploadDocumentsSubmitPage {
  public static async uploadDocumentsSubmitPage({
    page,
    accessibilityTest,
  }: UploadDocumentsSubmitPageOptions): Promise<void> {
    await this.checkPageContent({
      page,
      accessibilityTest,
    });
    await this.fillInFields(page);
  }

  private static async checkPageContent({
    page,
    accessibilityTest,
  }: CheckPageContentOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${UploadDocumentsSubmitContent.checkAnswers}")`,
    );
    await Promise.all([
      this.checkStaticContent(page),
      this.checkFilledInData(page),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkStaticContent(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${UploadDocumentsSubmitContent.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${UploadDocumentsSubmitContent.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${UploadDocumentsSubmitContent.strong1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${UploadDocumentsSubmitContent.change}")`,
        2,
      ),
      Helpers.checkGroup(
        page,
        3,
        UploadDocumentsSubmitContent,
        "li",
        `${Selectors.li}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        UploadDocumentsSubmitContent,
        "h3",
        `${Selectors.h3}`,
      ),
    ]);
  }

  private static async checkFilledInData(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovLink}:text-is("${UploadDocumentsSubmitContent.mockDocx}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovLink}:text-is("${UploadDocumentsSubmitContent.mockPdf}")`,
        2,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${UploadDocumentsSubmitContent.continue}")`,
    );
  }
}
