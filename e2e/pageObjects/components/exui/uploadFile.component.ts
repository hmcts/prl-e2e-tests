import { Page, Locator, expect } from "@playwright/test";
import { Config } from "../../../utils/config.utils.ts";
import { Selectors } from "../../../common/selectors.ts";

type FileUploadOptions = {
  uploadLabelText: string;
  chooseFileLocatorID: string;

  // Optional text if the download paragraph exists on the page
  downloadParagraphText?: string;

  // If true, we will assert that the paragraph is visible.
  // Default false: we skip asserting paragraph visibility if it's absent/hidden.
  requireDownloadParagraph?: boolean;
};

export class FileUploadComponent {
  private readonly page: Page;
  private readonly uploadLabel: Locator;
  private readonly chooseFileButton: Locator;
  private readonly uploadingMessage: Locator;

  // This can be null if not applicable for this instance
  private paragraph: Locator | null;
  private requireDownloadParagraph: boolean;

  constructor(page: Page, options: FileUploadOptions) {
    this.page = page;
    this.uploadLabel = page.getByLabel(options.uploadLabelText).first();
    this.chooseFileButton = page.locator(options.chooseFileLocatorID);
    this.uploadingMessage = page.locator(
      `${Selectors.GovukErrorMessage}:text-is("Uploading...")`,
    );

    this.requireDownloadParagraph = options.requireDownloadParagraph ?? false;

    // Only create a locator if text is provided. Also constrain to visible to avoid matching hidden duplicates.
    this.paragraph = options.downloadParagraphText
      ? page
          .locator(`p:visible`)
          .filter({ hasText: options.downloadParagraphText })
          .first()
      : null;
  }

  private async checkVisibleElements() {
    await Promise.all([
      expect(this.uploadLabel).toBeVisible(),
      expect(this.chooseFileButton).toBeVisible(),
    ]);
    // Only assert paragraph if - we have a locator (text was provided), caller requires it to be visible, AND it’s actually present/visible
    if (this.paragraph && this.requireDownloadParagraph) {
      const count = await this.paragraph.count();
      if (count === 0) {
        throw new Error(
          `Expected download paragraph to be visible but it was not found: "${this.paragraph}"`,
        );
      }
      await expect(this.paragraph).toBeVisible();
    }
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
