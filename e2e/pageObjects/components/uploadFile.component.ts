import { Page, Locator, expect } from "@playwright/test";
import { Config } from "../../utils/config.utils.ts";
import { Selectors } from "../../common/selectors.ts";

export class FileUploadComponent {
  private readonly page: Page;
  private readonly uploadLabel: Locator;
  private readonly paragraph: Locator;
  private readonly chooseFileButton: Locator;
  private readonly uploadingMessage: Locator;

  constructor(
    page: Page,
    options: {
      uploadLabelText: string;
      downloadParagraphText: string;
      chooseFileLocatorID: string;
    },
  ) {
    this.page = page;
    this.uploadLabel = page.getByLabel(options.uploadLabelText).first();
    this.paragraph = page.getByRole("paragraph").filter({
      hasText: options.downloadParagraphText,
    });
    this.chooseFileButton = page.locator(options.chooseFileLocatorID);
    this.uploadingMessage = page.locator(
      `${Selectors.GovukErrorMessage}:text-is("Uploading...")`,
    );
  }

  private async checkVisibleElements() {
    await Promise.all([
      expect(this.uploadLabel).toBeVisible(),
      expect(this.paragraph).toBeVisible(),
      expect(this.chooseFileButton).toBeVisible(),
    ]);
  }

  private async uploadFile(filePath: string = Config.testPdfFile) {
    await this.chooseFileButton.setInputFiles(filePath);
    await expect
      .poll(
        async () => {
          const isHidden = await this.uploadingMessage.isHidden();
          return isHidden;
        },
        {
          intervals: [1_000],
          timeout: 30_000,
        },
      )
      .toBe(true);
  }

  async completeUpload(filePath: string = Config.testPdfFile) {
    await this.checkVisibleElements();
    await this.uploadFile(filePath);
  }
}
