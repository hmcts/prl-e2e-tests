import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import {
  UploadDocumentsSubmitContent
} from "../../../../../fixtures/manageCases/createCase/FL401/uploadDocuments/uploadDocumentsSubmitContent";
import { Helpers } from "../../../../../common/helpers";
import {
  UploadDocuments1Content
} from "../../../../../fixtures/manageCases/createCase/FL401/uploadDocuments/uploadDocuments1Content";

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
    accessibilityTest
  }: UploadDocumentsSubmitPageOptions): Promise<void> {
    await this.checkPageContent({
      page, accessibilityTest
    })
  }

  private static async checkPageContent({
    page,
    accessibilityTest
  }: CheckPageContentOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${UploadDocumentsSubmitContent.checkAnswers}")`
    )
    await Promise.all(
      [
        this.checkStaticContent(page)
      ]
    )
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page)
    }
  }

  private static async checkStaticContent(
    page: Page
  ): Promise<void> {
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukHeadingL}:text-is("${UploadDocumentsSubmitContent.pageTitle}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${UploadDocumentsSubmitContent.p1}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.strong}:text-is("${UploadDocumentsSubmitContent.strong1}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${UploadDocumentsSubmitContent.change}")`,
          2
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
      ]
    );
  }

  private static async checkFilledInData(
    page: Page
  ): Promise<void> {
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${UploadDocumentsSubmitContent.mockDocx}")`,
          2
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${UploadDocumentsSubmitContent.mockPdf}")`,
          2
        ),
      ]
    )
  }
}