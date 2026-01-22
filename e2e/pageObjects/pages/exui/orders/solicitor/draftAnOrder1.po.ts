import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../../utils/page.utils.js";

export class DraftAnOrder1Page extends EventPage {
  private readonly descriptionLabel: Locator = this.page.getByText(
    "What do you want to do?",
  );
  private readonly actionLabels: string[] = [
    "Draft an order",
    "Upload an order",
  ];
  private readonly draftAnOrderRadio: Locator = this.page.getByRole("radio", {
    name: "Draft an order",
  });
  private readonly uploadAnOrderRadio: Locator = this.page.getByRole("radio", {
    name: "Upload an order",
  });
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  constructor(page: Page) {
    super(page, "Create/upload draft order");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.descriptionLabel).toBeVisible();
    await this.pageUtils.assertStrings(
      this.actionLabels,
      this.page.getByRole("group", { name: "What do you want to do?" }),
    );
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectWhatYouWantToDo(isDraftAnOrder: boolean): Promise<void> {
    if (isDraftAnOrder) {
      await this.draftAnOrderRadio.check();
    } else {
      await this.uploadAnOrderRadio.check();
    }
  }
}
