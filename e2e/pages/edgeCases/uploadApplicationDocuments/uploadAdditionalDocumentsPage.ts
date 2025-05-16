import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
// import AccessibilityTestHelper from "../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../../common/helpers.ts";
import config from "../../../utils/config.ts";
import { UploadAdditionalDocumentsContent } from "../../../fixtures/edgeCases/uploadApplicationDocuments/uploadAdditionalDocumentsContent.ts";
import path from "path";

interface UploadAdditionalDocumentsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  additionalDocuments: boolean;
}

enum UniqueSelectors {
  fileUpload = "#additionalApplicationUpload",
}

export class UploadAdditionalDocumentsPage {
  public static async uploadAdditionalDocuments({
    page,
    accessibilityTest,
    additionalDocuments,
  }: UploadAdditionalDocumentsPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });

    if (additionalDocuments) {
      await this.uploadFile(page, config.testWordFile);
      await this.uploadFile(page, config.testPdfFile);
    }

    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Omit<
    UploadAdditionalDocumentsPageOptions,
    "additionalDocuments"
  >): Promise<void> {
    const h1Locator = page.locator(
      `${Selectors.h1}:text("${UploadAdditionalDocumentsContent.h1}")`,
    );
    await h1Locator.waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        4,
        UploadAdditionalDocumentsContent,
        "p",
        `${Selectors.p}`,
      ),
    ]);
    await page.getByText(UploadAdditionalDocumentsContent.details).click();
    await Helpers.checkGroup(
      page,
      4,
      UploadAdditionalDocumentsContent,
      "li",
      `${Selectors.li}`,
    );
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page);
    }
  }

  private static async uploadFile(page: Page, file: string): Promise<void> {
    const fileInput = page.locator(UniqueSelectors.fileUpload);
    await fileInput.setInputFiles(file);
    await page
      .getByRole("button", {
        name: UploadAdditionalDocumentsContent.buttonText,
      })
      .click();
    const fileName = path.basename(file);
    await expect(page.getByText(fileName)).toBeVisible();
  }
}
