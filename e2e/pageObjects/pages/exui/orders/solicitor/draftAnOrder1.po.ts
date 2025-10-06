import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.js";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";

export class DraftAnOrder1Page extends EventPage {
  private readonly descriptionLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    { hasText: "What do you want to do?" },
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
  private readonly continueButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.continue,
    },
  );
  private readonly previousButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.previous,
    },
  );

  constructor(page: Page) {
    super(page, "Draft an order");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.descriptionLabel).toBeVisible();
    await this.checkStrings(Selectors.GovukFormLabel, this.actionLabels);
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

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
