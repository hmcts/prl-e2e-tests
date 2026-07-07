import { expect, Locator, Page } from "@playwright/test";
import { Base } from "../../base.po.js";
import { Helpers } from "../../../../common/helpers.js";

export class CaseFileViewPage extends Base {
  private readonly caseFileViewTabName: string = "Case File View";

  constructor(page: Page) {
    super(page);
  }

  async openTab(): Promise<void> {
    await Helpers.clickTab(this.page, this.caseFileViewTabName);
  }

  private folderToggle(folderName: string): Locator {
    return this.page.locator(`button:has(span:text-is("${folderName}"))`);
  }

  private documentInTree(fileName: string): Locator {
    // A document node's label is "<fileName> <upload date/time>", so match on the
    // filename as a substring within the document-node class (not folder nodes).
    // The tree keeps collapsed nodes in the DOM but hidden, so only match visible
    // ones - i.e. documents under the folder path we have just expanded.
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
    // Only this folder path is expanded, so a matching document node here proves
    // the document sits in the correct folder. first() tolerates a reused case
    // that has accumulated several identically-named uploads.
    await expect(this.documentInTree(fileName).first()).toBeVisible();
    // collapse the top-level folder so the next document starts from a clean tree
    await this.folderToggle(folderPath[0]).click();
  }

  async verifyDocumentNotInFolder(
    folderPath: string[],
    fileName: string,
  ): Promise<void> {
    for (const folderName of folderPath) {
      const folder = this.folderToggle(folderName);
      // If a folder in the path no longer exists, it became empty once the
      // document was moved out - so the document is definitely not here.
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
