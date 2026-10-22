import { expect, Locator, Page } from "@playwright/test";
import { CaseAccessViewPage } from "./caseAccessView.po.js";

export class CaseFileViewPage extends CaseAccessViewPage {
  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Case File View" }).click();
  }

  public async validateDocumentExistsInCFV(
    folderPath: string[],
    expectedDocumentName: string,
    shouldExist = true,
  ): Promise<void> {
    let currentContainer: Locator = this.page.getByRole("tree", {
      name: "Case documents",
    });

    for (const folderName of folderPath) {
      const folderButton = currentContainer
        .locator(":scope > cdk-nested-tree-node > button.node")
        .filter({
          has: this.page.locator(".node__name--folder", {
            hasText: folderName,
          }),
        });

      await expect(folderButton).toHaveCount(1);
      await expect(folderButton).toBeVisible();

      if ((await folderButton.getAttribute("aria-expanded")) !== "true") {
        await folderButton.click();

        await expect(folderButton).toHaveAttribute("aria-expanded", "true");
      }

      currentContainer = folderButton
        .locator("..")
        .locator(":scope > div[role='group']");

      await expect(currentContainer).toBeAttached();
    }

    const document = currentContainer.locator(
      `:scope > cdk-nested-tree-node > button.case-file__node[aria-label="${expectedDocumentName}"]`,
    );

    if (shouldExist) {
      await expect(document).toHaveCount(1);
      await expect(document).toBeVisible();
    } else {
      await expect(document).toHaveCount(0);
    }
  }
}
