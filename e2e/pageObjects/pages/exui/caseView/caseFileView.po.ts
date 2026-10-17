import { expect, Locator, Page } from "@playwright/test";
import { CaseAccessViewPage } from "./caseAccessView.po.js";

export class CaseFileViewPage extends CaseAccessViewPage {
  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Case File View" }).click();
  }

  private folderToggle(folderName: string): Locator {
    return this.page.locator(`button:has(span:text-is("${folderName}"))`);
  }

  private documentInTree(fileName: string): Locator {
    return this.page.locator(".node-name-document:visible", {
      hasText: fileName,
    });
  }

  async verifyDocumentInFolder(
    folderPath: string[],
    fileName: string,
  ): Promise<void> {
    for (const folderName of folderPath) {
      const folder = this.folderToggle(folderName);
      await folder.waitFor();
      await folder.click();
    }
    await expect(this.documentInTree(fileName).first()).toBeVisible();
    await this.folderToggle(folderPath[0]).click();
  }

  async verifyDocumentNotInFolder(
    folderPath: string[],
    fileName: string,
  ): Promise<void> {
    for (const folderName of folderPath) {
      const folder = this.folderToggle(folderName);
      if (!(await folder.isVisible())) {
        return;
      }
      await folder.click();
    }
    await expect(this.documentInTree(fileName)).toBeHidden();
    const topFolder = this.folderToggle(folderPath[0]);
    if (await topFolder.isVisible()) {
      await topFolder.click();
    }
  }
}
