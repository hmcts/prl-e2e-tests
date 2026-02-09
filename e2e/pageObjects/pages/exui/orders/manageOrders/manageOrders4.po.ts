import { expect, Page } from "@playwright/test";
import { Base } from "../../../base.po.ts";

export class ManageOrders4Page extends Base {
  private readonly accessibilityTest: boolean;
  private readonly isUploadOrder: boolean;

  private readonly c21Options: string[] = [
    "Blank order or directions (C21): application refused",
    "Blank order or directions (C21): to withdraw application",
    "Blank order or directions (C21): no order made",
    "Blank order or directions (C21): Other",
  ];

  constructor(page: Page, accessibilityTest = false, isUploadOrder = false) {
    super(page);
    this.accessibilityTest = accessibilityTest;
    this.isUploadOrder = isUploadOrder;
  }

  async assertPageContentsToBeVisible(): Promise<void> {
    for (const option of this.c21Options) {
      const radio = this.page.getByRole("radio", { name: option, exact: true });
      await expect(radio).toBeVisible({ timeout: 3000 });
    }

    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async assertPageContentsToContainText(): Promise<void> {
    for (const option of this.c21Options) {
      await expect(
        this.page.getByRole("radio", { name: option, exact: true }),
      ).toBeVisible();
    }
  }

  async assertC21RadiosAreSelectable(): Promise<void> {
    for (const option of this.c21Options) {
      const radio = this.page.getByRole("radio", { name: option, exact: true });
      await radio.check();
      await expect(radio).toBeChecked();
      await expect(this.page.getByRole("radio", { checked: true })).toHaveCount(
        1,
      );
    }
  }

  async selectC21OrderOption(option: string): Promise<void> {
    if (!this.c21Options.includes(option)) {
      throw new Error(`Invalid C21 option: ${option}`);
    }

    const radio = this.page.getByRole("radio", { name: option, exact: true });
    await radio.check();
    await expect(radio).toBeChecked();
  }
}
