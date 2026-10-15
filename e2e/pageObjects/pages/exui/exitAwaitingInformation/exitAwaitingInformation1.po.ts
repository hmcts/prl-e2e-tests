import { expect, Locator, Page } from "@playwright/test";
import { EventPage } from "../eventPage.po.ts";
import { Selectors } from "../../../../common/selectors.ts";

export class ExitAwaitingInformation1Page extends EventPage {
  private readonly h2: Locator = this.page.locator(Selectors.h2, {
    hasText: "Return to a previous state",
  });

  private readonly dropdownLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Return to a previous state",
    },
  );

  private readonly previousStateDropdown: Locator = this.page.locator(
    "#exitAwaitingInformationDetails_exitAwaitingInformationTargetState",
  );

  private readonly errorValidation: Locator = this.page.locator(
    Selectors.GovukErrorValidation,
    {
      hasText: "Return to a previous state is required",
    },
  );

  private readonly errorMessage: Locator = this.page.locator(
    Selectors.GovukErrorMessage,
    {
      hasText: "Return to a previous state is required",
    },
  );

  constructor(page: Page) {
    super(page, "Exit Awaiting Information");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await Promise.all([
      expect(this.h2).toBeVisible(),
      expect(this.dropdownLabel).toBeVisible(),
      expect(this.previousStateDropdown).toBeVisible(),
      expect(this.continueButton).toBeVisible(),
      expect(this.previousButton).toBeVisible(),
    ]);
  }

  async checkErrorMessages(): Promise<void> {
    await this.clickContinue();
    await Promise.all([
      expect(this.errorValidation).toBeVisible(),
      expect(this.errorMessage).toBeVisible(),
    ]);
  }

  async selectPreviousState(
    previousState: "Pending" | "Submitted" | "Case Issued" | "Gatekeeping",
  ): Promise<void> {
    await expect(this.previousStateDropdown).toBeVisible();
    await this.previousStateDropdown.selectOption(previousState);
  }
}
